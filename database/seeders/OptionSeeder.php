<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OptionSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    DB::table('options')->insert([
      [
        'key'   => 'API_PLACAS_URL',
        'value' => 'https://wdapi2.com.br/',
      ],
      [
        'key'   => 'API_PLACAS_TOKEN_FREE',
        'value' => '',
      ],
      [
        'key'   => 'API_PLACAS_TOKEN_PREMIUM',
        'value' => '',
      ],
      [
        'key'   => 'PRICE',
        'value' => '20.00',
      ],
    ]);
  }
}
