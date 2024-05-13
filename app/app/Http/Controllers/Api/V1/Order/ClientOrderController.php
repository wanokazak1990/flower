<?php

namespace App\Http\Controllers\Api\V1\Order;

use App\Http\Controllers\Controller;
use App\Http\Requests\Client\OrderRequest;
use App\Models\User;
use App\Models\Order;
use App\Models\OrderProduct;

class ClientOrderController extends Controller
{
    private $repo;

    public function __construct(\App\Repositories\Order\OrderRepository $repo)
    {
        $this->repo = $repo;
    }

    public function __invoke(Order $order, OrderRequest $request, \App\Services\CartService\Cart $cart)
    {

        $this->repo->saveClientOrder($order, $request->all(), $cart);

        $file = \App\Services\Order\OrderFile::generatePayDoc($order);

        $cart->storage->erase();

        return response()->json([
            'data' => [
                'file' => $file,
            ],
            'success' => 1
        ]);

    }
}
