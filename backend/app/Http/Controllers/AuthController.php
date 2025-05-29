<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request){

        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
            'foto' => 'mimes:jpeg,jpg,png',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => 'erorrs',
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

        $token = $user->createToken('token-name', ['admin'])->plainTextToken;

        return response()->json([
            "status" => "success", 
            "message" => "User registered successfully", 
            "data" => $user,
            "token" => $token
        ],200);
    }
    public function login(Request $request){

        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'password' => 'required|min:8'
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => 'erorrs',
                'message' => 'Invalid field(s) in request',
                'errors' => $validator->errors()
            ],422);
        }

        $user = User::where('name', $request->name)->first();

        if(!$user ||!Hash::check($request->password,$user->password)){
            return response()->json([
                "status" => "error", 
                "message" => "Invalid name or password", 
                "errors" => null 
            ],422);
        }


        $token = $user->createToken('token-name', ['admin'])->plainTextToken;

        return response()->json([
            "status" => "success", 
            "message" => "Login successful", 
            "data" => $user,
            "token" => $token
        ],200);
    }
}
