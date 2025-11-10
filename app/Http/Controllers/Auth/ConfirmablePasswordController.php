<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class ConfirmablePasswordController extends Controller
{
    public function show(): Response
    {
        return Inertia::render('Auth/ConfirmPassword');
    }

    public function store(Request $request)
    {
        if (!Hash::check($request->password, $request->user()->password)) {
            return back()->withErrors(['password' => __('Password salah.')]);
        }

        $request->session()->passwordConfirmed();

        return redirect()->intended('/');
    }
}
