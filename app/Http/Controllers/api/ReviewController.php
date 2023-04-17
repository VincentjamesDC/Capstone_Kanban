<?php

namespace App\Http\Controllers\api;

use App\Models\Orders;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function update(Request $request, $id){
        $order = Orders::find($id);

        $order->status = $request->status;
        $order->update();
        return response()->json([
            'status' => 200,
            'message' => 'Status Updated'
        ]
        );
    }
}