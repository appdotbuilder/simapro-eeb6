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
        Schema::table('users', function (Blueprint $table) {
            $table->enum('role', ['admin', 'petugas', 'user'])->default('user')->after('email');
            $table->string('employee_id')->nullable()->after('role');
            $table->string('department')->nullable()->after('employee_id');
            $table->string('phone')->nullable()->after('department');
            $table->enum('status', ['active', 'inactive'])->default('active')->after('phone');
            
            // Indexes
            $table->index('role');
            $table->index('employee_id');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['role', 'employee_id', 'department', 'phone', 'status']);
        });
    }
};