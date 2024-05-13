<?php

namespace App\Repositories\Order;

use App\Models\Order;
use App\Models\User;

Class OrderRepository
{
    public function saveClientOrder(Order $order, array $data, \App\Services\CartService\Cart $cart)
    {
        if($cart->isEmpty())
            throw new \Exception('Карзина пуста, делать заказ безсмыслено');

        try {
            \DB::transaction(function() use ($cart, $data, $order){

                $user = User::where('email', $data['email'])->first();

                if(!$user)
                    $user = User::create([
                        'name' => $data['name'],
                        'email' => $data['email'],
                    ]);

                $order->fill([
                    'user_id' => $user->id,
                    'delivery_id' => $data['delivery_id'],
                ])->save();

                foreach($cart->storage->get() as $itemCartProduct)
                    $order->products()->create([
                        'product_id' => $itemCartProduct['id'],
                        'amount' => $itemCartProduct['count'],
                        'soldprice' => $itemCartProduct['price'],
                    ]);

            });
        } catch (\Exception $exception) {
            return 'База данных отвалилась';
        }
    }
}
