<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Orders; // Replace with your actual table model

class ResetController extends Controller
{
    public function clear()
    {
        Orders::truncate();
        return response()->json(['message' => 'Table cleared successfully']);
    }
}
