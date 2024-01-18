<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CustomersController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProcessesController;
use App\Http\Controllers\SchedulesController;
use App\Http\Controllers\TasksController;
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
  Route::post('refresh', [AuthController::class, 'refresh']);
  Route::post('forgot', [AuthController::class, 'forgot']);
  Route::post('reset', [AuthController::class, 'reset']);
  Route::get('verify/{token}', [AuthController::class, 'verify']);
});

Route::middleware('auth:api')->group(function () {
  Route::prefix('auth')->group(function () {
    Route::get('me', [AuthController::class, 'me']);
    Route::post('logout', [AuthController::class, 'logout']);
  });

  Route::prefix('dashboard')->group(function () {
    Route::get('events', [DashboardController::class, 'events']);
    Route::get('tasks', [DashboardController::class, 'tasks']);
    Route::get('processes', [DashboardController::class, 'processes']);
  });

  Route::prefix('customers')->group(function () {
    Route::get('/', [CustomersController::class, 'index']);
    Route::post('/', [CustomersController::class, 'store']);
    Route::put('/{id}', [CustomersController::class, 'update']);
    Route::delete('/{id}', [CustomersController::class, 'destroy']);
  });

  Route::prefix('schedules')->group(function () {
    Route::get('/', [SchedulesController::class, 'index']);
    Route::post('/', [SchedulesController::class, 'store']);
    Route::put('/{id}', [SchedulesController::class, 'update']);
    Route::delete('/{id}', [SchedulesController::class, 'destroy']);
  });

  Route::prefix('tasks')->group(function () {
    Route::get('/', [TasksController::class, 'index']);
    Route::post('/', [TasksController::class, 'store']);
    Route::put('/{id}', [TasksController::class, 'update']);
    Route::delete('/{id}', [TasksController::class, 'destroy']);
    Route::patch('/{id}/reorder', [TasksController::class, 'reorder']);
  });

  Route::prefix('processes')->group(function () {
    Route::get('/', [ProcessesController::class, 'index']);
    Route::post('/', [ProcessesController::class, 'store']);
    Route::put('/{id}', [ProcessesController::class, 'update']);
    Route::delete('/{id}', [ProcessesController::class, 'destroy']);
  });

  Route::prefix('users')->group(function () {
    Route::get('/', [UsersController::class, 'index']);
    Route::post('/', [UsersController::class, 'store']);
    Route::put('/{id}', [UsersController::class, 'update']);
    Route::delete('/{id}', [UsersController::class, 'destroy']);
  });
});
