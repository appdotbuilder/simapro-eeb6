<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Location>
 */
class LocationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->randomElement([
                'Central Warehouse',
                '1st Floor Storage',
                '2nd Floor Storage',
                '3rd Floor Office',
                '4th Floor Conference',
                '5th Floor IT',
                'Basement Storage',
                'Main Office',
                'Branch Office A',
                'Branch Office B'
            ]),
            'description' => fake()->sentence(),
        ];
    }
}