<?php

use App\Models\Option;

/**
 * Get a system option by key. If is no options for the give key, returns a default value.
 */
function getOption(string $key, $default = null)
{
  $option = Option::where('key', '=', $key)->first();

  if (!$option) return $default;

  return $option->value;
}

/**
 * Set a system option and returns false if an error occurs.
 */
function setOption(string $key, $value)
{
  if (!$key || !$value) return false;

  $option = Option::where('key', '=', $key)->first();

  if (!$option) return false;

  $option->value = $value;
  $option->save();

  return true;
}
