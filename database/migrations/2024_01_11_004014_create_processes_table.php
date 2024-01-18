<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('processes', function (Blueprint $table) {
      $table->id();
      $table->string('process_number')->unique();
      $table->integer('situation_type', false, true);
      $table->integer('legal_type', false, true);
      $table->string('tribunal');
      $table->boolean('is_probono')->default(false);
      $table->double('amount', 5, 2, true)->default(0);
      $table->date('final_date')->nullable();
      $table->foreignId('customer_id');
      $table->foreignId('user_id');
      $table->timestamps();
      $table->softDeletes();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('processes');
  }
};
