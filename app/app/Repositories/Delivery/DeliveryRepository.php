<?php

namespace App\Repositories\Delivery;

use App\Models\Delivery;

Class DeliveryRepository
{
    public function getAll()
    {
        $deliveries = Delivery::get();

        return $deliveries;
    }

    public function save(Delivery $delivery, array $data)
    {
        $delivery->fill([
            'name' => $data['name']
        ])->save();
    }

    public function delete(Delivery $delivery)
    {
        $delivery->delete();
    }
}
