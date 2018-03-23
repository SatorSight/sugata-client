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

Route::get('/index/bundles/', 'ApiController@indexGetBundles');
Route::get('/index/new_issues/', 'ApiController@indexGetNewIssues');
Route::get('/index/main_topics/', 'ApiController@indexGetMainTopics');
Route::get('/index/new_articles/', 'ApiController@indexGetNewArticles');
Route::get('/index/popular_articles/', 'ApiController@indexGetPopularArticles');
Route::get('/index/more_new_articles/{from}/', 'ApiController@indexGetMoreNewArticles')->where(['id' => '[0-9]+']);
Route::get('/index/more_popular_articles/{from}/', 'ApiController@indexGetMorePopularArticles')->where(['id' => '[0-9]+']);
Route::get('/index/popular_editions/', 'ApiController@indexGetPopularEditions');

Route::get('/bundle/bundles/', 'ApiController@bundleGetAllBundles');
Route::get('/bundle/bundle/{bundle_id}/', 'ApiController@bundleGetBundle');
Route::get('/bundle/last_issues/{bundle_id}/', 'ApiController@bundleGetLastIssues');
Route::get('/bundle/last_cover_articles/{bundle_id}/', 'ApiController@bundleGetLastCoverArticles');
Route::get('/bundle/new_articles/{bundle_id}/', 'ApiController@bundleGetNewArticles');
Route::get('/bundle/popular_articles/{bundle_id}/', 'ApiController@bundleGetPopularArticles');
Route::get('/bundle/more_new_articles/{bundle_id}/{from}/', 'ApiController@bundleGetMoreMoreNewArticles')->where(['id' => '[0-9]+']);
Route::get('/bundle/more_popular_articles/{bundle_id}/{from}/', 'ApiController@bundleGetMorePopularArticles')->where(['id' => '[0-9]+']);
Route::get('/bundle/popular_editions/{bundle_id}/', 'ApiController@bundleGetPopularEditions');

Route::get('/journal/bundles/', 'ApiController@journalGetBundles');
Route::get('/journal/bundle/{journal_id}/', 'ApiController@journalGetCurrentBundle');
Route::get('/journal/journal/{journal_id}/', 'ApiController@journalGetJournal');
Route::get('/journal/last_issues/{journal_id}/', 'ApiController@journalGetLastIssues');
Route::get('/journal/issues_cover_articles/{journal_id}/', 'ApiController@journalGetIssuesCoverArticles');
Route::get('/journal/new_articles/{journal_id}/', 'ApiController@journalGetBasicArticlesForLastIssue');
Route::get('/journal/popular_articles/{journal_id}/', 'ApiController@journalGetRandomArticlesFromNonLastIssue');

Route::get('/journal/more_new_articles/{journal_id}/{from}/', 'ApiController@journalGetMoreMoreNewArticles')->where(['id' => '[0-9]+']);
Route::get('/journal/more_popular_articles/{journal_id}/{from}/', 'ApiController@journalGetMorePopularArticles')->where(['id' => '[0-9]+']);

Route::get('/journal/rest_issues/{journal_id}/', 'ApiController@journalGetRestIssues');
Route::get('/journal/same_bundle_journals/{journal_id}/', 'ApiController@journalGetSameBundleJournals');

Route::get('/issue/bundles/', 'ApiController@issueGetBundles');
Route::get('/issue/bundle/{issue_id}/', 'ApiController@issueGetCurrentBundle');
Route::get('/issue/issue/{issue_id}/', 'ApiController@issueGetIssue');
Route::get('/issue/all_issues/{issue_id}/', 'ApiController@issueGetAllIssues');
Route::get('/issue/main_topics/{issue_id}/', 'ApiController@issueGetMainTopics');
Route::get('/issue/new_articles/{issue_id}/', 'ApiController@issueGetNewArticles');
Route::get('/issue/more_new_articles/{issue_id}/{from}/', 'ApiController@issueGetMoreNewArticles')->where(['id' => '[0-9]+']);
Route::get('/issue/other_issues/{issue_id}/', 'ApiController@issueGetOtherIssues');

Route::get('/auth/check_msisdn/{data}/', 'ApiController@checkMsisdn');
Route::get('/auth/user_authorized/', 'ApiController@userAuthorized');

//
//Route::get('/bundles/', 'ApiController@indexGetBundles');
//Route::get('/new_issues/', 'ApiController@indexGetNewIssues');
//Route::get('/main_topics/', 'ApiController@indexGetMainTopics');
//Route::get('/new_articles/', 'ApiController@indexGetNewArticles');
//Route::get('/popular_articles/', 'ApiController@indexGetPopularArticles');
//Route::get('/journals/', 'ApiController@indexGetPopularEditions');
//Route::get('/more_new_articles/{from}', 'ApiController@indexGetMoreNewArticles')->where(['id' => '[0-9]+']);
//Route::get('/more_popular_articles/{from}', 'ApiController@indexGetMorePopularArticles')->where(['id' => '[0-9]+']);


//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});
