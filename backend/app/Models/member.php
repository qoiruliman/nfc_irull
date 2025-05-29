<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class member extends Model
{
     use HasApiTokens, HasFactory, Notifiable;
      protected $fillable = [
        'name',
        'email',
        'no_hp',
        'alamat',
        'uid',
    ];

        protected $hidden = [
        'uid',
    ];
}
