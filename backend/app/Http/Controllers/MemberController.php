<?php

namespace App\Http\Controllers;

use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class MemberController extends Controller
{
       /**
     * Store a newly created resource in storage.
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'email' => 'required|email|unique:Members,email',
            'uid' => 'required|unique:Members,uid',
            'no_hp' => 'required',
            'alamat' => 'required',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => false,
                'message' => 'Invalid field(s) in request',
                'errors' => $validator->errors()
            ],422);
        }

        $member = Member::create([
            'uid' => $request->uid,
            'name' => $request->name,
            'email' => $request->email,
            'no_hp' => $request->no_hp,
            'alamat' => $request->alamat,
        ]);

        $member->logActivity('register');

        return response()->json([
            "status" => true, 
            "message" => "Berhasil mendaftar", 
            "data" => $member
        ],200);
    }


    public function login(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'uid' => 'required',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => false,
                'message' => 'Invalid field(s) in request',
                'errors' => $validator->errors()
            ],422);
        }

        $member = Member::where('uid', $request->uid)->first();

        if(!$member){
            return response()->json([
                "status" => false, 
                "message" => "uid tidak ada", 
                "errors" => null 
            ],422);
        }

        $member->logActivity('login');

        return response()->json([
            "status" => true, 
            "message" => "Berhasil login", 
            "data" => $member
        ],200);
    }

    public function scan(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'uid' => 'required',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => false,
                'message' => 'Invalid field(s) in request',
                'errors' => $validator->errors()
            ],422);
        }

        $member = Member::where('uid', $request->uid)->first();

        if(!$member){
            return response()->json([
                "status" => false, 
                "message" => "uid tidak ada", 
                "errors" => null 
            ],404);
        }

        return response()->json([
            "status" => true, 
            "message" => "Berhasil login", 
            "data" => $member
        ],200);
    }

    /**
     * Display the specified resource.
     */
    public function me(Request $request)
    {
        
        $uid = $request->uid;

        $member = Member::where('uid', $uid)->first();

        if (!$member) {
            return response()->json([
                'status' => false,
                'message' => 'Member not found.',
                'data' => null
            ], 404);
        }

        return response()->json([
            'status' => true,
            'message' => 'Berhasil mengambil data Member',
            'data' => $member
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'email' => 'required|email|unique:members,email,' . $id,
            'uid' => 'required|unique:members,uid,' . $id,
            'no_hp' => 'required',
            'alamat' => 'required',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => false,
                'message' => 'Invalid field(s) in request',
                'errors' => $validator->errors()
            ],422);
        }

        $member = Member::find($id);

        if (!$member) {
            return response()->json([
                'status' => false,
                'message' => 'Member not found'
            ], 404);
        }

        if ($member->uid != $request->uid){
            return response()->json([
                'status' => false,
                'message' => 'Anda tidak login'
            ], 401);
        }

        $member->update([
            'uid' => $member->uid,
            'name' => $request->name,
            'email' => $request->email,
            'no_hp' => $request->no_hp,
            'alamat' => $request->alamat,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Berhasil mengupdate Member',
            'data' => $member
        ]);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function logout(Request $request)
    {
        $uid = $request->uid;

        $member = Member::where('uid', $uid)->first();

        if (!$member) {
            return response()->json([
                "status" => false,
                "message" => "Member tidak ditemukan",
            ], 401);
        }

        $member->logActivity('logout');

        return response()->json([
            "status" => true,
            "message" => "Berhasil logout",
        ], 200);
    }


    public function destroy(string $id)
    {
        $member = Member::find($id);

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

    public function show(String $id)
    {
         $member = Member::find($id);

            if (!$member) {
                return response()->json([
                    'status' => false,
                    'message' => 'Member not found.',
                    'data' => null
                ], 404);
            }

            return response()->json([
                'status' => true,
                'message' => 'Berhasil mengambil data Member',
                'data' => $member
            ]);
    }

    public function index()
    {
         $member = Member::all();

            if (!$member) {
                return response()->json([
                    'status' => false,
                    'message' => 'Member not found.',
                    'data' => null
                ], 404);
            }

            return response()->json([
                'status' => true,
                'message' => 'Berhasil mengambil data Member',
                'data' => $member
            ]);
    }

}
