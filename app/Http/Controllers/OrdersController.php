<?php

namespace App\Http\Controllers;

use App\Events\PaymentEvent;
use App\Models\Coupon;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

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

    // TODO: Create a Mercado Pago Payment.

    return response()->json([
      'customer'  => $order->user,
      'qrcode'    => "base64",
      'code'      => "copy_code",
    ], 200);
  }

  /**
   * Callback for the payment gateway, thats updates the order status.
   */
  public function callback(Request $request)
  {
    if ($request->type == "payment") {
      // TODO: Verify if payment is approved.
      // TODO: Make a request for the premium API.
      // TODO: Update order status, transaction, data and notify websocket.

      $mock = file_get_contents(base_path('resources/json/premium_response.json'));

      event(new PaymentEvent([
        'order_id' => 1,
        'data'  => json_decode($mock),
      ]));

      return response()->json(['message' => 'Ok'], 200);
    }
  }
}
