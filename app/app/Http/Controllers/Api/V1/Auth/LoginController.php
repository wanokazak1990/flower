<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Hash;

class LoginController extends Controller
{
    public function __invoke(Request $request)
    {
        $email = $request->email;
        $pass = $request->password;

        \Auth::attempt([
            'email' => $email,
            'password' => $pass
        ]);

        return response()->json([
            'data' => auth()->user(),
            'success' => 1,
        ]);
    }
}
