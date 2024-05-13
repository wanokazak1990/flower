<?php

namespace App\Http\Controllers\Api\V1\Category;

use App\Http\Controllers\Controller;
use App\Http\Resources\Category\CategoryCollection;
use App\Http\Resources\Category\CategoryItemResource;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    private $repo;

    public function __construct(\App\Repositories\Product\CategoryRepository $repo)
    {
        $this->repo = $repo;
    }

    public function index()
    {
        return new CategoryCollection($this->repo->getAll());
    }

    public function show(Category $category)
    {
        return new CategoryItemResource($category);
    }

    public function store(Category $category, Request $request)
    {
        $this->repo->save($category, $request->all());

        return new CategoryItemResource($category);
    }

    public function update(Category $category, Request $request)
    {
        $this->repo->save($category, $request->all());

        return new CategoryItemResource($category);
    }

    public function destroy(Category $category)
    {
        $this->repo->delete($category);
    }
}
