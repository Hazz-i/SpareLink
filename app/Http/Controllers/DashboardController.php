<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        // Contoh data ringkas — ganti dengan query real kalau sudah ada model
        $stats = [
            ['label' => 'Total Produk', 'value' => 128],
            ['label' => 'Varian Terjual Bulan Ini', 'value' => 342],
            ['label' => 'Bengkel Terdaftar', 'value' => 18],
        ];

        $recent = [
            ['name' => 'Busi Iridium IX', 'action' => 'Ditambahkan', 'time' => '2 jam lalu'],
            ['name' => 'Kampas Rem ASPIRA', 'action' => 'Update Stok', 'time' => 'Kemarin'],
        ];

        return Inertia::render('Dashboard/Index', compact('stats','recent'));
    }

    public function spareparts(Request $request): Response
    {
        // Contoh data list — implementasikan pagination dari DB jika siap
        $items = [
            ['id' => 1, 'name' => 'Busi Iridium IX', 'brand' => 'NGK', 'price' => 85000, 'stock' => 12],
            ['id' => 2, 'name' => 'Kampas Rem Cakram', 'brand' => 'ASPIRA', 'price' => 98000, 'stock' => 7],
            ['id' => 3, 'name' => 'Shock Absorber Zeto', 'brand' => 'Kayaba', 'price' => 450000, 'stock' => 5],
        ];

        return Inertia::render('Dashboard/Spareparts', [
            'items' => $items,
        ]);
    }

    public function settings(Request $request): Response
    {
        return Inertia::render('Dashboard/Settings', [
            'user' => $request->user(),
        ]);
    }
}
