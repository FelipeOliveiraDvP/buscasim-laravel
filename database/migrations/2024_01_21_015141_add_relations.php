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
    Schema::table('queries', function (Blueprint $table) {
      $table->foreign('user_id', 'query_user')->references('id')->on('users')->onDelete('cascade');
    });

    Schema::table('orders', function (Blueprint $table) {
      $table->foreign('query_id', 'order_query')->references('id')->on('queries')->onDelete('cascade');
      $table->foreign('coupon_id', 'order_coupon')->references('id')->on('coupons')->onDelete('cascade');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::table('queries', function (Blueprint $table) {
      $table->dropForeign('query_user');
    });

    Schema::table('orders', function (Blueprint $table) {
      $table->dropForeign('order_query');
      $table->dropForeign('order_coupon');
    });
  }
};
