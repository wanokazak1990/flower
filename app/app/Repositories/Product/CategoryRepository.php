<?php

namespace App\Repositories\Product;

use App\Models\Category;

Class CategoryRepository
{
    public function getAll()
    {
        return Category::get();
    }

    public function save(Category $category, array $data)
    {
        $category->fill([
            'name' => $data['name'] ?? $category->name,
            'sort' => $data['sort'] ?? $category->sort,
        ])->save();
    }

    public function delete(Category $category)
    {
        $category->delete();
    }
}
