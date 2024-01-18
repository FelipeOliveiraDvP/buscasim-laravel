<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Installment extends Model
{
  use SoftDeletes;

  /**
   * The table name.
   *
   * @var array<int, string>
   */
  protected $table = "installments";

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'order_id',
    'number',
    'is_paid',
    'due_date',
  ];

  /**
   * The attributes that should be cast.
   *
   * @var array<string, string>
   */
  protected $casts = [
    'due_date' => 'date',
    'is_paid' => 'boolean',
  ];

  /**
   * Get the installment order.
   */
  public function order(): BelongsTo
  {
    return $this->belongsTo(PaymentOrder::class);
  }
}
