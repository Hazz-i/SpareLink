<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@sparelink.com'],
            [
                'name' => 'Admin SpareLink',
                'password' => Hash::make('spare123'),
                'email_verified_at' => now(),
            ]
        );
    }
}
