<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends Model
{
  use SoftDeletes;

  /**
   * The table name.
   *
   * @var array<int, string>
   */
  protected $table = "tasks";

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'title',
    'description',
    'index',
    'status',
    'final_date',
    'user_id',
  ];

  /**
   * The attributes that should be cast.
   *
   * @var array<string, string>
   */
  protected $casts = [
    'index' => 'integer',
    'final_date' => 'date',
  ];

  /**
   * Get the user associated with this event.
   */
  public function responsible()
  {
    return $this->belongsTo(User::class, 'user_id', 'id');
  }
}
