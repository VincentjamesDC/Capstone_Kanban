<?php

namespace App\Http\Controllers\api;

use Auth;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Illuminate\Http\Response;
use App\Http\Resources\UserCollection;
use App\Http\Resources\UserResource;

use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Support\Str;

class UserController extends Controller
{
    public function index(){
        return new UserCollection(User::all());
    }

    public function store(Request $request){
        $fields = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'department' => ['required', 'string', 'max:255'],
            'role' => ['required', 'string', 'max:255'],

        ]);

        $user = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => bcrypt($fields['password']),
            'remember_token' => Str::random(60),
            'department' => $fields['department'],
            'role' => $fields['role']
        ]);

        $user->markEmailAsVerified();

        $response = [
            'user' => $user,
        ];

        return response()->json("New Admin Created");
    }
}
