<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class ChatbotService
{
    private string $apiKey;
    private string $baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

    public function __construct()
    {
        $this->apiKey = (string) config('services.gemini.key', '');
    }

    private function readContextFile(string $relativePath, string $fallback = '—'): string
    {
        $full = storage_path('app/chatbot/'.$relativePath);
        return file_exists($full) ? trim((string) file_get_contents($full)) : $fallback;
    }

    private function retrieveContextFromFiles(string $question): string
    {
        $sp = $this->readContextFile('spareparts.txt', 'Tidak ada data sparepart.');
        $ws = $this->readContextFile('workshops.txt', 'Tidak ada data bengkel.');
        return "KONTEKS SPAREPART:\n{$sp}\n\nKONTEKS BENGKEL:\n{$ws}\n";
    }

    public function generateResponse(string $question): string
    {
        $context = $this->retrieveContextFromFiles($question);

        $prompt =
            "Anda adalah SpareAsk, chatbot ramah untuk situs bengkel & katalog sparepart motor.\n".
            "Jawab ringkas, akurat, dan berbasis data. Jika data tidak ada, katakan jujur.\n\n".
            "Konteks:\n{$context}\n".
            "Pertanyaan pengguna: {$question}\n\n".
            "Berikan jawaban jelas (boleh bullet), dan rekomendasikan sparepart/bengkel yang paling cocok jika relevan.";

        // Jika API key kosong, jawab lokal agar tidak 500
        if ($this->apiKey === '') {
            return "Catatan: kunci API belum di-set. Jawaban berdasarkan konteks lokal saja.\n\n".
                   "• {$question}\n• Coba isi file konteks di storage/app/chatbot/ untuk hasil lebih baik.";
        }

        try {
            $response = Http::timeout(20)
                ->withHeaders(['Content-Type' => 'application/json'])
                ->post("{$this->baseUrl}?key={$this->apiKey}", [
                    'contents' => [[ 'parts' => [ ['text' => $prompt] ] ]]
                ]);

            if (!$response->ok()) {
                return "❌ Gagal menghubungi layanan AI: ".$response->body();
            }

            $data = $response->json();
            return $data['candidates'][0]['content']['parts'][0]['text']
                ?? '⚠️ Tidak ada respons dari AI.';
        } catch (\Throwable $e) {
            return "⚠️ Tidak bisa menghubungi layanan AI saat ini.";
        }
    }
}
