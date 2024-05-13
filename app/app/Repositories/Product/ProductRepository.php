<?php

namespace App\Repositories\Product;

use App\Http\Resources\Product\ProductListResource;
use \App\Models\Product;

Class ProductRepository
{
    public function getAll()
    {
        $products = Product::with('category')->get();

        return $products;
    }

    public function save(Product $product, array $data, $file)
    {
        if($file instanceof \Illuminate\Http\UploadedFile)
        {
            $fileName = time().'.'.$file->extension();
            $file->storeAs('public/images', $fileName);
            $data['img'] = $fileName;
        }

        $product->fill([
            'name'          => $data['name']        ?? $product->name,
            'price'         => $data['price']       ?? $product->price,
            'img'           => $data['img']         ?? $product->img,
            'category_id'   => $data['category_id']  ?? $product->category_id,
            'description'   => $data['description']     ?? $product->description,
        ])->save();
    }

    public function delete(Product $product)
    {
        $product->delete();
    }

    public function getGroupProduct()
    {
        $groups = $this->getAll()->groupBy(function($item, $key) {
            return $item->category->name;
        })->map(function($itemGroup) {
            return $itemGroup->map(function($itemProduct) {
                return new ProductListResource($itemProduct);
            });
        });

        return $groups;
    }
}
