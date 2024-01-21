<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class QueriesController extends Controller
{
  public function index()
  {
    return response()->json(['message' => 'Ok'], 200);
  }

  public function search(Request $request)
  {
    return response()->json(['message' => 'Ok'], 200);
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
