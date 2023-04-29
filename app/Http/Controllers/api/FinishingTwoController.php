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

        $order->finishing_two = $request->finishing_two;
        $order->date_finished = $request->date_finished;
        $order->update();
        return response()->json([
            'status' => 200,
            'message' => 'Finishing Two Updated'
        ]
        );
    }
}
