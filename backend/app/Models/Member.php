<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;

class Member extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
      
    protected $fillable = [
        'name',
        'email',
        'no_hp',
        'alamat',
        'uid',
    ];

    public function logs()
{
    return $this->hasMany(Log::class, 'user_id');
}

public function logActivity($status)
{
    $this->logs()->create([
        'status' => $status
    ]);
}
}
