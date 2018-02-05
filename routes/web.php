<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


//Route::get('products', function () {
//    return response(['Product 1', 'Product 2', 'Product 3'],200);
//});
//
//Route::get('products/{product}', function ($productId) {
//    return response()->json(['productId' => "{$productId}"], 200);
//});
//
//
//Route::post('products', function() {
//    return  response()->json([
//        'message' => 'Create success'
//    ], 201);
//});
//
//Route::put('products/{product}', function() {
//    return  response()->json([
//        'message' => 'Update success'
//    ], 200);
//});
//
//Route::delete('products/{product}',function() {
//    return  response()->json(null, 204);
//});