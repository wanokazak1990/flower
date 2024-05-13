<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderProduct extends Model
{
    use HasFactory;

    protected $guarded = [];

    public $timestamps = false;

    public function order()
    {
        return $this->hasOne(\App\Models\Order::class, 'id', 'order_id');
    }

    public function product()
    {
        return $this->hasOne(\App\Models\Product::class, 'id', 'product_id');
    }
}
