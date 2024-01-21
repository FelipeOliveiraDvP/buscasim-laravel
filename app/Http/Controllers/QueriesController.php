<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class QueriesController extends Controller
{
  public function index()
  {
    return response()->json(['message' => 'Ok'], 200);
  }

  public function search(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'plate' => 'required|formato_placa_de_veiculo	',
    ]);

    if ($validator->fails()) {
      return response()->json($validator->errors(), 400);
    }

    $url = env('API_PLACAS_URL') . "consulta/" . $request->plate . "/" . env('API_PLACAS_TOKEN');
    $response = Http::get($url);

    if ($response->status() == 406) {
      return response()->json($response->json(), 400);
    }

    if ($response->status() == 402) {
      return response()->json($response->json(), 400);
    }

    if ($response->json()['MARCA'] == null) {
      return response()->json(['message' => $response->json()['mensagemRetorno']], 400);
    }

    $json = $response->json();

    return response()->json($json["MARCA"] == null, 200);
  }

  public function update()
  {
    return response()->json(['message' => 'Ok'], 200);
  }

  public function destroy()
  {
    return response()->json(['message' => 'Ok'], 200);
  }
}
