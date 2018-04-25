<?php

namespace App\Lib;

use App\Article;
use App\Bundle;
use App\Issue;
use App\Journal;
use Illuminate\Routing\Route;

class BundleProvider{

    private $route;

    public function __construct(Route $route){
        $this->route = $route;
    }

    //todo rewrite somehow
    public function getCurrentBundle() : ?Bundle {
        $bundle = null;

        $route_params = $this->route->parameters();

        if(empty($route_params))
            return null;

        $params = explode('/', $route_params['any']);

        if(count($params) < 2)
            return null;

        $entity = $params[0];
        $id = $params[1];

        if($entity == 'article'){
            $article = Article::find($id);
            $bundle = $article->issue->journal->bundle;
        }
        if($entity == 'issue'){
            $issue = Issue::find($id);
            $bundle = $issue->journal->bundle;
        }
        if($entity == 'journal'){
            $journal = Journal::find($id);
            $bundle = $journal->bundle;
        }
        if($entity == 'bundle'){
            $bundle = Bundle::find($id);
        }

        return $bundle;
    }

}