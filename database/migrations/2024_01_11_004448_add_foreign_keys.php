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
    Schema::table('customers', function (Blueprint $table) {
      $table->foreign('address_id', 'customer_address')->references('id')->on('addresses')->onDelete('cascade');
      $table->foreign('indication_id', 'customer_indication')->references('id')->on('indications')->onDelete('cascade');
    });

    Schema::table('events', function (Blueprint $table) {
      $table->foreign('user_id', 'event_user')->references('id')->on('users')->onDelete('cascade');
    });

    Schema::table('tasks', function (Blueprint $table) {
      $table->foreign('user_id', 'task_user')->references('id')->on('users')->onDelete('cascade');
    });

    Schema::table('processes', function (Blueprint $table) {
      $table->foreign('customer_id', 'process_customer')->references('id')->on('customers')->onDelete('cascade');
      $table->foreign('user_id', 'process_user')->references('id')->on('users')->onDelete('cascade');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::table('customers', function (Blueprint $table) {
      $table->dropForeign('customer_address');
      $table->dropForeign('customer_indication');
    });

    Schema::table('events', function (Blueprint $table) {
      $table->dropForeign('event_user');
    });

    Schema::table('tasks', function (Blueprint $table) {
      $table->dropForeign('task_user');
    });

    Schema::table('processes', function (Blueprint $table) {
      $table->dropForeign('process_customer');
      $table->dropForeign('process_user');
    });
  }
};
