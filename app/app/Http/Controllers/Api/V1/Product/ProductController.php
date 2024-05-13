<?php

namespace App\Http\Controllers\Api\V1\Product;

use App\Http\Controllers\Controller;
use App\Http\Resources\Product\ProductItemResource;
use App\Http\Resources\Product\ProductListCollection;
use App\Models\Product;
use App\Http\Requests\Product\ProductRequest;

class ProductController extends Controller
{
    private $repo;

    public function __construct(\App\Repositories\Product\ProductRepository $repo)
    {
        $this->repo = $repo;
    }

    public function index()
    {
        $products = $this->repo->getAll();

        return new ProductListCollection($products);
    }

    public function store(Product $product, ProductRequest $request)
    {
        $this->repo->save($product, $request->all(), $request->file('img'));

        return new ProductItemResource($product);
    }

    public function show(Product $product)
    {
        return new ProductItemResource($product);
    }

    public function update(Product $product, ProductRequest $request)
    {
        $this->repo->save($product, $request->all(), $request->file('img'));

        return new ProductItemResource($product);
    }

    public function destroy(Product $product)
    {
        $this->repo->delete($product);
    }
}
