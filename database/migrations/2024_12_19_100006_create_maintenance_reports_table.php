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
        Schema::create('maintenance_reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('asset_id')->constrained()->onDelete('cascade');
            $table->enum('type', ['damage_report', 'routine_maintenance', 'repair']);
            $table->text('description');
            $table->enum('severity', ['low', 'medium', 'high', 'critical'])->default('medium');
            $table->decimal('cost', 10, 2)->nullable();
            $table->date('scheduled_date')->nullable();
            $table->date('completed_date')->nullable();
            $table->enum('status', ['pending', 'in_progress', 'completed'])->default('pending');
            
            // Reporter information (could be user or staff)
            $table->string('reporter_name');
            $table->string('reporter_type')->comment('user, staff, admin');
            $table->foreignId('reported_by')->nullable()->constrained('users')->onDelete('set null');
            
            // Maintenance performed by
            $table->foreignId('assigned_to')->nullable()->constrained('users')->onDelete('set null');
            $table->text('work_performed')->nullable();
            
            $table->timestamps();
            
            // Indexes
            $table->index(['asset_id', 'type']);
            $table->index(['status', 'scheduled_date']);
            $table->index('type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('maintenance_reports');
    }
};