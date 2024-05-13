<?php

namespace App\Observers;

use App\Models\Category;

class CategoryObserver
{
    public function creating(Category $category)
    {
        $category->sort = $category->sort ?? Category::max('sort')+1;
    }
}
