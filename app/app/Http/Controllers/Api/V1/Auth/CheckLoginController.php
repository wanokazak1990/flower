<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CheckLoginController extends Controller
{
    public function __invoke()
    {
        $check = \Auth::check();

        return response()->json([
            'data' => auth()->user(),
            'success' => (int) $check,
        ]);
    }
}
