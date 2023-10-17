<?php

namespace App\Http\Controllers\Api;
ini_set('memory_limit', '-1');

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;


class UtilitiesController extends Controller
{
    public function addComments(Request $request) {
        
        $request->validate([
            'message' => 'required|string',
            'user_id' => 'required'
        ]);
        
        \App\Models\Comment::create([
            'message' => $request->message,
            'link_user_id' => $request->user_id
        ]);

        return response()->json([
            'success' => true
        ], 200);
    }

    public function getComments() {
        return response()->json([
            'data' => \App\Models\Comment::all()
        ], 200);
    }

    public function updateComments($id, Request $request) {
        $request->validate([
            'message' => 'required|string'
        ]);

        \App\Models\Comment::find($id)->update(['message' => $request->message]);

        return response()->json([
            'success' => true
        ], 200);
    }

    public function deleteComments($id) {
        
        \App\Models\Comment::destroy($id);

        return response()->json([
            'success' => true
        ], 200);
    }
}
