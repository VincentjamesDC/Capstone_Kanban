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
        $users = User::withTrashed()->get();
        return new UserCollection($users);
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

    // public function update(Request $request, User $user){
    //     $user->update($request->validated());
    //     return response()->json("Account Updated");
    // }

    public function update(Request $request, $id){
        $user = User::find($id);

        $user->name = $request->name;
        $user->email = $request->email;
        $user->department = $request->department;
        $user->role = $request->role;
        $user->update();
        return response()->json([
            'status' => 200,
            'message' => 'User Soft Deleted'
        ]
        );
    }

    public function restore(Request $request, $id)
    {
        $user = User::withTrashed()->findOrFail($id);
        $user->restore();
        return response()->json([
            'status' => 200,
            'message' => 'User Restored Successfully'
        ]);
    }

    public function delete(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->delete(); // soft delete the user
        return response()->json([
            'status' => 200,
            'message' => 'User Soft Deleted'
        ]
        );
    }

    public function destroy(Request $request, $id)
    {
        $user = User::withTrashed()->findOrFail($id);
        $user->forceDelete(); // permanently delete the user
        return response()->json([
            'status' => 200,
            'message' => 'User Permanently Deleted'
        ]
        );
    }
}
