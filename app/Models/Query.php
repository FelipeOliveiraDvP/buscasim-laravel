<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Query extends Model
{
  use SoftDeletes;
  /**
   * The table name.
   *
   * @var array<int, string>
   */
  protected $table = "queries";

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'plate',
    'user_id',
    'data',
  ];

  public function user()
  {
    return $this->belongsTo(User::class);
  }
}
