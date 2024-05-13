<?php

namespace App\Services\Order;

use App\Models\Order;
use Illuminate\Support\Facades\Storage;

Class OrderFile
{
    public static function generatePayDoc(Order $order)
    {
        $price = 10;
        $fileName = $order->id.'.txt';
        $path = 'public/orders/'.$fileName;
        $arr[] = 'Чек';
        $arr[] = 'Дата сделки: '.$order->created_at->format('d.m.Y H:i');
        $arr[] = '';

        $order->products->each(function($item) use(&$arr, &$price){
            $itemPrice = $item->soldprice*$item->amount;
            $price += $itemPrice;
            $arr[] = $item->product->name. ' ' . ' (кол-во '. $item->amount . ')' . $item->soldprice .'руб. ' . '('.$itemPrice.'руб.)';
        });
        $arr[] = '';
        $arr[] = 'Итого: '.$price;

        $text = implode(PHP_EOL, $arr);

        Storage::put($path, $text);

        $order->paydoc()->create([
            'file' => $fileName,
        ]);

        return asset('storage/orders/'.$fileName);
    }
}
