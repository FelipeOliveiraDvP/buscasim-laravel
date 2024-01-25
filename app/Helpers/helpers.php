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

/**
 * Make a HTTP Get request and returns a JSON.
 */
function httpGet(string $url)
{
  $curl = curl_init();

  curl_setopt($curl, CURLOPT_URL, $url);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($curl, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V4);

  $response = curl_exec($curl);

  if ($error = curl_error($curl)) {
    return ['error' => $error];
  }

  $json = json_decode($response, true);

  curl_close($curl);

  return $json;
}
