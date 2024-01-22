<?php

namespace App\Http\Controllers;

use App\Models\Coupon;
use App\Models\Order;
use App\Models\Query;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OrdersController extends Controller
{
  /**
   * Create a payment request for the premium query.
   */
  public function payment(Request $request)
  {
    // Validate the request.
    $validator = Validator::make($request->all(), [
      'code'          => 'required|exists:queries,code',
      'name'          => 'required|string',
      'email'         => 'required|email',
      'document'      => 'required|cpf',
      'accept_terms'  => 'required|boolean',
      // 'coupon'        => 'string|exists:coupons,code',
    ]);

    if ($validator->fails()) {
      return response()->json($validator->errors(), 400);
    }

    // Retrieve an existing user or create a new one.
    $user_exists = User::where('email', '=', $request->email)->first();

    if ($user_exists) {
      $user = $user_exists;
    } else {
      $user = User::create([
        'name'          => $request->name,
        'email'         => $request->email,
        'document'      => $request->document,
        'accept_terms'  => $request->accept_terms,
      ]);
    }

    // Retrieve the free query results.
    $query_result = Query::where('code', '=', $request->code)->first();

    // Retrieve coupon if exists.
    $discount = 0;
    $coupon = null;
    if ($request->coupon) {
      $coupon = Coupon::where('code', '=', $request->coupon);
      $discount = $coupon->percentage / 100;
    }

    // Calc the total price.
    if ($discount && env('QUERY_PRICE', 0) > 0) {
      $total = env('QUERY_PRICE', 0) * (1 - $discount);
    } else {
      $total = 0;
    }

    // Create a new order.
    $order = Order::create([
      'total'     => $total,
      'query_id'  => $query_result->id,
      'user_id'   => $user->id,
      'coupon_id' => $coupon ? $coupon->id : null,
    ]);

    // TODO: Call the payment gateway and returns the QRCode.
    // Mercado Pago Example:
    //
    // $client = new PaymentClient();

    // $body = [
    //     'transaction_amount' => 100,
    //     'token' => 'token',
    //     'description' => 'description',
    //     'installments' => 1,
    //     'payment_method_id' => 'visa',
    //     'notification_url' => 'http://test.com',
    //     'payer' => array(
    //         'email' => 'test@test.com',
    //         'identification' => array(
    //             'type' => 'CPF',
    //             'number' => '19119119100'
    //         )
    //     )
    // ];

    // $client->create(body);

    return response()->json(['message' => 'Seu pedido foi realizado com sucesso.'], 200);
  }

  /**
   * Callback for the payment gateway, thats updates the order status.
   */
  public function callback(Request $request)
  {
    if ($request->type == "payment") {
      // TODO: Verify if payment is approved.
      // TODO: Update order status and notify websocket.
      // TODO: Make a request for the premium API.
      // TODO: Update the query with premium result.
    }
  }
}
