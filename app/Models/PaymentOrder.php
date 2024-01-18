<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class PaymentOrder extends Model
{
  use SoftDeletes;

  /**
   * The table name.
   *
   * @var array<int, string>
   */
  protected $table = "payment_orders";

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'process_id',
    'installments',
    'contract_file',
    'has_invoice',
  ];

  /**
   * The attributes that should be cast.
   *
   * @var array<string, string>
   */
  protected $casts = [
    'has_invoice' => 'boolean',
  ];

  /**
   * Get the payment order installments.
   */
  public function installments(): HasMany
  {
    return $this->hasMany(Installment::class);
  }

  /**
   * Get the order process.
   */
  public function process(): BelongsTo
  {
    return $this->belongsTo(Process::class);
  }
}
