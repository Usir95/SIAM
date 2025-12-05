<?php

use App\Http\Controllers\DemoController;
use App\Http\Controllers\Web\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect(route('login'));
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
});


Route::resource('/Demo', DemoController::class)->names('Demo');
Route::resource('/Example', DemoController::class)->names('Example');
