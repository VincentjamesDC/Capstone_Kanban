<?php

namespace App\Http\Controllers\api;

use App\Models\Orders;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class FinishingTwoController extends Controller
{
    public function update(Request $request, $id){
        $order = Orders::find($id);

        // $order->finishing_two = $request->finishing_two;
        // $order->finishing_two_start = $request->finishing_two_start;
        // $order->finishing_two_finish = $request->finishing_two_finish;
        // $order->date_finished = $request->date_finished;
        // $order->update();

        if($request->action == "Do") {
            $order->finishing_two = $request->finishing_two;
            $order->finishing_two_start = $request->finishing_two_start;
        }

        if($request->action == "Done") {
            $order->finishing_two = $request->finishing_two;
            $order->finishing_two_finish = $request->finishing_two_finish;
            $order->date_finished = $request->date_finished;
        }

        if($request->action == "Undo") {
            $order->finishing_two = $request->finishing_two;
            $order->finishing_two_start = $request->finishing_two_start;
        }

        if($request->action == "Undone") {
            $order->finishing_two = $request->finishing_two;
            $order->finishing_two_finish = $request->finishing_two_finish;
            $order->date_finished = $request->date_finished;
        }

        $order->save();

        return response()->json([
            'status' => 200,
            'message' => 'Finishing Two Updated'
        ]
        );
    }
}
