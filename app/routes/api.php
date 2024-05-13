<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('admin')->middleware('check.admin')->group(function(){
    /**
     * [GET]    [api/admin/categories]                      GET ALL CATEGORIES
     * [GET]    [api/admin/categories/{int category_id}]    GET CATEGORY BY ID
     * [POST]   [api/admin/categories/]                     STORE CATEGORY [name = string, sort = ?int]
     * [PATCH]  [api/admin/categories/{int category_id}]    UPDATE CATEGORY BY ID [name = string, sort = ?int]
     * [DELETE] [api/admin/categories/{int category_id}]    DELETE CATEGORY
     */
    Route::resource('categories',  \App\Http\Controllers\Api\V1\Category\CategoryController::class)->except(['edit', 'create']);

    /**
     * [GET]    [api/admin/products]                     GET ALL PRODUCTS
     * [GET]    [api/admin/products/{int product_id}]    GET PRODUCT BY ID
     * [POST]   [api/admin/products/]                    STORE PRODUCT [name = string, sort = ?int]
     * [PATCH]  [api/admin/products/{int product_id}]    UPDATE PRODUCT BY ID [name = string, sort = ?int]
     * [DELETE] [api/admin/products/{int product_id}]    DELETE PRODUCT
     */
    Route::resource('products',  \App\Http\Controllers\Api\V1\Product\ProductController::class)->except(['edit', 'create']);

    /**
     * [GET]    [api/admin/deliveries]                      GET ALL DELIVERIES
     * [GET]    [api/admin/deliveries/{int delivery_id}]    GET DELIVERY BY ID
     * [POST]   [api/admin/deliveries/]                     STORE DELIVERY [name = string]
     * [PATCH]  [api/admin/deliveries/{int delivery_id}]    UPDATE DELIVERY BY ID [name = string]
     * [DELETE] [api/admin/deliveries/{int delivery_id}]    DELETE DELIVERY
     */
    Route::resource('deliveries',  \App\Http\Controllers\Api\V1\Delivery\DeliveryController::class)->except(['edit', 'create']);
});

Route::prefix('')->group(function(){
    Route::prefix('cart')->middleware('session.start')->group(function(){
        Route::get('', '\App\Http\Controllers\Api\V1\Cart\CartController@index');
        Route::put('/{productId}', '\App\Http\Controllers\Api\V1\Cart\CartController@append');
        Route::delete('/erase/{productId}', '\App\Http\Controllers\Api\V1\Cart\CartController@erase');
        Route::delete('/{productId}', '\App\Http\Controllers\Api\V1\Cart\CartController@reduce');
        Route::get('count', '\App\Http\Controllers\Api\V1\Cart\CartController@count');
    });

    Route::get('products', '\App\Http\Controllers\Api\V1\Front\ProductController@list');
    Route::get('deliveries', '\App\Http\Controllers\Api\V1\Delivery\DeliveryController@index');

    Route::post('orders', 'App\Http\Controllers\Api\V1\Order\ClientOrderController');
});

Route::prefix('auth')->group(function(){
    Route::post('register', '\App\Http\Controllers\Api\V1\Auth\RegisterController');
    Route::post('login', '\App\Http\Controllers\Api\V1\Auth\LoginController');
    Route::get('check', '\App\Http\Controllers\Api\V1\Auth\CheckLoginController');
    Route::get('logout', '\App\Http\Controllers\Api\V1\Auth\LogoutController');
});

