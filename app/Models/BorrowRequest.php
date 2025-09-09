<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\BorrowRequest
 *
 * @property int $id
 * @property string $request_code
 * @property int $asset_id
 * @property string $borrower_name
 * @property string $borrower_employee_id
 * @property string $borrower_phone
 * @property string|null $borrower_email
 * @property string|null $borrower_department
 * @property string $purpose
 * @property \Illuminate\Support\Carbon $requested_start_date
 * @property \Illuminate\Support\Carbon $requested_end_date
 * @property string $status
 * @property string|null $notes
 * @property int|null $processed_by
 * @property \Illuminate\Support\Carbon|null $processed_at
 * @property string|null $rejection_reason
 * @property \Illuminate\Support\Carbon|null $actual_start_date
 * @property \Illuminate\Support\Carbon|null $actual_end_date
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Asset $asset
 * @property-read \App\Models\User|null $processedBy
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowRequest newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowRequest newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowRequest query()
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowRequest pending()
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowRequest approved()
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowRequest active()
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowRequest whereActualEndDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowRequest whereActualStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowRequest whereAssetId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowRequest whereBorrowerDepartment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowRequest whereBorrowerEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowRequest whereBorrowerEmployeeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowRequest whereBorrowerName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowRequest whereBorrowerPhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowRequest whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowRequest whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowRequest whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowRequest whereProcessedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowRequest whereProcessedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowRequest wherePurpose($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowRequest whereRejectionReason($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowRequest whereRequestCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowRequest whereRequestedEndDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowRequest whereRequestedStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowRequest whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowRequest whereUpdatedAt($value)
 * @method static \Database\Factories\BorrowRequestFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class BorrowRequest extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'request_code',
        'asset_id',
        'borrower_name',
        'borrower_employee_id',
        'borrower_phone',
        'borrower_email',
        'borrower_department',
        'purpose',
        'requested_start_date',
        'requested_end_date',
        'status',
        'notes',
        'processed_by',
        'processed_at',
        'rejection_reason',
        'actual_start_date',
        'actual_end_date',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'requested_start_date' => 'datetime',
        'requested_end_date' => 'datetime',
        'processed_at' => 'datetime',
        'actual_start_date' => 'datetime',
        'actual_end_date' => 'datetime',
    ];

    /**
     * Get the asset that owns the borrow request.
     */
    public function asset(): BelongsTo
    {
        return $this->belongsTo(Asset::class);
    }

    /**
     * Get the user who processed the request.
     */
    public function processedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'processed_by');
    }

    /**
     * Scope a query to only include pending requests.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope a query to only include approved requests.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    /**
     * Scope a query to only include active borrowings.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'approved')
                    ->whereNotNull('actual_start_date')
                    ->whereNull('actual_end_date');
    }

    /**
     * Generate and return the next request code.
     *
     * @return string
     */
    public static function generateRequestCode(): string
    {
        $lastRequest = self::orderBy('id', 'desc')->first();
        $nextNumber = $lastRequest ? $lastRequest->id + 1 : 1;
        
        return 'REQ' . str_pad((string) $nextNumber, 6, '0', STR_PAD_LEFT);
    }
}