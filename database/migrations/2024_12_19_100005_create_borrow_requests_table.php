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
        Schema::create('borrow_requests', function (Blueprint $table) {
            $table->id();
            $table->string('request_code')->unique()->comment('Auto-generated request code');
            $table->foreignId('asset_id')->constrained()->onDelete('cascade');
            
            // Borrower information (no auth required)
            $table->string('borrower_name');
            $table->string('borrower_employee_id');
            $table->string('borrower_phone');
            $table->string('borrower_email')->nullable();
            $table->string('borrower_department')->nullable();
            
            // Request details
            $table->text('purpose');
            $table->datetime('requested_start_date');
            $table->datetime('requested_end_date');
            $table->enum('status', ['pending', 'approved', 'rejected', 'completed'])->default('pending');
            $table->text('notes')->nullable();
            
            // Processing information
            $table->foreignId('processed_by')->nullable()->constrained('users')->onDelete('set null');
            $table->datetime('processed_at')->nullable();
            $table->text('rejection_reason')->nullable();
            
            // Actual handover/return dates
            $table->datetime('actual_start_date')->nullable();
            $table->datetime('actual_end_date')->nullable();
            
            $table->timestamps();
            
            // Indexes for performance
            $table->index('request_code');
            $table->index('status');
            $table->index('borrower_employee_id');
            $table->index(['status', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('borrow_requests');
    }
};