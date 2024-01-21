<?php

namespace App\Http\Controllers;

class OrdersController extends Controller
{
  public function index()
  {
    return response()->json(['message' => 'Ok'], 200);
  }

  public function store()
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
