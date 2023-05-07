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
        Schema::table('orders', function (Blueprint $table) {
            $table->string('cutting_start')->nullable()->after('cutting');
            $table->string('assembly_prep_start')->nullable()->after('assembly_prep');
            $table->string('assembly_one_start')->nullable()->after('assembly_one');
            $table->string('assembly_two_start')->nullable()->after('assembly_two');
            $table->string('quality_control_start')->nullable()->after('quality_control');
            $table->string('finishing_one_start')->nullable()->after('finishing_one');
            $table->string('finishing_two_start')->nullable()->after('finishing_two');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn(['cutting_start', 'assembly_prep_start', 'assembly_one_start', 'assembly_two_start', 'quality_control_start', 'finishing_one_start', 'finishing_two_start']);
        });
    }
};
