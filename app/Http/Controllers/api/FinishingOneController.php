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

        $order->finishing_one = $request->finishing_one;
        $order->date_finished_one = $request->date_finished_one;
        $order->update();
        return response()->json([
            'status' => 200,
            'message' => 'Finishing One Updated'
        ]
        );
    }
}
