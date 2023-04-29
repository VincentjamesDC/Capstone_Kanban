<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'name' => 'Cutting Head',
            'email' => 'cutting@example.com',
            'department' => 'Cutting',
            'role' => 'User',
        ]);

        \App\Models\User::factory()->create([
            'name' => 'Assembly Prep Head',
            'email' => 'prep@example.com',
            'department' => 'Assembly-Prep',
            'role' => 'User',
        ]);

        \App\Models\User::factory()->create([
            'name' => 'Assembly 1 Head',
            'email' => 'assembly1@example.com',
            'department' => 'Assembly-1',
            'role' => 'User',
        ]);

        \App\Models\User::factory()->create([
            'name' => 'Assembly 2 Head',
            'email' => 'assembly2@example.com',
            'department' => 'Assembly-2',
            'role' => 'User',
        ]);

        \App\Models\User::factory()->create([
            'name' => 'Quality Control Head',
            'email' => 'quality@example.com',
            'department' => 'Quality-Control',
            'role' => 'User',
        ]);

        \App\Models\User::factory()->create([
            'name' => 'Finishing 1 Head',
            'email' => 'finishing1@example.com',
            'department' => 'Finishing-1',
            'role' => 'User',
        ]);

        \App\Models\User::factory()->create([
            'name' => 'Finishing 2 Head',
            'email' => 'finishing2@example.com',
            'department' => 'Finishing-2',
            'role' => 'User',
        ]);

        \App\Models\User::factory()->create([
            'name' => 'Test Admin',
            'email' => 'admin@example.com',
            'department' => 'IT',
            'role' => 'Admin',
        ]);
    }
}
