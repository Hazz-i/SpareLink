<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;               
use Illuminate\Support\Facades\Auth;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        // Bagikan data user ke semua halaman Inertia (dalam closure supaya aman di CLI)
        Inertia::share('auth', fn () => [
            'user' => Auth::user(),
        ]);
    }
}
