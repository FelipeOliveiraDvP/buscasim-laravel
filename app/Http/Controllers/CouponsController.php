<?php

namespace App\Http\Controllers;

use App\Models\Coupon;

class CouponsController extends Controller
{
  public function search(string $code)
  {
    $coupon = Coupon::where('code', '=', $code)->first();

    if (!$coupon) {
      return response()->json([
        'coupon_id' => null,
        'discount'  => 0,
        'subtotal'  => (float)getOption('BASE_PRICE')
      ], 200);
    }

    $total = 0;
    $discount = 0;

    if ($coupon->type == 'fixed') {
      $discount = $coupon->amount;
      $total = getOption('BASE_PRICE') - $coupon->amount;
    } else {
      $total = getOption('BASE_PRICE') * (1 - $coupon->amount / 100);
      $discount = getOption('BASE_PRICE') - $total;
    }

    return response()->json([
      'coupon_id' => $coupon->id,
      'discount'  => $discount,
      'subtotal'  => $total
    ], 200);
  }

  public function index()
  {
    return response()->json(['message' => 'Ok'], 200);
  }

  public function store()
  {
    return response()->json(['message' => 'Ok'], 200);
  }

  public function update()
  {
    return response()->json(['message' => 'Ok'], 200);
  }

  public function destroy()
  {
    return response()->json(['message' => 'Ok'], 200);
  }
}
