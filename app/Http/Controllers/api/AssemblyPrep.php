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

        if($request->action == "Do") {
            $order->assembly_prep = $request->assembly_prep;
            $order->assembly_prep_start = $request->assembly_prep_start;
        }

        if($request->action == "Done") {
            $order->assembly_prep = $request->assembly_prep;
            $order->assembly_prep_finish = $request->assembly_prep_finish;
        }

        if($request->action == "Undo") {
            $order->assembly_prep = $request->assembly_prep;
            $order->assembly_prep_start = $request->assembly_prep_start;
        }

        if($request->action == "Undone") {
            $order->assembly_prep = $request->assembly_prep;
            $order->assembly_prep_finish = $request->assembly_prep_finish;
        }

        $order->save();



        return response()->json([
            'status' => 200,
            'message' => 'Assembly Prep Updated'
        ]
        );
    }
}
