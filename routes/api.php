<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CouponsController;
use App\Http\Controllers\OrdersController;
use App\Http\Controllers\QueriesController;
use App\Http\Controllers\UsersController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('auth')->group(function () {
  Route::post('login', [AuthController::class, 'login']);
  Route::post('register', [AuthController::class, 'register']);
  Route::post('refresh', [AuthController::class, 'refresh']);
  Route::post('forgot', [AuthController::class, 'forgot']);
  Route::post('reset', [AuthController::class, 'reset']);
  Route::get('verify/{token}', [AuthController::class, 'verify']);
});

Route::prefix('queries')->group(function () {
  Route::get('/{plate}', [QueriesController::class, 'search']);
});

Route::prefix('orders')->group(function () {
  Route::post('callback', [OrdersController::class, 'callback']);
});

Route::middleware('auth:api')->group(function () {
  Route::prefix('queries')->group(function () {
    Route::get('/', [QueriesController::class, 'index']);
    Route::post('/', [QueriesController::class, 'store']);
    Route::put('/{id}', [QueriesController::class, 'update']);
    Route::delete('/{id}', [QueriesController::class, 'destroy']);
  });

  Route::prefix('orders')->group(function () {
    Route::post('payment', [OrdersController::class, 'payment']);
    Route::get('/', [OrdersController::class, 'index']);
    Route::post('/', [OrdersController::class, 'store']);
    Route::put('/{id}', [OrdersController::class, 'update']);
    Route::delete('/{id}', [OrdersController::class, 'destroy']);
  });

  Route::prefix('coupons')->group(function () {
    Route::get('/', [CouponsController::class, 'index']);
    Route::post('/', [CouponsController::class, 'store']);
    Route::put('/{id}', [CouponsController::class, 'update']);
    Route::delete('/{id}', [CouponsController::class, 'destroy']);
  });

  Route::prefix('users')->group(function () {
    Route::get('/', [UsersController::class, 'index']);
    Route::post('/', [UsersController::class, 'store']);
    Route::put('/{id}', [UsersController::class, 'update']);
    Route::delete('/{id}', [UsersController::class, 'destroy']);
  });

  Route::prefix('auth')->group(function () {
    Route::get('me', [AuthController::class, 'me']);
    Route::post('logout', [AuthController::class, 'logout']);
  });
});
