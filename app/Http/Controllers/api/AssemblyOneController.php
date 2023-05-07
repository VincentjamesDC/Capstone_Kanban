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

        if($request->action == "Do") {
            $order->assembly_one = $request->assembly_one;
            $order->assembly_one_start = $request->assembly_one_start;
        }

        if($request->action == "Done") {
            $order->assembly_one = $request->assembly_one;
            $order->assembly_one_finish = $request->assembly_one_finish;
        }

        if($request->action == "Undo") {
            $order->assembly_one = $request->assembly_one;
            $order->assembly_one_start = $request->assembly_one_start;
        }

        if($request->action == "Undone") {
            $order->assembly_one = $request->assembly_one;
            $order->assembly_one_finish = $request->assembly_one_finish;
        }

        $order->save();


        return response()->json([
            'status' => 200,
            'message' => 'Assembly One Updated'
        ]
        );
    }
}
