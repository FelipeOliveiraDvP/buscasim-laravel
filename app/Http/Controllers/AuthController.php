<?php

namespace App\Http\Controllers;

use App\Mail\ResetEmail;
use App\Models\ResetTokens;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class AuthController extends Controller
{
  /**
   * Authenticate the user and returns a JWT access token.
   *
   * @param Request $request
   * @return JsonResponse
   */
  public function login(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'email'     => 'required|string|email|exists:users,email',
      'password'  => 'required|string',
    ]);

    if ($validator->fails()) {
      return response()->json($validator->errors(), 400);
    }

    $credentials = $request->only('email', 'password');
    $token = Auth::guard('api')->attempt($credentials, true);

    if (!$token) {
      return response()->json([
        'message' => 'Usuário ou senha inválidos'
      ], 400);
    }

    return response()->json([
      'token' => $token
    ]);
  }

  /**
   * Refresh the user JWT token.
   *
   * @return JsonResponse
   */
  public function refresh()
  {
    /** @var Illuminate\Auth\AuthManager */
    $auth = auth('api');

    return response()->json([
      'token' => $auth->refresh()
    ]);
  }

  /**
   * Revoke the user's current JWT token.
   *
   * @return JsonResponse
   */
  public function logout()
  {
    Auth::guard('api')->logout();

    return response()->json([
      'message' => "Você saiu do sistema"
    ]);
  }

  /**
   * Request a link to reset the user password.
   *
   * @param Request $request
   * @return JsonResponse
   */
  public function forgot(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'email' => 'required|string|email|exists:users,email',
    ]);

    if ($validator->fails()) {
      return response()->json($validator->errors(), 400);
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
      'message' => 'Link de recuperação enviado com sucesso.'
    ]);
  }

  /**
   * Verify the token for reset user password.
   *
   * @param string $token
   * @return JsonResponse
   */
  public function verify(string $token)
  {
    $token_exists = ResetTokens::where('token', '=', $token)->first();

    if ($token_exists == null) {
      return response()->json([
        'message' => 'O token informado não existe'
      ], 400);
    }

    $expire_date = Carbon::parse($token_exists->created_at);

    if ($expire_date->diffInDays(Carbon::now()) < 1) {
      return response()->json([
        'message' => 'O token está expirado'
      ], 400);
    }

    return response()->json([
      'message' => 'Token verificado com sucesso.',
    ]);
  }

  /**
   * Confirm and reset the user password.
   *
   * @param Request $request
   * @return JsonResponse
   */
  public function reset(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'password'  => 'required|string|min:8|confirmed',
      'token'     => 'required|exists:password_reset_tokens,token',
    ]);

    if ($validator->fails()) {
      return response()->json($validator->errors(), 400);
    }

    $reset_token = ResetTokens::where('token', '=', $request->token)->first();
    $user = User::where('email', '=', $reset_token->email)->first();
    $hashed_password = Hash::make($request->password);

    $user->update([
      'is_active' => true,
      'password'  => $hashed_password
    ]);

    $token = Auth::guard('api')->attempt([
      'email'     => $user->email,
      'password'  => $request->password
    ]);

    ResetTokens::where('token', '=', $request->token)->delete();

    return response()->json([
      'token' => $token,
    ]);
  }

  /**
   * Get the current user info.
   *
   * @return JsonResponse
   */
  public function me()
  {
    return Auth::guard('api')->user();
  }
}
