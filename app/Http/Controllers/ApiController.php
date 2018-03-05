<?php

namespace App\Http\Controllers;

use App\Article;
use App\Bundle;
use App\Issue;
use App\Journal;
use App\Lib\SUtils;

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
        Helper::removeFieldFromCollection($journals, 'description');
        return response()->json($journals);
    }
}