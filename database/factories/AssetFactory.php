<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Location;
use App\Models\Supplier;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Asset>
 */
class AssetFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'asset_code' => 'AST' . str_pad((string) fake()->unique()->numberBetween(1, 9999), 6, '0', STR_PAD_LEFT),
            'name' => fake()->randomElement([
                'Laptop Dell Inspiron',
                'Office Chair',
                'Conference Table',
                'Projector Epson',
                'Printer Canon',
                'Smartphone Samsung',
                'Desktop Computer',
                'Standing Desk',
                'Whiteboard',
                'Air Conditioner'
            ]) . ' ' . fake()->randomElement(['Pro', 'Plus', 'Standard', 'Premium']),
            'description' => fake()->paragraph(),
            'photos' => null,
            'category_id' => Category::factory(),
            'brand' => fake()->randomElement(['Dell', 'HP', 'Canon', 'Epson', 'Samsung', 'Apple', 'Lenovo', 'IKEA']),
            'serial_number' => fake()->bothify('??###???###'),
            'specifications' => fake()->paragraph(),
            'location_id' => Location::factory(),
            'supplier_id' => Supplier::factory(),
            'purchase_date' => fake()->dateTimeBetween('-2 years', '-1 month'),
            'purchase_price' => fake()->randomFloat(2, 100, 50000),
            'status' => fake()->randomElement(['available', 'borrowed', 'under_repair']),
            'qr_code_path' => null,
        ];
    }

    /**
     * Indicate that the asset is available.
     */
    public function available(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'available',
        ]);
    }

    /**
     * Indicate that the asset is borrowed.
     */
    public function borrowed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'borrowed',
        ]);
    }

    /**
     * Indicate that the asset is under repair.
     */
    public function underRepair(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'under_repair',
        ]);
    }
}