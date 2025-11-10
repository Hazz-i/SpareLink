<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Services\ChatbotService;

class ChatbotController extends Controller
{
    public function ask(Request $request, ChatbotService $bot)
    {
        try {
            $message = (string) $request->input('message', '');
            if ($message === '') {
                return response()->json([
                    'by' => 'SpareAsk',
                    'reply' => 'Masukkan pertanyaan ya.',
                ], 200);
            }

            // Panggil service di dalam try-catch agar tidak pernah melempar 500
            $reply = $bot->generateResponse($message);

            return response()->json([
                'by' => 'SpareAsk',
                'reply' => $reply,
            ], 200);

        } catch (\Throwable $e) {
            Log::error('SpareAsk /chatbot/ask error', [
                'msg' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);

            // Selalu balas 200 agar widget tidak .catch
            return response()->json([
                'by' => 'SpareAsk',
                'reply' => '⚠️ Terjadi kendala pada server. Coba lagi sebentar, ya.',
            ], 200);
        }
    }

    // Endpoint test untuk memastikan route & CSRF OK
    public function ping()
    {
        return response()->json(['ok' => true, 'msg' => 'SpareAsk up'], 200);
    }
}
