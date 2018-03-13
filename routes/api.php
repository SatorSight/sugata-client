<?php

use Illuminate\Http\Request;

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

Route::get('/bundles/', 'ApiController@getBundles');
Route::get('/new_issues/', 'ApiController@getNewIssues');
Route::get('/new_articles/', 'ApiController@getNewArticles');
Route::get('/popular_articles/', 'ApiController@getPopularArticles');
Route::get('/chosen_articles/', 'ApiController@getChosenArticles');
Route::get('/journals/', 'ApiController@getJournals');
Route::get('/more_new_articles/{from}', 'ApiController@getMoreNewArticles')->where(['id' => '[0-9]+']);
Route::get('/more_popular_articles/{from}', 'ApiController@getMorePopularArticles')->where(['id' => '[0-9]+']);
//
Route::get('/check_msisdn/{data}/', 'ApiController@checkMsisdn');
Route::get('/user_authorized/', 'ApiController@userAuthorized');
//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});
