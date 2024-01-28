<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CouponsController;
use App\Http\Controllers\OptionsController;
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
  Route::post('login',  [AuthController::class, 'login']);
  Route::post('simple', [AuthController::class, 'simple']);
  Route::post('forgot', [AuthController::class, 'forgot']);
  Route::post('reset',  [AuthController::class, 'reset']);
  Route::get('refresh', [AuthController::class, 'refresh']);
});

Route::prefix('search')->group(function () {
  Route::post('/', [QueriesController::class, 'search']);
});

Route::prefix('coupons')->group(function () {
  Route::get('search/{code}',   [CouponsController::class, 'search']);
});

Route::prefix('orders')->group(function () {
  Route::post('checkout', [OrdersController::class, 'checkout']);
  Route::get('/{id}',     [OrdersController::class, 'details']);
  Route::post('payment',  [OrdersController::class, 'payment']);
});

Route::middleware('auth:api')->group(function () {
  Route::prefix('customers')->group(function () {
    Route::get('orders',      [OrdersController::class, 'index']);
    Route::get('orders/{id}', [OrdersController::class, 'details']);
  });

  Route::prefix('orders')->group(function () {
    Route::get('/', [OrdersController::class, 'index']);
  });

  Route::prefix('coupons')->group(function () {
    Route::get('/',         [CouponsController::class, 'index']);
    Route::post('/',        [CouponsController::class, 'store']);
    Route::put('/{id}',     [CouponsController::class, 'update']);
    Route::delete('/{id}',  [CouponsController::class, 'destroy']);
  });

  Route::prefix('users')->group(function () {
    Route::get('/',         [UsersController::class, 'index']);
    Route::post('/',        [UsersController::class, 'store']);
    Route::put('/{id}',     [UsersController::class, 'update']);
    Route::delete('/{id}',  [UsersController::class, 'destroy']);
  });

  Route::prefix('options')->group(function () {
    Route::get('/',   [OptionsController::class, 'index']);
    Route::patch('/', [OptionsController::class, 'update']);
  });

  Route::prefix('auth')->group(function () {
    Route::get('me',      [AuthController::class, 'me']);
    Route::post('logout', [AuthController::class, 'logout']);
  });
});
