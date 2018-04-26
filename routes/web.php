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

//its here because session not working in api middleware group propely

Route::get('/api/auth/check_msisdn/{data}', 'ApiController@checkMsisdn');
Route::get('/api/auth/user_authorized/', 'ApiController@userAuthorized');
Route::get('/api/auth/get_sub_link/{bundle_id}/', 'ApiController@getSubLink');
Route::get('/api/auth/load_auth_data/', 'ApiController@loadAuthData');

Route::get('/{any}', 'AppController@index')->where('any', '.*');