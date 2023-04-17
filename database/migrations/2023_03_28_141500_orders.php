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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('week_issued');
            $table->string('product_order');
            $table->string('item_code');
            $table->string('description');
            $table->integer('quantity');
            $table->string('cutting')->nullable();
            $table->date('date_cutted')->nullable();
            $table->string('assembly_prep')->nullable();
            $table->date('date_preped')->nullable();
            $table->string('assembly_one')->nullable();
            $table->date('date_assembled_one')->nullable();
            $table->string('assembly_two')->nullable();
            $table->date('date_assembled_two')->nullable();
            $table->string('quality_control')->nullable();
            $table->date('date_checked')->nullable();
            $table->string('finishing_one')->nullable();
            $table->date('date_finished_one')->nullable();
            $table->string('finishing_two')->nullable();
            $table->string('status');
            $table->date('date_started');
            $table->date('date_finished')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
