<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\MemberController;

// Default route jika belum login
Route::get('/', function () {
    return response()->json([
        "status" => false, 
        "message" => "Anda belum login"
    ], 401);
})->name('login');


// ==================== ADMIN ROUTES ====================

// Admin Auth (register & login pakai Sanctum)
Route::post('/admin/register', [AuthController::class, 'register']);
Route::post('/admin/login', [AuthController::class, 'login']);

// Admin Protected Routes
Route::middleware(['auth:sanctum'])->prefix('/admin')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::put('/{id}', [AuthController::class, 'update']);
    Route::get('/me', [AuthController::class, 'show']);
    Route::get('/members', [MemberController::class, 'index']);
    Route::get('/member/{id}', [MemberController::class, 'show']);
    Route::delete('/member/{id}', [MemberController::class, 'destroy']);
    Route::put('/member/{id}', [MemberController::class, 'update']);
    Route::get('/logs', [LogController::class, 'index']);
    Route::get('/log/{id}', [LogController::class, 'show']);
    Route::post('/scan', [MemberController::class, 'scan']);
});


// ==================== MEMBER ROUTES (No Sanctum) ====================

// Member Auth (UID-based only)
Route::post('/register', [MemberController::class, 'register']);
Route::post('/login', [MemberController::class, 'login']);
Route::post('/logout', [MemberController::class, 'logout']);
Route::post('/me', [MemberController::class, 'me']);
Route::put('/member/{id}', [MemberController::class, 'update']);
Route::post('/log', [LogController::class, 'me']);
