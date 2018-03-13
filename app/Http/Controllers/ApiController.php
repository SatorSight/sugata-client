<?php

namespace App\Http\Controllers;

use App\Article;
use App\Bundle;
use App\Issue;
use App\Journal;
use App\Lib\AuthService;
use App\Lib\SUtils;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class ApiController extends Controller
{
    public function getBundles(){
        return response()->json(Bundle::all());
    }

    public function getNewIssues(){
        return response()->json(Issue::getLatest(20));
    }

    public function getNewArticles(){

        //todo $collection->forget

        $articles = Article::getLatestNonEmpty(30, 'title');

        // $articles = collect($articles->slice(10,20)->all());
        // $counter = 0;

        $a = collect([]);
        $counter = 0;
        foreach ($articles as $key => $ar) {
            $counter++;
            if($counter > 10 && $counter < 21){
                $a->push($ar);
            }

            # code...
        }
        $articles = $a;
        // $articles = $articles->shuffle();

        Article::injectWithText($articles);
        Article::removeWithBlankText($articles);

        Article::clearFromHtml($articles);
        Article::injectDates($articles);
        Article::injectJournalNames($articles);
        Article::injectWithImages($articles);
        return response()->json($articles);
    }

    public function getPopularArticles(){
        //todo implement
        return $this->getNewArticles();
    }

    public function getChosenArticles(){
        $articles = Article::getChosen();
        Article::clearFromHtml($articles);
        Article::injectWithImages($articles);
        Article::injectDates($articles);
        Article::injectJournalNames($articles);
        Article::injectJournalCovers($articles);
        return response()->json($articles);
    }

    public function getMoreNewArticles($from){
        $articles = Article::getLatestNonEmptyAfter(10, $from, 'title');
        Article::clearFromHtml($articles);
        Article::injectDates($articles);
        Article::injectJournalNames($articles);
        Article::injectWithText($articles);

        return response()->json($articles);
    }

    public function getMorePopularArticles($from){
        //todo implement
        return $this->getNewArticles();
    }

    public function getJournals(){
        $journals = Journal::orderBy('order', 'DESC')->get();
        Journal::injectWithLogo($journals);
        Journal::injectWithAdditionalImages($journals);
        Journal::injectWithImages($journals);
        Journal::injectWithBundle($journals);
        Helper::removeFieldFromCollection($journals, 'description');
        return response()->json($journals);
    }

    public function checkMsisdn($data){
        $decoded = json_decode($data);
        $msisdn = $decoded->data;
        $msisdn = SUtils::normalizeTel($msisdn);

        //todo get actual bundle
        $bundle = Bundle::first();

        $as = new AuthService($bundle);
        $as->loadSubscriptionInfoByMsisdn($msisdn);

        if($as->userSubscribed()){
            if($as->userExists()){
                $as->writeUserSessionAndCookies();
                return response()->json(['result' => 'ok']);
            }else{
                $as->createUser();
                $as->writeUserSessionAndCookies();
                return response()->json(['result' => 'ok']);
            }
        }else{
            $operator = $as->getOperatorTech();
            $as->setOperator($operator);
            $actions = $as->askMasterForActions();

            if(!empty($actions)){
                if(isset($actions->action_type) && $actions->action_type == 'redirect'){
                    return response()->json([
                        'result' => $actions->action_type,
                        'to' => $actions->link,
                        'message' => 'redirect_required'
                    ]);
                }
            }

            //todo ip checkup and redirect
            return response()->json(['result' => 'fail', 'message' => 'not_subscribed']);
        }
    }

    public function userAuthorized(){

        $res = AuthService::userAuthorized() ? 'ok' : 'fail';
        return response()->json(['result' => $res]);
    }
}