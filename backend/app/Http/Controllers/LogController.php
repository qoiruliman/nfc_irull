<?php

namespace App\Http\Controllers;

use App\Models\log;
use Illuminate\Http\Request;

use function Illuminate\Log\log;

class LogController extends Controller
{
    public function index()
    {
        $logs = log::all();

        return response()->json([
            'status' => true,
            'message' => 'berhasil mengambil data riwayat.',
            'data' => $logs
        ]);
    }

    public function show(Request $request)
    {
        $data = $request->user();
        $log = log::where('user_id',$data->id);

        if (!$log) {
            return response()->json([
                'status' => false,
                'message' => 'tidak ada riwayat.',
                'data' => null
            ], 404);
        }

        return response()->json([
            'status' => true,
            'message' => 'berhasil mengambil data riwayat.',
            'data' => $log
        ]);
    }

     public function me(Request $request)
    {
        $data = log::where('user_id',$request->user()->id)->get();

        if (!$data) {
            return response()->json([
                'status' => false,
                'message' => 'Member not found.',
                'data' => null
            ], 404);
        }

        return response()->json([
            'status' => true,
            'message' => 'Berhasil mengambil data riwayat.',
            'data' => $data
        ]);
    }
}
