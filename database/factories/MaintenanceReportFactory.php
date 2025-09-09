<?php

namespace Database\Factories;

use App\Models\Asset;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MaintenanceReport>
 */
class MaintenanceReportFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'asset_id' => Asset::factory(),
            'type' => fake()->randomElement(['damage_report', 'routine_maintenance', 'repair']),
            'description' => fake()->paragraph(),
            'severity' => fake()->randomElement(['low', 'medium', 'high', 'critical']),
            'cost' => fake()->optional()->randomFloat(2, 50, 5000),
            'scheduled_date' => fake()->optional()->dateTimeBetween('-1 month', '+2 months'),
            'completed_date' => null,
            'status' => fake()->randomElement(['pending', 'in_progress', 'completed']),
            'reporter_name' => fake()->name(),
            'reporter_type' => fake()->randomElement(['user', 'staff', 'admin']),
            'reported_by' => fake()->optional()->randomElement([null, User::factory()]),
            'assigned_to' => fake()->optional()->randomElement([null, User::factory()]),
            'work_performed' => null,
        ];
    }

    /**
     * Indicate that the maintenance is pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
            'completed_date' => null,
            'work_performed' => null,
        ]);
    }

    /**
     * Indicate that the maintenance is completed.
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'completed',
            'completed_date' => fake()->dateTimeBetween('-1 month', 'now'),
            'work_performed' => fake()->paragraph(),
        ]);
    }
}