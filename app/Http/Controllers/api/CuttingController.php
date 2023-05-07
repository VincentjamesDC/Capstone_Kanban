<?php

namespace App\Http\Controllers\api;

use App\Models\Orders;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CuttingController extends Controller
{
    public function update(Request $request, $id){
        $order = Orders::find($id);

        if($request->action == "Do") {
            $order->cutting = $request->cutting;
            $order->cutting_start = $request->cutting_start;
        }

        if($request->action == "Done") {
            $order->cutting = $request->cutting;
            $order->cutting_finish = $request->cutting_finish;
        }

        if($request->action == "Undo") {
            $order->cutting = $request->cutting;
            $order->cutting_start = $request->cutting_start;
        }

        if($request->action == "Undone") {
            $order->cutting = $request->cutting;
            $order->cutting_finish = $request->cutting_finish;

        }

        $order->save();

        return response()->json([
            'status' => 200,
            'message' => 'Cutting Updated'
        ]);
    }
}
