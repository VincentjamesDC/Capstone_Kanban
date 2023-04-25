<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Orders;
use App\Http\Requests\OrderRequest;
use App\Http\Resources\OrderResource;
use App\Http\Resources\OrderCollection;

class OrderController extends Controller
{
    public function index(){
        return new OrderCollection(Orders::all());
    }

    public function show(Orders $order){
        return new OrderResource($order);
    }

    public function store(OrderRequest $request){
        Orders::create($request->validated());
        return response()->json("Product Order Created");
    }

    public function update(OrderRequest $request, Orders $order){
        $order->update($request->validated());
        return response()->json("Product Order Updated");
    }

    public function destroy(Orders $order){
        $order->delete();
        return response()->json("Product Order Deleted");
    }
}
