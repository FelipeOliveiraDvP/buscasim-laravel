<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Task;
use Illuminate\Support\Carbon;

class DashboardController extends Controller
{
  public function events()
  {
    $query = Event::query();
    $start_date = Carbon::now()->firstOfMonth();
    $final_date = Carbon::now()->lastOfMonth();

    $query->whereBetween('final_date', [$start_date, $final_date]);

    return response()->json($query->with('responsible')->get(), 200);
  }

  public function tasks()
  {
    $query = Task::query();
    $query->orderBy('final_date', 'asc');

    return response()->json($query->with('responsible')->get(), 200);
  }

  public function processes()
  {
    return response()->json(['message' => 'Ok'], 200);
  }
}
