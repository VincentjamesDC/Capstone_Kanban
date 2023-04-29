<?php

namespace App\Http\Controllers\api;

use App\Models\Orders;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AssemblyOneController extends Controller
{
    public function update(Request $request, $id){
        $order = Orders::find($id);

        $order->assembly_one = $request->assembly_one;
        $order->date_assembled_one = $request->date_assembled_one;
        $order->update();
        return response()->json([
            'status' => 200,
            'message' => 'Assembly One Updated'
        ]
        );
    }
}
