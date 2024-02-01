<?php

namespace App\Traits;

use App\Models\Option;

trait Helpers
{
  /**
   * Get a system option by key. If is no options for the give key, returns a default value.
   *
   * @param string $key
   * @param string|null $default
   * @return string
   */
  protected function getOption(string $key, $default = null)
  {
    $option = Option::where('key', '=', $key)->first();

    if (!$option) return $default;

    return $option->value;
  }

  /**
   * Update a system option and returns false if an error occurs.
   *
   * @param string $key
   * @param mixed $value
   * @return bool
   */
  protected function setOption(string $key, mixed $value)
  {
    if (!$key || !$value) return false;

    $option = Option::where('key', '=', $key)->first();

    if (!$option) return false;

    $option->value = $value;
    $option->save();

    return true;
  }
}
