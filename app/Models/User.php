<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
// use Laravel\Sanctum\HasApiTokens;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
  use HasFactory, Notifiable, SoftDeletes;

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'name',
    'email',
    'role',
    'password',
    'is_active',
  ];

  /**
   * The attributes that should be hidden for serialization.
   *
   * @var array<int, string>
   */
  protected $hidden = [
    'password',
    'remember_token',
  ];

  /**
   * The attributes that should be cast.
   *
   * @var array<string, string>
   */
  protected $casts = [
    'password' => 'hashed',
    'is_active' => 'boolean',
  ];

  /**
   * Get the user JWT identifier.
   */
  public function getJWTIdentifier()
  {
    return $this->getKey();
  }

  /**
   * Custom the claims for user in JWT.
   */
  public function getJWTCustomClaims()
  {
    return [
      'email'     => $this->email,
      'name'      => $this->name,
      'role'      => $this->role,
      'is_active' => $this->is_active,
    ];
  }
}
