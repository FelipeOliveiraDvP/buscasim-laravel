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
    Schema::create('payment_orders', function (Blueprint $table) {
      $table->id();
      $table->foreignId('process_id');
      $table->integer('installments', false, true)->default(1);
      $table->string('contract_file')->nullable();
      $table->boolean('has_invoice')->default(false);
      $table->timestamps();
      $table->softDeletes();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('payment_orders');
  }
};
