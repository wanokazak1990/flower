<?php

namespace App\Http\Controllers\Api\V1\Front;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    private $repo;

    public function __construct(\App\Repositories\Product\ProductRepository $repo)
    {
        $this->repo = $repo;
    }

    public function list()
    {
        $products = $this->repo->getGroupProduct();

        return response()->json([
            'data' => $products,
            'success' => 1,
        ]);
    }
}
