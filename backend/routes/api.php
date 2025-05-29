<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\LogController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::post('/admin/register', [AuthController::class, 'register']);
Route::post('/admin/login', [AuthController::class, 'login']);
Route::post('/login', [MemberController::class, 'login']);
Route::post('/register', [MemberController::class, 'register']);

Route::middleware(['auth:sanctum', 'admin'])->prefix('/admin')->group(function () {
    Route::get('/logs', [LogController::class, 'index']);
    Route::get('/members', [MemberController::class, 'index']);
    Route::get('/log/{id}', [MemberController::class, 'show']);
    Route::delete('member/{id}', [MemberController::class, 'destroy']);
    Route::get('member/{id}', [MemberController::class, 'show']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [MemberController::class, 'logout']);
    Route::get('/me', [MemberController::class, 'me']);
    Route::put('member/{id}', [MemberController::class, 'update']);
    Route::get('/log', [LogController::class, 'me']);
});

Route::get('/', function (Request $request) {
    return response()->json([
            "status" => "false", 
            "message" => "Anda belum login",
    ],401);
})->name('login');