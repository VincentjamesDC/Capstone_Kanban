<?php

namespace App\Http\Controllers\api;

use App\Models\Orders;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class QualityControlController extends Controller
{
    public function update(Request $request, $id){
        $order = Orders::find($id);

        $order->quality_control = $request->quality_control;
        $order->date_checked = $request->date_checked;
        $order->update();
        return response()->json([
            'status' => 200,
            'message' => 'Quality Control Updated'
        ]
        );
    }
}
