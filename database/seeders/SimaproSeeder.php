<?php

namespace Database\Seeders;

use App\Models\Asset;
use App\Models\BorrowRequest;
use App\Models\Category;
use App\Models\Location;
use App\Models\MaintenanceReport;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class SimaproSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create default admin user
        User::create([
            'name' => 'Admin SIMAPRO',
            'email' => 'admin@simapro.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'employee_id' => 'ADM001',
            'department' => 'Administration',
            'phone' => '+62812345678',
            'status' => 'active',
            'email_verified_at' => now(),
        ]);

        // Create default petugas user
        User::create([
            'name' => 'Petugas Sarpras',
            'email' => 'petugas@simapro.com',
            'password' => Hash::make('password'),
            'role' => 'petugas',
            'employee_id' => 'PET001',
            'department' => 'Sarana & Prasarana',
            'phone' => '+62812345679',
            'status' => 'active',
            'email_verified_at' => now(),
        ]);

        // Create additional users
        User::factory(5)->admin()->create();
        User::factory(10)->petugas()->create();
        User::factory(20)->regularUser()->create();

        // Create categories
        $categories = [
            ['name' => 'Electronics', 'description' => 'Electronic devices and gadgets'],
            ['name' => 'Furniture', 'description' => 'Office and general furniture'],
            ['name' => 'Vehicles', 'description' => 'Cars, motorcycles, and other vehicles'],
            ['name' => 'Tools', 'description' => 'Hand tools and power tools'],
            ['name' => 'Office Equipment', 'description' => 'Printers, scanners, and office machines'],
            ['name' => 'Medical Equipment', 'description' => 'Medical devices and instruments'],
            ['name' => 'Sports Equipment', 'description' => 'Sports and recreational equipment'],
            ['name' => 'Audio Visual', 'description' => 'Projectors, screens, and AV equipment'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }

        // Create locations
        $locations = [
            ['name' => 'Central Warehouse', 'description' => 'Main storage facility'],
            ['name' => '1st Floor Storage', 'description' => 'Ground floor storage room'],
            ['name' => '2nd Floor Storage', 'description' => 'Second floor storage area'],
            ['name' => '3rd Floor Office', 'description' => 'Third floor office area'],
            ['name' => '4th Floor Conference', 'description' => 'Fourth floor conference rooms'],
            ['name' => '5th Floor IT', 'description' => 'IT department floor'],
            ['name' => 'Basement Storage', 'description' => 'Underground storage area'],
            ['name' => 'Main Office', 'description' => 'Primary office building'],
        ];

        foreach ($locations as $location) {
            Location::create($location);
        }

        // Create suppliers
        Supplier::factory(15)->create();

        // Create assets
        Asset::factory(50)->available()->create();
        Asset::factory(10)->borrowed()->create();
        Asset::factory(5)->underRepair()->create();

        // Create borrow requests
        BorrowRequest::factory(20)->pending()->create();
        BorrowRequest::factory(15)->approved()->create();
        BorrowRequest::factory(8)->rejected()->create();

        // Create maintenance reports
        MaintenanceReport::factory(25)->pending()->create();
        MaintenanceReport::factory(15)->completed()->create();
    }
}