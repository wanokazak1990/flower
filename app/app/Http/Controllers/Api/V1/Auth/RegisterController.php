<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Hash;

class RegisterController extends Controller
{
    public function __invoke(Request $request)
    {
        $email = $request->email;
        $name = $request->name;
        $pass = $request->password;

        $tmpUser = User::where('email', $email)->first();

        if($tmpUser && $tmpUser->password)
            throw new \Exception('Такой пользователь уже зарегестрирован');

        if(!$tmpUser)
            $user = User::create([
                'email' => $email,
                'name' => $name,
                'password' => Hash::make($pass),
            ]);
        elseif(!$tmpUser->password)
        {
            $user = $tmpUser;
            $user->fill([
                'name' => $name,
                'password' => Hash::make($pass),
            ])->save();
        }

        \Auth::attempt([
            'email' => $email,
            'password' => $pass
        ]);


        return response()->json([
            'data' => auth()->user(),
            'success' => 1
        ]);
    }
}
