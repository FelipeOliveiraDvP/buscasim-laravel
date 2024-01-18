<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Validator;

class SchedulesController extends Controller
{
  public function index(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'start_date' => 'date',
      'final_date' => 'date',
    ]);

    if ($validator->fails()) {
      return response()->json([], 200);
    }

    $query = Event::query();

    $query->whereBetween('start_date', [$request->start_date, $request->final_date]);

    return response()->json($query->with('responsible:id,name,email')->get(), 200);
  }

  public function store(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'title'          => 'required|string',
      'color'          => 'required|string|size:7',
      'location'       => 'required|string',
      'start_date'     => 'required|date',
      'final_date'     => 'required|date',
      'responsible_id' => 'required|exists:users,id'
    ]);

    if ($validator->fails()) {
      return response()->json($validator->errors(), 400);
    }

    Event::create([
      'title'          => $request->title,
      'color'          => $request->color,
      'location'       => $request->location,
      'start_date'     => $request->start_date,
      'final_date'     => $request->final_date,
      'user_id' => $request->responsible_id,
    ]);

    return response()->json(['message' => 'Evento cadastrado com sucesso'], 201);
  }

  public function update(Request $request, string $id)
  {
    $event = Event::where('id', '=', $id)->first();

    if (!$event) {
      return response()->json(['message' => 'Evento não encontrado'], 400);
    }

    $validator = Validator::make($request->all(), [
      'title'          => 'required|string',
      'color'          => 'required|string|size:7',
      'location'       => 'required|string',
      'start_date'     => 'required|date',
      'final_date'     => 'required|date',
      'responsible_id' => 'required|exists:users,id'
    ]);

    if ($validator->fails()) {
      return response()->json($validator->errors(), 400);
    }

    $event->title           = $request->title;
    $event->color           = $request->color;
    $event->location        = $request->location;
    $event->start_date      = $request->start_date;
    $event->final_date      = $request->final_date;
    $event->user_id  = $request->responsible_id;
    $event->save();

    return response()->json(['message' => 'Evento atualizado com sucesso'], 200);
  }

  public function destroy(string $id)
  {
    $event = Event::where('id', '=', $id)->first();

    if (!$event) {
      return response()->json(['message' => 'Evento não encontrado'], 400);
    }

    $event->delete();

    return response()->json(['message' => 'Evento removido com sucesso'], 200);
  }
}
