<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TasksController extends Controller
{
  public function index(Request $request)
  {
    $query = Task::query();

    if ($request->has('responsible_id')) {
      $query->where('user_id', '=', $request->responsible_id);
    }

    if ($request->has('title')) {
      $query->where('title', 'like', "%{$request->title}%");
    }

    if ($request->has('status')) {
      $query->where('status', '=', $request->status);
    }

    $query->with('responsible');

    return response()->json($query->get(), 200);
  }

  public function store(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'title'          => 'required|string',
      'description'    => 'required|string',
      'final_date'     => 'required|date',
      'status'         => 'required|in:todo,doing,awaiting,approve,finished',
      'responsible_id' => 'required|exists:users,id'
    ]);

    if ($validator->fails()) {
      return response()->json($validator->errors(), 400);
    }

    Task::create([
      'title'       => $request->title,
      'description' => $request->description,
      'index'       => 0,
      'final_date'  => $request->final_date,
      'status'      => $request->status,
      'user_id'     => $request->responsible_id,
    ]);

    return response()->json(['message' => 'Tarefa cadastrada com sucesso.'], 200);
  }

  public function update(Request $request, string $id)
  {
    $task = Task::where('id', '=', $id)->first();

    if (!$task) {
      return response()->json([
        'message' => 'Tarefa não encontrada'
      ], 404);
    }

    $validator = Validator::make($request->all(), [
      'title'          => 'required|string',
      'description'    => 'required|string',
      'final_date'     => 'required|date',
      'status'         => 'required|in:todo,doing,awaiting,approve,finished',
      'responsible_id' => 'required|exists:users,id'
    ]);

    if ($validator->fails()) {
      return response()->json($validator->errors(), 400);
    }

    $task->title       = $request->title;
    $task->description = $request->description;
    $task->final_date  = $request->final_date;
    $task->status      = $request->status;
    $task->user_id     = $request->responsible_id;
    $task->save();

    return response()->json(['message' => 'Tarefa atualizada com sucesso.'], 200);
  }

  public function destroy(string $id)
  {
    $task = Task::where('id', '=', $id)->first();

    if (!$task) {
      return response()->json([
        'message' => 'Tarefa não encontrada'
      ], 404);
    }

    $task->delete();

    return response()->json(['message' => 'Tarefa removida com sucesso'], 200);
  }

  public function reorder(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'task_id'        => 'required|exists:tasks,id',
      'target_status'  => 'required|in:todo,doing,awaiting,approve,finished',
      'target_index'   => 'required|integer',
    ]);

    if ($validator->fails()) {
      return response()->json($validator->errors(), 400);
    }

    $task = Task::where('id', '=', $request->task_id)->first();

    $task->status = $request->target_status;
    $task->index = $request->target_index;
    $task->save();

    return response()->json(['message' => 'O status da tarefa foi atualizado'], 200);
  }
}
