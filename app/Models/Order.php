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
    'query_id',
    'coupon_id',
    'document',
    'total',
    'status',
  ];

  public function data()
  {
    return $this->belongsTo(Query::class);
  }

  public function coupon()
  {
    return $this->hasOne(Coupon::class);
  }
}
