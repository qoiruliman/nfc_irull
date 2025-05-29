<?php

namespace App\Http\Controllers;

use App\Models\log;
use App\Models\member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class memberController extends Controller
{
    public function index()
    {
        $members = member::all();

        return response()->json([
            'status' => true,
            'message' => 'Berhasil mengambil semua data member.',
            'data' => $members
        ]);
    }

    public function login(Request $request)
    {
        $member = member::where('uid', $request->uid)->first();

        if (!$member) {
            return response()->json([
                "status" => "error",
                "message" => "Kartu belum terdaftar.",
                "errors" => null
            ]);
        }

        $token = $member->createToken('token-name', ['member'])->plainTextToken;


        log::create([
            'user_id' => $member->id,
            'activity' => 'login',
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Member valid.',
            'data' => $member,
            'token' => $token
        ],200);
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|email|unique:members,email',
            'no_hp' => 'required|string',
            'alamat' => 'required|string',
            'uid' => 'required|string|unique:members,uid',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'errors',
                'message' => 'Invalid field(s) in request',
                'errors' => $validator->errors()
            ], 422);
        }

        $member = member::create([
            'uid' => $request->uid,
            'name' => $request->name,
            'email' => $request->email,
            'no_hp' => $request->no_hp,
            'alamat' => $request->alamat,
        ]);

        $token = $member->createToken('token-name', ['member'])->plainTextToken;

        return response()->json([
            'status' => true,
            'message' => 'Berhasil mendaftar.',
            'data' => $member,
            'token' => $token
        ], 201);
    }

    public function show(string $id)
    {
        $member = member::find($id);

        if (!$member) {
            return response()->json([
                'status' => false,
                'message' => 'Member not found.',
                'data' => null
            ], 404);
        }

        return response()->json([
            'status' => true,
            'message' => 'Berhasil mengambil data member.',
            'data' => $member
        ]);
    }

    public function me(Request $request)
    {
        $data = $request->user();

        if (!$data) {
            return response()->json([
                'status' => false,
                'message' => 'Member not found.',
                'data' => null
            ], 404);
        }

        return response()->json([
            'status' => true,
            'message' => 'Berhasil mengambil data member.',
            'data' => $data
        ],200);
    }

    public function update(Request $request, string $id)
    {
        $member = member::find($id);

        if (!$member) {
            return response()->json([
                'status' => false,
                'message' => 'Member not found.',
                'data' => null
            ], 404);
        }

        $validated = Validator::make($request->all(), [
            'name' => 'sometimes|string',
            'email' => 'sometimes|email|unique:members,email,' . $id,
            'no_hp' => 'sometimes|string',
            'alamat' => 'sometimes|string',
            'uid' => 'sometimes|string|unique:members,uid,' . $id,
        ]);

        if ($validated->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error.',
                'errors' => $validated->errors()
            ], 422);
        }

        $member->update($validated->validated());

        return response()->json([
            'status' => true,
            'message' => 'Berhasil mengubah data member.',
            'data' => $member
        ]);
    }

    public function destroy(string $id)
    {
        $member = member::find($id);

        if (!$member) {
            return response()->json([
                'status' => false,
                'message' => 'Member not found.',
                'data' => null
            ], 404);
        }

        $member->delete();

        return response()->json([
            'status' => true,
            'message' => 'Berhasil menghapus data member.',
            'data' => null
        ]);
    }

    public function logout(Request $request)
    {
        $user = $request->user();

            $user->currentAccessToken()->delete();

            log::create([
                'user_id' => $user->id,
                'activity' => 'logout',
            ]);

        return response()->json([
            "status" => "success",
            "message" => "Logout sukses",
        ], 200);
    }
}
