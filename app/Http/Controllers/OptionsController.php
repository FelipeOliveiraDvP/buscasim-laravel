<?php

namespace App\Http\Controllers;

use App\Models\Option;
use App\Traits\Helpers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OptionsController extends Controller
{
  use Helpers;

  /**
   * List all the system options.
   */
  public function index()
  {
    return response()->json(Option::all(), 200);
  }

  /**
   * Update the system options.
   */
  public function update(Request $request)
  {
    // Validate the request.
    $validator = Validator::make($request->all(), [
      'options'         => 'required|array',
      'options.*.key'   => 'required|string|exists:options,key',
      'options.*.value' => 'required',
    ]);

    if ($validator->fails()) {
      return response()->json($validator->errors(), 400);
    }

    foreach ($request->options as $option) {
      $this->setOption($option['key'], $option['value']);
    }

    return response()->json(['message' => 'Configurações atualizadas com sucesso.'], 200);
  }
}
