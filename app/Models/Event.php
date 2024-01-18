<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Event extends Model
{
  /**
   * Disable default timestamps.
   *
   * @var boolean
   */
  public $timestamps = false;

  /**
   * The table name.
   *
   * @var array<int, string>
   */
  protected $table = "events";

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'title',
    'color',
    'location',
    'start_date',
    'final_date',
    'user_id',
  ];

  /**
   * The attributes that should be cast.
   *
   * @var array<string, string>
   */
  protected $casts = [
    'start_date' => 'datetime',
    'final_date' => 'datetime',
  ];

  /**
   * Get the user associated with this event.
   */
  public function responsible()
  {
    return $this->belongsTo(User::class, 'user_id', 'id');
  }
}
