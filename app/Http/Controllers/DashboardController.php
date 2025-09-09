<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Asset;
use App\Models\BorrowRequest;
use App\Models\MaintenanceReport;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard based on user role.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        // Common statistics
        $stats = [
            'total_assets' => Asset::count(),
            'available_assets' => Asset::where('status', 'available')->count(),
            'borrowed_assets' => Asset::where('status', 'borrowed')->count(),
            'under_repair_assets' => Asset::where('status', 'under_repair')->count(),
            'pending_requests' => BorrowRequest::where('status', 'pending')->count(),
            'active_borrowings' => BorrowRequest::where('status', 'approved')
                ->whereNotNull('actual_start_date')
                ->whereNull('actual_end_date')
                ->count(),
        ];

        // Role-specific data
        $dashboardData = [
            'stats' => $stats,
            'user_role' => $user->role,
        ];

        if ($user->canManageAssets()) {
            // Additional data for admin/petugas
            $dashboardData['recent_requests'] = BorrowRequest::with(['asset', 'processedBy'])
                ->orderBy('created_at', 'desc')
                ->limit(5)
                ->get();
                
            $dashboardData['pending_maintenance'] = MaintenanceReport::with('asset')
                ->where('status', 'pending')
                ->orderBy('created_at', 'desc')
                ->limit(5)
                ->get();
        }

        return Inertia::render('dashboard', $dashboardData);
    }
}