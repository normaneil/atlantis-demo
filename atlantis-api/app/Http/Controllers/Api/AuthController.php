<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','register']]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        
        $user = \App\Models\User::where('email', $request->email)->first();
        
        if(!$user) {
            return response()->json([
                'success' => false
            ], 200);    
        }

        if ($user && Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => true,
                'name' => $user->name,
                'id' => $user->id,
                'is_admin' => $user->is_admin
            ], 200);
        }

        return response()->json([
            'success' => false
        ], 200);
    }
}
