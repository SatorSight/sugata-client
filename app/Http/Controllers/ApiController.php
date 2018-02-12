<?php

namespace App\Http\Controllers;

use App\Article;
use App\Bundle;
use App\Issue;
use App\Journal;

class ApiController extends Controller
{
    public function getBundles(){
        return response()->json(Bundle::all());
    }

    public function getNewIssues(){
        return response()->json(Issue::getLatest(10));
    }

    public function getNewArticles(){
        return response()->json(Article::getLatest(10));
    }

    public function getPopularArticles(){
        //todo implement
        return $this->getNewArticles();
    }

    public function getChosenArticles(){
        //todo implement
        return response()->json(Article::getChosen());
    }

    public function getMoreNewArticles($from){
        return response()->json(Article::getLatestAfter(10, $from));
    }

    public function getMorePopularArticles($from){
        //todo implement
        return $this->getNewArticles();
    }

    public function getJournals(){
        return response()->json(Journal::all());
    }
}