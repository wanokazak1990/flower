<?php

namespace App\Services\CartService;

Class Cart
{
    public $storage;

    public function __construct()
    {
        $this->storage = CartStorage::instance();
    }

    public function isEmpty()
    {
        if($this->storage->get())
            return false;
        return true;
    }
}
