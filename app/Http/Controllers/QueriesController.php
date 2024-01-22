<?php

namespace App\Http\Controllers;

use App\Models\Query;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class QueriesController extends Controller
{
  /**
   * Search a vehicle plate and create a draft query.
   */
  public function search(Request $request)
  {
    // Validate the request
    $validator = Validator::make($request->all(), [
      'plate' => 'required|formato_placa_de_veiculo	',
    ], [
      'plate' => [
        'formato_placa_de_veiculo' => 'Informe somente números e letras'
      ]
    ]);

    if ($validator->fails()) {
      return response()->json($validator->errors(), 400);
    }

    // Fetch the plate from API.
    $url = env('API_PLACAS_URL') . "consulta/" . $request->plate . "/" . env('API_PLACAS_FREE_TOKEN');
    $response = Http::get($url);

    if ($response->status() == 406 || $response->status() == 402) {
      return response()->json($response->json(), 400);
    }

    if ($response->json()['MARCA'] == null) {
      return response()->json(['message' => $response->json()['mensagemRetorno']], 400);
    }

    // Create a draft query
    $token = Str::random(32);

    $query_results = Query::create([
      'plate' => $request->plate,
      'code'  => $token,
      'data'  => json_encode($response->json()),
    ]);

    return response()->json($query_results, 200);
  }

  /**
   * Get the query results from the unique code.
   */
  public function freeResults(string $code)
  {
    $query_results = Query::where('code', '=', $code)->first();

    if (!$query_results) {
      return response()->json(['message' => 'Resultado não encontrado'], 404);
    }

    return response()->json(json_decode($query_results->data), 200);
  }
}
