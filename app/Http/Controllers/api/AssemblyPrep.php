<?php

namespace App\Http\Controllers\api;

use App\Models\Orders;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AssemblyPrep extends Controller
{
    public function update(Request $request, $id){
        $order = Orders::find($id);

        $order->assembly_prep = $request->assembly_prep;
        $order->date_preped = $request->date_preped;
        $order->update();
        return response()->json([
            'status' => 200,
            'message' => 'Assembly Prep Updated'
        ]
        );
    }
}
