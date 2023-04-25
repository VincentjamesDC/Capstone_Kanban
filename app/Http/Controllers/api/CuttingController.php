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

        $order->cutting = $request->cutting;
        $order->date_cutted = $request->date_cutted;
        $order->update();
        return response()->json([
            'status' => 200,
            'message' => 'Cutting Updated'
        ]
        );
    }
}
