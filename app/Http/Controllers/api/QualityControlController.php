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

        if($request->action == "Do") {
            $order->quality_control = $request->quality_control;
            $order->quality_control_start = $request->quality_control_start;
        }

        if($request->action == "Done") {
            $order->quality_control = $request->quality_control;
            $order->quality_control_finish = $request->quality_control_finish;
        }

        if($request->action == "Undo") {
            $order->quality_control = $request->quality_control;
            $order->quality_control_start = $request->quality_control_start;
        }

        if($request->action == "Undone") {
            $order->quality_control = $request->quality_control;
            $order->quality_control_finish = $request->quality_control_finish;
        }

        $order->save();
        return response()->json([
            'status' => 200,
            'message' => 'Quality Control Updated'
        ]
        );
    }
}
