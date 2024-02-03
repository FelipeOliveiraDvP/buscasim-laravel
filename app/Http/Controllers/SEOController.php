<?php

namespace App\Http\Controllers;

class SEOController extends Controller
{
  /**
   * Makes React SPA SEO friendly.
   *
   * @return \Illuminate\Contracts\View\View|\Illuminate\Contracts\View\Factory
   */
  public function index()
  {
    $meta = [
      'title'       => env('APP_NAME'),
      'description' => env('APP_DESCRIPTION'),
      'url'         => env('APP_URL'),
      'image'       => asset('cover.jpeg'),
    ];

    return view('index', ['meta' => $meta]);
  }
}
