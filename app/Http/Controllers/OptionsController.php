<?php

namespace App\Http\Controllers;

use App\Models\Option;
use Illuminate\Http\Request;

class OptionsController extends Controller
{
  public function index()
  {
    return response()->json(Option::all(), 200);
  }

  public function set(string $key, Request $request)
  {
    if (setOption($key, $request->value)) {
      return response()->json(['message' => 'Opção salva com sucesso.'], 200);
    } else {
      return response()->json(['message' => 'Ocorreu um erro ao atualizar a opção.'], 400);
    }
  }
}
