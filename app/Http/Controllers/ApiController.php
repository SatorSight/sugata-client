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
        $articles = Article::getLatestNonEmpty(10, 'title');
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
        //todo implement
        $articles = Article::getChosen();
        Article::clearFromHtml($articles);
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
        return response()->json($articles);
    }

    public function getMorePopularArticles($from){
        //todo implement
        return $this->getNewArticles();
    }

    public function getJournals(){
        $journals = Journal::all();
        Helper::removeFieldFromCollection($journals, 'description');
        return response()->json($journals);
    }
}