<?php

namespace App\Http\Traits\ApiTraits;

use App\Article;
use App\Bundle;
use App\Http\Controllers\Helper;
use App\Issue;
use App\Journal;
use App\Lib\SUtils;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

trait IndexRoutes{
    /**
     * @desc all bundles
     * @return \Illuminate\Http\JsonResponse
     */
    public function indexGetBundles(){
        $bundles = Bundle::orderBy('order', 'ASC')->get();
        return response()->json($bundles);
    }

    /**
     * @desc one last issue for each journal
     * @return \Illuminate\Http\JsonResponse
     */
    public function indexGetNewIssues(){
        $journals = Journal::all();

        $last_issues = new Collection();
        $journals->map(function($journal) use (&$last_issues){
            /** @var Journal $journal */
            $last_issue = $journal->getLastIssue();
            $last_issue->image;
            $last_issues->push($last_issue);
        });

        Issue::injectWithImages($last_issues);

        return response()->json($last_issues);
    }

    /**
     * @desc 4 cover articles of last issues of different journals
     * @return \Illuminate\Http\JsonResponse
     */
    public function indexGetMainTopics(){
        /** @var Collection $cover_articles */
        $last_issues = Issue::getLastFromEachJournal();
        $cover_articles = Issue::getCoverArticles($last_issues);

        Article::clearFromHtml($cover_articles);
        Article::injectWithImages($cover_articles);
        Article::injectDates($cover_articles);
        Article::injectJournalNames($cover_articles);
        Article::injectJournalCovers($cover_articles);

        return response()->json($cover_articles);
    }

    /**
     * @desc first valid articles from last issue of each journal
     * @return \Illuminate\Http\JsonResponse
     */
    public function indexGetNewArticles(){
        $last_issues = Issue::getLastFromEachJournal(null);
        /** @var Collection $articles */
        $articles = Issue::getFirstBasicArticles($last_issues)->take(5);

        Article::injectWithText($articles);
        Article::removeWithBlankText($articles);
        Article::clearFromHtml($articles);
        Article::injectDates($articles);
        Article::injectJournalNames($articles);
        Article::injectWithImages($articles);

        return response()->json(array_values($articles->toArray()));
    }

    /**
     * @desc not first valid articles from last issue of each journal
     * @return \Illuminate\Http\JsonResponse
     */
    public function indexGetPopularArticles(){
        $last_issues = Issue::getLastFromEachJournal(null);
        /** @var Collection $articles */
        $articles = Issue::getRandomBasicArticles($last_issues)->take(5);;

        Article::injectWithText($articles);
        Article::removeWithBlankText($articles);
        Article::clearFromHtml($articles);
        Article::injectDates($articles);
        Article::injectJournalNames($articles);
        Article::injectWithImages($articles);

        return response()->json(array_values($articles->toArray()));
    }

    /**
     * @desc more new articles
     * @param $from
     * @return \Illuminate\Http\JsonResponse
     */
    public function indexGetMoreNewArticles($from){
        $last_issues = Issue::getLastFromEachJournal(null);
        /** @var Collection $articles */
        $articles = Issue::getRandomBasicArticles($last_issues)
            ->slice($from)
            ->take(5);

        Article::injectWithText($articles);
        Article::removeWithBlankText($articles);
        Article::clearFromHtml($articles);
        Article::injectDates($articles);
        Article::injectJournalNames($articles);
        Article::injectWithImages($articles);

        return response()->json(array_values($articles->toArray()));
    }

    /**
     * @desc more popular articles
     * @param $from
     * @return \Illuminate\Http\JsonResponse
     */
    public function indexGetMorePopularArticles($from){
        $last_issues = Issue::getLastFromEachJournal(null);
        /** @var Collection $articles */
        $articles = Issue::getNotFirstBasicArticles($last_issues)
            ->slice($from)
            ->take(5);

        Article::injectWithText($articles);
        Article::removeWithBlankText($articles);
        Article::clearFromHtml($articles);
        Article::injectDates($articles);
        Article::injectJournalNames($articles);
        Article::injectWithImages($articles);

        return response()->json(array_values($articles->toArray()));
    }

    /**
     * @desc all random journals
     * @return \Illuminate\Http\JsonResponse
     */
    public function indexGetPopularEditions(){
        $journals = Journal::where(function($query){
            $query->where('archived', false)
                ->orWhereNull('archived');
        })->get()->shuffle();

        Journal::injectWithLogo($journals);
        Journal::injectWithAdditionalImages($journals);
        Journal::injectWithImages($journals);
        Journal::injectWithBundle($journals);
        Helper::removeFieldFromCollection($journals, 'description');

        return response()->json($journals);
    }
}