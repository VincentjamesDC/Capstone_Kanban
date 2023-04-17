<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\UserController;
use App\Http\Controllers\api\CuttingController;
use App\Http\Controllers\api\AssemblyPrep;
use App\Http\Controllers\api\AssemblyOneController;
use App\Http\Controllers\api\AssemblyTwoController;
use App\Http\Controllers\api\QualityControlController;
use App\Http\Controllers\api\FinishingOneController;
use App\Http\Controllers\api\FinishingTwoController;
use App\Http\Controllers\api\ReviewController;

use App\Http\Controllers\api\OrderController;




/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => ['auth:sanctum']], function() {
    Route::apiResource('usergroup', UserController::class);
});

Route::group(['prefix' => 'enrod'], function() {
    Route::apiResource('order', OrderController::class);
});

Route::group(['prefix' => 'enrod'], function() {
    Route::apiResource('cutting', CuttingController::class);
});

Route::group(['prefix' => 'enrod'], function() {
    Route::apiResource('prep', AssemblyPrep::class);
});

Route::group(['prefix' => 'enrod'], function() {
    Route::apiResource('assembly_one', AssemblyOneController::class);
});

Route::group(['prefix' => 'enrod'], function() {
    Route::apiResource('assembly_two', AssemblyTwoController::class);
});

Route::group(['prefix' => 'enrod'], function() {
    Route::apiResource('quality_control', QualityControlController::class);
});

Route::group(['prefix' => 'enrod'], function() {
    Route::apiResource('finishing_one', FinishingOneController::class);
});

Route::group(['prefix' => 'enrod'], function() {
    Route::apiResource('finishing_two', FinishingTwoController::class);
});

Route::group(['prefix' => 'enrod'], function() {
    Route::apiResource('status', ReviewController::class);
});