<?php

namespace App\Http\Controllers\Api\V1\Delivery;

use App\Http\Controllers\Controller;
use App\Http\Resources\Delivery\DeliveryCollection;
use App\Http\Resources\Delivery\DeliveryItemResource;
use App\Models\Delivery;
use App\Repositories\Delivery\DeliveryRepository;
use Illuminate\Http\Request;

class DeliveryController extends Controller
{
    private $repo;

    public function __construct(DeliveryRepository $repo)
    {
        $this->repo = $repo;
    }

    public function index()
    {
        return new DeliveryCollection($this->repo->getAll());
    }

    public function show(Delivery $delivery)
    {
        return new DeliveryItemResource($delivery);
    }

    public function store(Delivery $delivery, Request $request)
    {
        $this->repo->save($delivery, $request->name);

        return new DeliveryItemResource($delivery);
    }

    public function update(Delivery $delivery, Request $request)
    {
        $this->repo->save($delivery, $request->name);

        return new DeliveryItemResource($delivery);
    }

    public function destroy(Delivery $delivery)
    {
        $this->repo->delete($delivery);
    }
}
