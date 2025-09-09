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
        Schema::create('assets', function (Blueprint $table) {
            $table->id();
            $table->string('asset_code')->unique()->comment('Auto-generated unique asset code');
            $table->string('name');
            $table->text('description')->nullable();
            $table->json('photos')->nullable()->comment('Array of photo paths');
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->string('brand')->nullable();
            $table->string('serial_number')->nullable();
            $table->text('specifications')->nullable();
            $table->foreignId('location_id')->constrained()->onDelete('cascade');
            $table->foreignId('supplier_id')->nullable()->constrained()->onDelete('set null');
            $table->date('purchase_date')->nullable();
            $table->decimal('purchase_price', 12, 2)->nullable();
            $table->enum('status', ['available', 'borrowed', 'under_repair', 'damaged', 'deleted'])->default('available');
            $table->string('qr_code_path')->nullable()->comment('Path to generated QR code image');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('asset_code');
            $table->index('name');
            $table->index('status');
            $table->index(['status', 'category_id']);
            $table->index(['status', 'location_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assets');
    }
};