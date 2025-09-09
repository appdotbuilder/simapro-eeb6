<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBorrowRequestRequest;
use App\Models\Asset;
use App\Models\BorrowRequest;
use App\Models\Category;
use App\Models\Location;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AssetPortalController extends Controller
{
    /**
     * Display the asset catalog for borrowing.
     */
    public function index(Request $request)
    {
        $query = Asset::with(['category', 'location'])
            ->available()
            ->orderBy('name');

        // Apply search filter
        if ($request->filled('search')) {
            $query->where(function($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('asset_code', 'like', '%' . $request->search . '%')
                  ->orWhere('brand', 'like', '%' . $request->search . '%');
            });
        }

        // Apply category filter
        if ($request->filled('category')) {
            $query->where('category_id', $request->category);
        }

        // Apply location filter
        if ($request->filled('location')) {
            $query->where('location_id', $request->location);
        }

        $assets = $query->paginate(12)->withQueryString();
        
        $categories = Category::orderBy('name')->get();
        $locations = Location::orderBy('name')->get();

        return Inertia::render('asset-portal/index', [
            'assets' => $assets,
            'categories' => $categories,
            'locations' => $locations,
            'filters' => $request->only(['search', 'category', 'location']),
        ]);
    }

    /**
     * Display the specified asset for borrowing.
     */
    public function show(Asset $asset)
    {
        $asset->load(['category', 'location', 'supplier']);

        return Inertia::render('asset-portal/show', [
            'asset' => $asset,
        ]);
    }

    /**
     * Store a borrow request.
     */
    public function store(StoreBorrowRequestRequest $request)
    {
        $borrowRequest = BorrowRequest::create([
            'request_code' => BorrowRequest::generateRequestCode(),
            'asset_id' => $request->asset_id,
            'borrower_name' => $request->borrower_name,
            'borrower_employee_id' => $request->borrower_employee_id,
            'borrower_phone' => $request->borrower_phone,
            'borrower_email' => $request->borrower_email,
            'borrower_department' => $request->borrower_department,
            'purpose' => $request->purpose,
            'requested_start_date' => $request->requested_start_date,
            'requested_end_date' => $request->requested_end_date,
            'notes' => $request->notes,
        ]);

        return redirect()->route('portal.my-borrowings', ['employee_id' => $request->borrower_employee_id])
            ->with('success', 'Loan request submitted successfully! Request ID: ' . $borrowRequest->request_code);
    }

    /**
     * Show the form for tracking borrowings.
     */
    public function create(Request $request)
    {
        $employeeId = $request->query('employee_id');
        
        if (!$employeeId) {
            return Inertia::render('asset-portal/my-borrowings-lookup');
        }

        $borrowRequests = BorrowRequest::with(['asset.category', 'processedBy'])
            ->where('borrower_employee_id', $employeeId)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('asset-portal/my-borrowings', [
            'borrowRequests' => $borrowRequests,
            'employeeId' => $employeeId,
        ]);
    }
}