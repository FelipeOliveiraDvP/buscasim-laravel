<?php

namespace App\Http\Controllers;

use App\Mail\ResetEmail;
use App\Models\ResetTokens;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class UsersController extends Controller
{
  /**
   * List all the users.
   */
  public function index(Request $request)
  {
    $query = User::query();

    $query->where('id', '<>', Auth::guard('api')->id());

    if ($request->has('name')) {
      $query->where('name', 'like', "%{$request->name}%");
    }

    if ($request->has('email')) {
      $query->where('email', 'like', "%{$request->email}%");
    }

    if ($request->has('role')) {
      $query->where('role', '=', $request->role);
    }

    return response()->json($query->paginate(30), 200);
  }

  /**
   * Create a new user.
   */
  public function store(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'name'      => 'required|string',
      'email'     => 'required|string|email|unique:users,email',
      'is_active' => 'boolean'
    ]);

    if ($validator->fails()) {
      return response()->json($validator->errors(), 400);
    }

    $user = User::create($request->only('name', 'email', 'is_active'));

    if (!$user) {
      return response()->json([
        'message' => 'Ocorreu um erro ao criar o usuário'
      ], 400);
    }

    $token = Str::random(32);

    ResetTokens::where('email', '=', $request->email)->delete();
    ResetTokens::insert([
      'email'       => $request->email,
      'token'       => $token,
      'created_at'  => Carbon::now()->addDays(3)->toDateString()
    ]);

    Mail::to($request->email)->send(new ResetEmail($token));

    return response()->json([
      'message' => 'Usuário cadastrado com sucesso!'
    ], 201);
  }

  /**
   * Update a user.
   */
  public function update(Request $request, string $id)
  {
    $user = User::where('id', '=', $id)->first();

    if (!$user) {
      return response()->json([
        'message' => 'Usuário não encontrado'
      ], 404);
    }

    $validator = Validator::make($request->all(), [
      'name' => 'string',
    ]);

    if ($validator->fails()) {
      return response()->json($validator->errors(), 400);
    }

    if ($request->has('name')) {
      $user->name = $request->name;
      $user->save();
    }

    return response()->json(['message' => 'Usuário atualizado com sucesso'], 200);
  }

  /**
   * Remove a user.
   */
  public function destroy(string $id)
  {
    $user = User::where('id', '=', $id)->first();

    if (!$user) {
      return response()->json([
        'message' => 'Usuário não encontrado'
      ], 404);
    }

    $user->delete();

    return response()->json(['message' => 'Usuário removido com sucesso'], 200);
  }
}
