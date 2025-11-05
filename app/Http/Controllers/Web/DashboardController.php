<?php

namespace App\Http\Controllers\Web;

use Illuminate\Routing\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller {

    public function __construct(){
        // $this->middleware('permission:dashboard')->only('index');
    }
    public function index(){
        return Inertia::render('Dashboard');
    }
}
