<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\ChatbotController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AccountController;

Route::get('/', [LandingController::class, 'index'])->name('landing');


Route::get('/katalog', fn() => Inertia::render('Katalog'));
Route::get('/bengkel', fn() => Inertia::render('Bengkel'));
//chatbot
Route::post('/chatbot/ask', [ChatbotController::class, 'ask'])->name('chatbot.ask');
Route::get('/chatbot/ping', [ChatbotController::class, 'ping']);

Route::middleware(['auth','verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/dashboard/spareparts', [DashboardController::class, 'spareparts'])->name('dashboard.spareparts');
    Route::get('/dashboard/settings', [DashboardController::class, 'settings'])->name('dashboard.settings');

    Route::post('/dashboard/settings', [AccountController::class, 'update'])->name('dashboard.settings.update');
});

require __DIR__.'/settings.php';
