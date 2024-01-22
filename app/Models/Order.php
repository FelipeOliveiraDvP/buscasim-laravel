<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
  use SoftDeletes;
  /**
   * The table name.
   *
   * @var array<int, string>
   */
  protected $table = "orders";

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'total',
    'status',
    'query_id',
    'user_id',
    'coupon_id',
  ];

  public function result()
  {
    return $this->hasOne(Query::class);
  }

  public function user()
  {
    return $this->hasOne(User::class);
  }

  public function coupon()
  {
    return $this->hasOne(Coupon::class);
  }
}
