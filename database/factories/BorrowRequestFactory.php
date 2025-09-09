<?php

namespace Database\Factories;

use App\Models\Asset;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BorrowRequest>
 */
class BorrowRequestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $requestedStart = fake()->dateTimeBetween('-1 month', '+2 weeks');
        $requestedEnd = fake()->dateTimeBetween($requestedStart, '+1 month');
        
        return [
            'request_code' => 'REQ' . str_pad((string) fake()->unique()->numberBetween(1, 9999), 6, '0', STR_PAD_LEFT),
            'asset_id' => Asset::factory(),
            'borrower_name' => fake()->name(),
            'borrower_employee_id' => 'EMP' . fake()->unique()->numberBetween(1000, 9999),
            'borrower_phone' => fake()->phoneNumber(),
            'borrower_email' => fake()->safeEmail(),
            'borrower_department' => fake()->randomElement([
                'IT Department',
                'Human Resources',
                'Finance',
                'Marketing',
                'Operations',
                'Sales',
                'Administration'
            ]),
            'purpose' => fake()->sentence(),
            'requested_start_date' => $requestedStart,
            'requested_end_date' => $requestedEnd,
            'status' => fake()->randomElement(['pending', 'approved', 'rejected']),
            'notes' => fake()->optional()->sentence(),
            'processed_by' => null,
            'processed_at' => null,
            'rejection_reason' => null,
            'actual_start_date' => null,
            'actual_end_date' => null,
        ];
    }

    /**
     * Indicate that the request is pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
            'processed_by' => null,
            'processed_at' => null,
        ]);
    }

    /**
     * Indicate that the request is approved.
     */
    public function approved(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'approved',
            'processed_by' => User::factory(),
            'processed_at' => fake()->dateTimeBetween('-1 week', 'now'),
        ]);
    }

    /**
     * Indicate that the request is rejected.
     */
    public function rejected(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'rejected',
            'processed_by' => User::factory(),
            'processed_at' => fake()->dateTimeBetween('-1 week', 'now'),
            'rejection_reason' => fake()->sentence(),
        ]);
    }
}