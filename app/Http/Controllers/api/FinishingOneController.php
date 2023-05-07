<?php

namespace App\Http\Controllers\api;

use App\Models\Orders;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class FinishingOneController extends Controller
{
    public function update(Request $request, $id){
        $order = Orders::find($id);

        if($request->action == "Do") {
            $order->finishing_one = $request->finishing_one;
            $order->finishing_one_start = $request->finishing_one_start;
        }

        if($request->action == "Done") {
            $order->finishing_one = $request->finishing_one;
            $order->finishing_one_finish = $request->finishing_one_finish;
        }

        if($request->action == "Undo") {
            $order->finishing_one = $request->finishing_one;
            $order->finishing_one_start = $request->finishing_one_start;
        }

        if($request->action == "Undone") {
            $order->finishing_one = $request->finishing_one;
            $order->finishing_one_finish = $request->finishing_one_finish;
        }

        $order->save();

        return response()->json([
            'status' => 200,
            'message' => 'Finishing One Updated'
        ]
        );
    }
}
