<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\MaintenanceReport
 *
 * @property int $id
 * @property int $asset_id
 * @property string $type
 * @property string $description
 * @property string $severity
 * @property string|null $cost
 * @property \Illuminate\Support\Carbon|null $scheduled_date
 * @property \Illuminate\Support\Carbon|null $completed_date
 * @property string $status
 * @property string $reporter_name
 * @property string $reporter_type
 * @property int|null $reported_by
 * @property int|null $assigned_to
 * @property string|null $work_performed
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Asset $asset
 * @property-read \App\Models\User|null $reportedBy
 * @property-read \App\Models\User|null $assignedTo
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceReport newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceReport newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceReport query()
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceReport pending()
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceReport whereAssetId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceReport whereAssignedTo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceReport whereCompletedDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceReport whereCost($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceReport whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceReport whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceReport whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceReport whereReportedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceReport whereReporterName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceReport whereReporterType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceReport whereScheduledDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceReport whereSeverity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceReport whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceReport whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceReport whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceReport whereWorkPerformed($value)
 * @method static \Database\Factories\MaintenanceReportFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class MaintenanceReport extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'asset_id',
        'type',
        'description',
        'severity',
        'cost',
        'scheduled_date',
        'completed_date',
        'status',
        'reporter_name',
        'reporter_type',
        'reported_by',
        'assigned_to',
        'work_performed',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'scheduled_date' => 'date',
        'completed_date' => 'date',
        'cost' => 'decimal:2',
    ];

    /**
     * Get the asset that owns the maintenance report.
     */
    public function asset(): BelongsTo
    {
        return $this->belongsTo(Asset::class);
    }

    /**
     * Get the user who reported the maintenance.
     */
    public function reportedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reported_by');
    }

    /**
     * Get the user assigned to handle the maintenance.
     */
    public function assignedTo(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    /**
     * Scope a query to only include pending maintenance reports.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }
}