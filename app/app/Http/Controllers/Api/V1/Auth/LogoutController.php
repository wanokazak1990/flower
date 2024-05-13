<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LogoutController extends Controller
{
    public function __invoke()
    {
        \Auth::logout();

        return response()->json([
            'success' => 1
        ]);
    }
}
