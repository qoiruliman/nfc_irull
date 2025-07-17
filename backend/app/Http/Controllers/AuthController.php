<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
            'foto' => 'mimes:jpeg,jpg,png',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => false,
                'message' => 'Invalid field(s) in request',
                'errors' => $validator->errors()
            ],422);
        }


        if ($request->hasFile('foto')) {
            $path = $request->file('foto')->store('profil', 'public');
        }else{
            $path = 'profil.jpg';
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'path' => $path,
        ]);

        $token = $user->createToken('token-name')->plainTextToken;

        return response()->json([
            "status" => true, 
            "message" => "Berhasil mendaftar", 
            "data" => $user,
            "token" => $token
        ],200);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'password' => 'required|min:8',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => false,
                'message' => 'Invalid field(s) in request',
                'errors' => $validator->errors()
            ],422);
        }

        $user = User::where('name', $request->name)->first();

        if(!$user ||!Hash::check($request->password,$user->password)){
            return response()->json([
                "status" => false, 
                "message" => "name atau password salah", 
                "errors" => null 
            ],422);
        }


        $token = $user->createToken('token-name', ['admin'])->plainTextToken;

        return response()->json([
            "status" => true, 
            "message" => "Berhasil login", 
            "data" => $user,
            "token" => $token
        ],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $User = $request->user();

            if (!$User) {
                return response()->json([
                    'status' => false,
                    'message' => 'Member not found.',
                    'data' => null
                ], 404);
            }

            return response()->json([
                'status' => true,
                'message' => 'Berhasil mengambil data user',
                'data' => $User
            ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'nullable|min:8',
            'foto' => 'nullable|mimes:jpeg,jpg,png',
        ]);


        if($validator->fails()){
            return response()->json([
                'status' => false,
                'message' => 'Invalid field(s) in request',
                'errors' => $validator->errors()
            ],422);
        }

            $user = User::find($id);

    if (!$user) {
        return response()->json([
            'status' => false,
            'message' => 'User not found'
        ], 404);
    }

    if ($request->hasFile('foto')) {
        $path = $request->file('foto')->store('profil', 'public');
    } else {
        $path = $user->path;
    }

    $user->update([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'path' => $path,
    ]);

    return response()->json([
        'status' => true,
        'message' => 'Berhasil mengupdate user',
        'data' => $user
    ]);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function logout(Request $request)
    {
        $user = $request->User();
        if($user->currentAccessToken()){
            $user->currentAccessToken()->delete();
        }

        return response()->json([
            "status" => true,
            "message" => "Berhasil logout",
        ], 200);
    }
}
