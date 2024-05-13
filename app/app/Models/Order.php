<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function products()
    {
        return $this->hasMany(\App\Models\OrderProduct::class, 'order_id', 'id');
    }

    public function paydoc()
    {
        return $this->hasOne(\App\Models\OrderDocument::class, 'order_id', 'id');
    }
}
