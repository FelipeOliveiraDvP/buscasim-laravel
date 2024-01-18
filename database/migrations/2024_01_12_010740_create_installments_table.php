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
    Schema::create('installments', function (Blueprint $table) {
      $table->id();
      $table->foreignId('order_id');
      $table->integer('number', false, true);
      $table->boolean('is_paid');
      $table->date('due_date');
      $table->timestamps();
      $table->softDeletes();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('installments');
  }
};
