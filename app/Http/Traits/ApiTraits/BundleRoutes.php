<?php

namespace App\Http\Traits\ApiTraits;

use App\Article;
use App\Bundle;
use App\Http\Controllers\Helper;
use App\Issue;
use App\Journal;
use Illuminate\Database\Eloquent\Collection;

trait BundleRoutes{

    /**
     * @desc all bundles
     * @return \Illuminate\Http\JsonResponse
     */
    public function bundleGetAllBundles(){
        return response()->json(Bundle::all());
    }

    /**
     * @desc bundle data
     * @param $bundle_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function bundleGetBundle($bundle_id){
        return response()->json(Bundle::find($bundle_id));
    }

    /**
     * @desc one last issue for each journal within bundle
     * @param $bundle_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function bundleGetLastIssues($bundle_id){
        $bundle = Bundle::find($bundle_id);
        $last_issues = Issue::getLastFromEachJournal(4, $bundle);

        Issue::injectWithImages($last_issues);

        return response()->json($last_issues);
    }

    /**
     * @desc last cover articles from journal selected above
     * @param $journal_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function bundleGetLastCoverArticles($bundle_id){
        $bundle = Bundle::find($bundle_id);
        $last_issues = Issue::getLastFromEachJournal(4, $bundle);

//        $last_issues->dd();

        $last_cover_articles = $last_issues->map(function($issue){
            /** @var Issue $issue */
            return $issue->getCoverArticle();
        })
            ->reject(function($article){ return empty($article); })
        ;

//        $last_cover_articles->dd();


        Article::injectWithImages($last_cover_articles);
        Article::injectDates($last_cover_articles);
        Article::clearFromHtml($last_cover_articles);

        return response()->json(array_values($last_cover_articles->toArray()));
    }

    /**
     * @desc first valid articles from last issue of each journal within bundle
     * @param $bundle_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function bundleGetNewArticles($bundle_id){
        $bundle = Bundle::find($bundle_id);
        $last_issues = Issue::getLastFromEachJournal(null, $bundle);
        /** @var Collection $articles */
        $articles = Issue::getFirstBasicArticles($last_issues)->take(5);

//        $ids = $articles->map(function($article){ return $article->id; });
//        $articles->take(5);

        Article::injectWithText($articles);
        Article::removeWithBlankText($articles);
        Article::clearFromHtml($articles);
        Article::injectDates($articles);
        Article::injectJournalNames($articles);
        Article::injectWithImages($articles);
//
//        $response = new \stdClass();
//        $response->ids = $ids;
//        $response->articles = $articles;

        return response()->json(array_values($articles->toArray()));
    }

    /**
     * @desc not first valid articles from last issue of each journal within bundle
     * @param $bundle_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function bundleGetPopularArticles($bundle_id){
        $bundle = Bundle::find($bundle_id);
        $last_issues = Issue::getLastFromEachJournal(null, $bundle);
        /** @var Collection $articles */
        $articles = Issue::getNotFirstBasicArticles($last_issues)->take(5);

//        $ids = $articles->map(function($article){ return $article->id; });
//        $articles->take(5);

        Article::injectWithText($articles);
        Article::removeWithBlankText($articles);
        Article::clearFromHtml($articles);
        Article::injectDates($articles);
        Article::injectJournalNames($articles);
        Article::injectWithImages($articles);

//        $response = new \stdClass();
//        $response->ids = $ids;
//        $response->articles = $articles;

        return response()->json(array_values($articles->toArray()));

    }

    /**
     * @desc more new articles
     * @param $bundle_id
     * @param $from
     * @return \Illuminate\Http\JsonResponse
     */
    public function bundleGetMoreMoreNewArticles($bundle_id, $from){
        $bundle = Bundle::find($bundle_id);
        $last_issues = Issue::getLastFromEachJournal(null, $bundle);
        /** @var Collection $articles */
        $articles = Issue::getFirstBasicArticles($last_issues)
            ->slice($from)
            ->take(5);;

//        $ids = $articles->map(function($article){ return $article->id; });
//        $articles
//            ->slice($from)
//            ->take(5);

        Article::injectWithText($articles);
        Article::removeWithBlankText($articles);
        Article::clearFromHtml($articles);
        Article::injectDates($articles);
        Article::injectJournalNames($articles);
        Article::injectWithImages($articles);
//
//        $response = new \stdClass();
//        $response->ids = $ids;
//        $response->articles = $articles;

        return response()->json(array_values($articles->toArray()));

    }

    /**
     * @desc more popular articles
     * @param $bundle_id
     * @param $from
     * @return \Illuminate\Http\JsonResponse
     */
    public function bundleGetMorePopularArticles($bundle_id, $from){
        $bundle = Bundle::find($bundle_id);
        $last_issues = Issue::getLastFromEachJournal(null, $bundle);
        /** @var Collection $articles */
        $articles = Issue::getNotFirstBasicArticles($last_issues)
            ->slice($from)
            ->take(5);;

//        $ids = $articles->map(function($article){ return $article->id; });
//        $articles
//            ->slice($from)
//            ->take(5);

        Article::injectWithText($articles);
        Article::removeWithBlankText($articles);
        Article::clearFromHtml($articles);
        Article::injectDates($articles);
        Article::injectJournalNames($articles);
        Article::injectWithImages($articles);
//
//        $response = new \stdClass();
//        $response->ids = $ids;
//        $response->articles = $articles;

        return response()->json(array_values($articles->toArray()));

    }

    /**
     * @desc all random journals
     * @return \Illuminate\Http\JsonResponse
     */
    public function bundleGetPopularEditions($bundle_id){
        $journals = Journal::where('bundle_id', $bundle_id)
            ->where(function($query){
                $query->where('archived', false)
                    ->orWhereNull('archived');
            })
            ->get()->shuffle();

        Journal::injectWithLogo($journals);
        Journal::injectWithAdditionalImages($journals);
        Journal::injectWithImages($journals);
        Journal::injectWithBundle($journals);
        Helper::removeFieldFromCollection($journals, 'description');

        return response()->json($journals);
    }
}