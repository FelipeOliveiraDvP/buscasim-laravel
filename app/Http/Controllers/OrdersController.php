<?php

namespace App\Http\Controllers;

use App\Events\PaymentEvent;
use App\Models\Coupon;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use MercadoPago\Client\Common\RequestOptions;
use MercadoPago\Client\Payment\PaymentClient;
use MercadoPago\MercadoPagoConfig;

class OrdersController extends Controller
{
  /**
   * Create a new order.
   */
  public function checkout(Request $request)
  {
    // Validate the request.
    $validator = Validator::make($request->all(), [
      'name'  => 'required|string',
      'email' => 'required|email',
      'plate' => 'required|formato_placa_de_veiculo',
    ]);

    if ($validator->fails()) {
      return response()->json($validator->errors(), 400);
    }

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
        'name'      => $request->name,
        'email'     => $request->email,
        // 'password'  => Hash::make('asdf1234') Just implement if you can returns a JWT token.
      ]);
    }

    // Create a draft order.
    $order = Order::create([
      'total'   => getOption('BASE_PRICE'),
      'plate'   => $request->plate,
      'user_id' => $customer->id,
    ]);

    return response()->json([
      'customer'  => $customer,
      'order'     => $order
    ], 200);
  }

  /**
   * Create a payment request.
   */
  public function payment(Request $request)
  {
    // Validate the request.
    $validator = Validator::make($request->all(), [
      'order_id'      => 'required|exists:orders,id',
      'document'      => 'required|cpf',
      'coupon_id'     => 'nullable|exists:coupons,id',
      'accept_terms'  => 'required|boolean',
    ]);

    if ($validator->fails()) {
      return response()->json($validator->errors(), 400);
    }

    // Get the order.
    $order = Order::where('id', '=', $request->order_id)->with('user:id,name,email')->first();
    $total = $order->total;

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
    MercadoPagoConfig::setAccessToken(getOption('MERCADO_PAGO_ACCESS_TOKEN'));

    $client = new PaymentClient();
    $request_options = new RequestOptions();
    $request_options->setCustomHeaders(["X-Idempotency-Key: " . Str::random(32)]);

    $payment = $client->create([
      "transaction_amount" => (float) $total,
      "description" => "BuscaSim - Consulta Premium da placa " . $order->plate,
      "installments" => 1,
      "payment_method_id" => "pix",
      "payer" => [
        "email" => $order->user->email,
        "first_name" => $order->user->name,
        "last_name" => "",
        "identification" => [
          "type" => "cpf",
          "number" => $request->document
        ]
      ]
    ], $request_options);

    $order->transaction_id = $payment->id;
    $order->save();

    return response()->json([
      'payment_id'  => $payment->id,
      'customer'    => $order->user,
      'qrcode'      => $payment->point_of_interaction->transaction_data->qr_code_base64,
      'code'        => $payment->point_of_interaction->transaction_data->qr_code,
    ], 200);
  }

  /**
   * Callback for the payment gateway, thats updates the order status.
   */
  public function callback(Request $request)
  {
    // Verify if the request is a valid callback.
    if ($request->type == "payment" && $request->data) {
      // Setup Mercado Pago SDK for get the payment details.
      MercadoPagoConfig::setAccessToken(getOption('MERCADO_PAGO_ACCESS_TOKEN'));

      $payment_id = $request->data['id'];
      $client = new PaymentClient();
      $payment = $client->get($payment_id);

      // Get the order.
      $order = Order::where('transaction_id', '=', $payment_id)->first();

      // To debug on development.
      if (env('APP_ENV') == 'development') {
        $order->status = 'confirmed';
        $order->data = file_get_contents(base_path('resources/json/premium_response.json'));
        $order->save();
      }

      // Get API premium data if payment is confirmed.
      if (env('APP_ENV') == 'production' && $payment->status == 'approved') {
        $response = Http::withUrlParameters([
          'endpoint'  => getOption('API_PLACAS_URL'),
          'plate'     => $order->plate,
          'token'     => getOption('API_PLACAS_TOKEN_PREMIUM'),
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

      return response()->json(['message' => 'Ok'], 200);
    }
  }
}
