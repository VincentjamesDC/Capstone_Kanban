<?php

namespace App\Http\Controllers\api;

use App\Models\Orders;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AssemblyTwoController extends Controller
{
    public function update(Request $request, $id){
        $order = Orders::find($id);

        $order->assembly_two = $request->assembly_two;
        $order->date_assembled_two = $request->date_assembled_two;
        $order->update();
        return response()->json([
            'status' => 200,
            'message' => 'Assembly Two Updated'
        ]
        );
    }
}
