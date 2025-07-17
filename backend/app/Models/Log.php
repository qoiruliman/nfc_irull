<?php

namespace App\Models;
use App\Models\Member;

use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    protected $table = 'logs';

     protected $fillable = [
        'status',
        'user_id',
    ];

    public function member()
    {
        return $this->belongsTo(Member::class, 'user_id');
    }
}
