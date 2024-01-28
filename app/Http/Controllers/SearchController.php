<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class SearchController extends Controller
{
  /**
   * Search a vehicle plate and returns the free information.
   */
  public function search(Request $request)
  {
    // Validate the request.
    $validator = Validator::make($request->all(), [
      'plate' => 'required|formato_placa_de_veiculo',
    ], [
      'plate' => [
        'formato_placa_de_veiculo' => 'Informe uma placa válida, somente com números e letras'
      ]
    ]);

    if ($validator->fails()) {
      return response()->json($validator->errors(), 400);
    }

    // Returns mock JSON data if is in development.
    if (env('APP_ENV') == 'development') {
      $mock = file_get_contents(base_path('resources/json/free_response.json'));

      return response()->json(json_decode($mock), 200);
    }

    // Make an API request to get free vehicles information.
    if (env('APP_ENV') == 'production') {
      $response = Http::withUrlParameters([
        'endpoint'  => getOption('API_PLACAS_URL'),
        'plate'     => $request->plate,
        'token'     => getOption('API_PLACAS_TOKEN_FREE'),
      ])->get('{+endpoint}/consulta/{plate}/{token}');

      if ($response->failed()) {
        return response()->json(json_decode($response->body()), 400);
      }

      return response()->json(json_decode($response->body()), 200);
    }
  }
}
