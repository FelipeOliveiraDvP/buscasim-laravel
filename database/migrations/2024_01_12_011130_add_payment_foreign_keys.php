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
    Schema::table('payment_orders', function (Blueprint $table) {
      $table->foreign('process_id', 'order_process')->references('id')->on('processes')->onDelete('cascade');
    });

    Schema::table('installments', function (Blueprint $table) {
      $table->foreign('order_id', 'installment_order')->references('id')->on('payment_orders')->onDelete('cascade');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::table('payment_orders', function (Blueprint $table) {
      $table->dropForeign('order_process');
    });

    Schema::table('installments', function (Blueprint $table) {
      $table->dropForeign('installment_order');
    });
  }
};
