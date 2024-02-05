<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AuthTest extends TestCase
{
  use RefreshDatabase;

  /**
   * Testing login request.
   */
  public function testLoginRequest(): void
  {
    $this->seed();

    $payload = [
      'email' => 'admin@email.com',
      'password' => 'asdf1234'
    ];

    $response = $this->json('post', '/api/auth/login', $payload);

    $response->assertStatus(200);
    $response->assertJsonStructure(['token']);
  }

  /**
   * Test Logout request.
   */
  public function testLogoutRequest(): void
  {
    $this->seed();

    $user = User::create([
      'name' => 'testing',
      'email' => 'testing@email.com',
      'password' => Hash::make('asdf1234')
    ]);

    $this->actingAs($user);

    $response = $this->json('post', '/api/auth/logout');

    $response->assertStatus(200);
    $response->assertJsonStructure(['message']);
  }
}
