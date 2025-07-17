<?php

namespace App\Http\Controllers;

use App\Models\Log;
use App\Models\Member;
use Illuminate\Http\Request;

class LogController extends Controller
{
    public function index()
    {
        $logs = Log::all();

        return response()->json([
            'status' => true,
            'message' => 'Berhasil mengambil semua data log.',
            'data' => $logs
        ]);
    }

    public function me(Request $request)
    {
        $uid = $request->uid;

        $member = Member::where('uid', $uid)->first();

        if (!$member) {
            return response()->json([
                'status' => false,
                'message' => 'Member tidak ditemukan.',
                'data' => null
            ], 404);
        }

        $logs = Log::where('user_id', $member->id)->get();

        return response()->json([
            'status' => true,
            'message' => 'Berhasil mengambil semua data log.',
            'data' => $logs
        ]);
    }

    public function show(string $id)
    {
        $logs = Log::where('user_id', $id)->get();

        if ($logs->isEmpty()) {
            return response()->json([
                'status' => false,
                'message' => 'Log tidak ditemukan untuk user tersebut.',
                'data' => null
            ], 404);
        }

        return response()->json([
            'status' => true,
            'message' => 'Berhasil mengambil semua data log.',
            'data' => $logs
        ]);
    }
}
