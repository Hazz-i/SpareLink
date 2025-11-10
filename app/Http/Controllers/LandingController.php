<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class LandingController extends Controller
{
    /**
     * Tampilkan halaman landing utama (React via Inertia)
     */
    public function index(): Response
    {
        return Inertia::render('Landing', [
            'hero' => [
                'title' => 'Rawat Motor Jadi Lebih Mudah 🚀',
                'subtitle' => 'Temukan bengkel terpercaya, sparepart original, dan konsultasi langsung lewat chatbot interaktif.',
                'ctaPrimary' => 'Cari Bengkel',
                'ctaSecondary' => 'Lihat Sparepart',
            ],
            'features' => [
                [
                    'title' => 'Katalog Sparepart Lengkap',
                    'desc' => 'Informasi harga, stok, dan kompatibilitas motor.',
                    'icon' => 'fa-solid fa-gear',
                ],
                [
                    'title' => 'Bengkel Terdekat',
                    'desc' => 'Temukan bengkel berdasarkan lokasi dan rating pengguna.',
                    'icon' => 'fa-solid fa-location-dot',
                ],
                [
                    'title' => 'Chatbot 24/7',
                    'desc' => 'Konsultasi langsung untuk tanya sparepart atau booking servis.',
                    'icon' => 'fa-solid fa-comments',
                ],
                [
                    'title' => 'Promo & Diskon',
                    'desc' => 'Nikmati promo dan penawaran khusus untuk pelanggan loyal.',
                    'icon' => 'fa-solid fa-tag',
                ],
            ],
        ]);
    }
}
