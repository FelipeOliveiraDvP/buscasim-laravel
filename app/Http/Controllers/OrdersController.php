<?php

namespace App\Http\Controllers;

use App\Events\PaymentEvent;
use App\Http\Requests\CheckoutRequest;
use App\Models\Coupon;
use App\Models\Order;
use App\Models\User;
use App\Services\PaymentService;
use App\Traits\Helpers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class OrdersController extends Controller
{
  use Helpers;

  /**
   * List all orders. If the current user is a admin, return all orders.
   *
   * @param Request $request
   * @return JsonResponse
   */
  public function index(Request $request)
  {
    $query = Order::query();
    $current_user = auth('api')->user();
    $is_admin = $current_user->role == 'admin';

    if ($current_user && $current_user->role != 'admin') {
      $query->where('user_id', '=', $current_user->id);
    }

    if ($request->has('date')) {
      $query->whereDate('created_at', '=', $request->date);
    }

    if ($request->has('status')) {
      $query->where('status', '=', $request->status);
    } elseif (!$is_admin) {
      $query->where('status', '=', 'confirmed');
    }

    $query
      ->with('user:id,name')
      ->with('coupon:id,code')
      ->orderBy('created_at', 'desc');

    return response()->json($query->paginate(10), 200);
  }

  /**
   * Get the order details.
   *
   * @param string $id
   * @return JsonResponse
   */
  public function detail(string $id)
  {
    $order = Order::with('coupon')
      ->where('id', '=', $id)
      ->where('user_id', '=', auth('api')->id())
      ->first();

    if (!$order) {
      return response()->json(['message' => 'Consulta não encontrada'], 404);
    }

    return response()->json($order, 200);
  }

  /**
   * Process customer checkout.
   *
   * @param App\Http\Requests\CheckoutRequest $request.
   * @param App\Services\PaymentService $payment_service.
   *
   * @return \Illuminate\Http\JsonResponse
   */
  public function process(CheckoutRequest $request, PaymentService $payment_service)
  {
    // The customer for checkout.
    $customer = null;

    // Retrieve an existing user or create a new one.
    $user_exists = User::where('email', '=', $request->email)->first();

    if (auth('api')->user() != null) {
      $customer = auth('api')->user();
    } elseif ($user_exists != null) {
      $customer = $user_exists;
    } else {
      $customer = User::create([
        'name'          => $request->name,
        'email'         => $request->email,
        'password'      => Hash::make($request->document),
        'document'      => $request->document,
        'accept_terms'  => $request->accept_terms,
      ]);
    }

    // Create a draft order.
    $total = $this->getOption('BASE_PRICE');

    $order = Order::create([
      'total'   => $total,
      'plate'   => str_replace('-', '', $request->plate),
      'user_id' => $customer->id,
    ]);

    // Get the coupon and calc the discount.
    if ($request->coupon_id) {
      $coupon = Coupon::where('id', '=', $request->coupon_id)->first();

      if ($coupon->type == 'fixed') {
        $total = $order->total - $coupon->amount;
      } else {
        $discount = $coupon->amount / 100;
        $total = $order->total * (1 - $discount);
      }

      $order->coupon_id = $request->coupon_id;
      $order->total = $total;
      $order->save();
    }

    // Create a Mercado Pago payment.
    $data = [
      'total'     => $total,
      'plate'     => $order->plate,
      'name'      => $order->user->name,
      'email'     => $order->user->email,
      'document'  => $request->document,
    ];

    $result = $payment_service->payment($data);

    if (!$result) {
      return response()->json(['message' => 'Erro ao gerar o pagamento'], 500);
    }

    $order->transaction_id = $result['transaction_id'];
    $order->save();

    return response()->json([
      'payment_id'  => $result['transaction_id'],
      'customer'    => $order->user,
      'qrcode'      => $result['qrcode'],
      'code'        => $result['code'],
    ], 200);
  }

  /**
   * Handles the Mercado Pago callback to update order status.
   *
   * @param Request $request
   * @return JsonResponse
   */
  public function callback(Request $request, PaymentService $payment_service)
  {
    // Verify if the request is a valid callback.
    if ($request->type == "payment" && $request->data) {
      $payment_id = $request->data['id'];

      // Verify if payment is confirmed.
      if ($payment_service->confirmed($payment_id)) {
        // Get the order.
        $order = Order::where('transaction_id', '=', $payment_id)->first();

        // To debug on development.
        if (env('APP_ENV') == 'development') {
          $order->status = 'confirmed';
          $order->data = file_get_contents(base_path('resources/json/premium_response.json'));
          $order->save();
        }

        // Get API premium data if payment is confirmed.
        if (env('APP_ENV') == 'production') {
          $response = Http::withUrlParameters([
            'endpoint'  => $this->getOption('API_PLACAS_URL'),
            'plate'     => $order->plate,
            'token'     => $this->getOption('API_PLACAS_TOKEN_PREMIUM'),
          ])->get('{+endpoint}/consulta/{plate}/{token}');

          $order->status = 'confirmed';
          $order->data = $response->body();
          $order->save();
        }

        // Notify the client by WebSocket.
        event(new PaymentEvent([
          'payment_id'  => (int)$payment_id,
          'confirmed'   => true,
          'data'        => json_decode($order->data),
        ]));
      }

      return response()->json(['message' => 'Ok'], 200);
    }
  }
}
