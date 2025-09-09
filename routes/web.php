<?php

use App\Http\Controllers\AssetPortalController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Public Asset Portal Routes (no authentication required)
Route::prefix('portal')->name('portal.')->group(function () {
    Route::get('assets', [AssetPortalController::class, 'index'])->name('assets');
    Route::get('assets/{asset}', [AssetPortalController::class, 'show'])->name('assets.show');
    Route::post('borrow', [AssetPortalController::class, 'store'])->name('borrow.store');
    Route::get('my-borrowings', [AssetPortalController::class, 'create'])->name('my-borrowings');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
