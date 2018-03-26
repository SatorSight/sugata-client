<?php

namespace App\Http\Traits\ApiTraits;

use App\Article;
use App\Bundle;
use App\Http\Controllers\Helper;
use App\Issue;
use App\Journal;
use App\Lib\SUtils;
use Illuminate\Database\Eloquent\Collection;

trait JournalRoutes{
    /**
     * @desc all bundles
     * @return \Illuminate\Http\JsonResponse
     */
    public function journalGetBundles(){
        return response()->json(Bundle::all());
    }

    /**
     * @desc current bundle info
     * @param $bundle_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function journalGetCurrentBundle($journal_id){
        $bundle = Journal::find($journal_id)->bundle;
        return response()->json($bundle);
    }

    /**
     * @desc last 4 issues to upper swiper part
     * @param $journal_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function journalGetLastIssues($journal_id){
        $last_issues = Journal::find($journal_id)->issues->sortByDesc('id')->take(4);

        Issue::injectWithImages($last_issues);

        return response()->json(array_values($last_issues->toArray()));
    }

    /**
     * @desc get cover articles for given journal
     * @param $journal_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function journalGetIssuesCoverArticles($journal_id){
        $last_issues = Journal::find($journal_id)->issues->sortByDesc('id')->take(4);
        $cover_articles = $last_issues->map(function($issue){
            return $issue->getCoverArticle();
        });

        Article::injectWithText($cover_articles);
        Article::removeWithBlankText($cover_articles);
        Article::clearFromHtml($cover_articles);
        Article::injectDates($cover_articles);
        Article::injectJournalNames($cover_articles);
        Article::injectWithImages($cover_articles);

        return response()->json(array_values($cover_articles->toArray()));
    }

    /**
     * @desc 5 non-cover, non-chosen articles for last issue of journal for first articles block
     * @param $journal_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function journalGetBasicArticlesForLastIssue($journal_id){
        /** @var Journal $journal */
        /** @var Issue $last_issue */
        /** @var Collection $basic_articles */
        $journal = Journal::find($journal_id);
        $last_issue = $journal->getLastIssue();
        $basic_articles = $last_issue->getBasicArticles(5);

        Article::injectWithText($basic_articles);
        Article::removeWithBlankText($basic_articles);
        Article::clearFromHtml($basic_articles);
        Article::injectDates($basic_articles);
        Article::injectJournalNames($basic_articles);
        Article::injectWithImages($basic_articles);

        return response()->json($basic_articles);
    }

    /**>
     * @desc random articles for second articles block
     * @param $journal_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function journalGetRandomArticlesFromNonLastIssue($journal_id){
        $non_last_issues = Journal::find($journal_id)->issues
            ->sortByDesc('id')
            ->slice(1)
            ->take(5)
        ;

        $articles = $non_last_issues->map(function($issue){
            /** @var Issue $issue */
            return $issue->getNotFirstRandomBasicArticle();
        });

        Article::injectWithText($articles);
        Article::removeWithBlankText($articles);
        Article::clearFromHtml($articles);
        Article::injectDates($articles);
        Article::injectJournalNames($articles);
        Article::injectWithImages($articles);

        return response()->json(array_values($articles->toArray()));
    }

    public function journalGetMoreMoreNewArticles($journal_id, $from){
        /** @var Issue $last_issue */
        $last_issue = Journal::find($journal_id)->getLastIssue();
        /** @var Collection $basic_articles */
        $basic_articles = $last_issue->getBasicArticles(5, $from);

        Article::injectWithText($basic_articles);
        Article::removeWithBlankText($basic_articles);
        Article::clearFromHtml($basic_articles);
        Article::injectDates($basic_articles);
        Article::injectJournalNames($basic_articles);
        Article::injectWithImages($basic_articles);

        return response()->json(array_values($basic_articles->toArray()));
    }

    public function journalGetMorePopularArticles($journal_id, $from){
        $non_last_issues = Journal::find($journal_id)->issues
            ->sortByDesc('id')
            ->slice(1)
            ->slice($from)
            ->take(5)
        ;

        $articles = $non_last_issues->map(function($issue){
            /** @var Issue $issue */
            return $issue->getNotFirstRandomBasicArticle();
        });

        Article::injectWithText($articles);
        Article::removeWithBlankText($articles);
        Article::clearFromHtml($articles);
        Article::injectDates($articles);
        Article::injectJournalNames($articles);
        Article::injectWithImages($articles);

        return response()->json(array_values($articles->toArray()));
    }

    /**
     * @desc journal info
     * @param $journal_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function journalGetJournal($journal_id){
        $journal = Journal::find($journal_id);

        $journal_collection = new Collection();
        $journal_collection->push($journal);

        Journal::injectWithImages($journal_collection);
        Journal::injectWithAdditionalImages($journal_collection);
        Journal::injectWithLogo($journal_collection);
        Journal::injectWithIssuesCount($journal_collection);

        $journal = $journal_collection->first();

        return response()->json($journal);
    }

    /**
     * @desc rest of journal issues
     * @param $journal_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function journalGetRestIssues($journal_id){
        $issues = Journal::find($journal_id)
            ->issues
            ->sortByDesc('number')
            ->slice(1)
//            ->reject(function($issue) use ($journal_id){ return $issue->journal_id == $journal_id; })
        ;

        Issue::injectWithImages($issues);

        return response()->json(array_values($issues->toArray()));
    }

    /**
     * @desc same bundle journals
     * @param $journal_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function journalGetSameBundleJournals($journal_id){
        $bundle = Journal::find($journal_id)->bundle;
        $journals = $bundle
            ->journals
            ->reject(function($journal) use ($journal_id){
                return $journal->id == $journal_id;
            })
            ->shuffle();
        ;

        Journal::injectWithLogo($journals);
        Journal::injectWithAdditionalImages($journals);
        Journal::injectWithImages($journals);
        Journal::injectWithBundle($journals);
        Helper::removeFieldFromCollection($journals, 'description');

        return response()->json($journals);
    }
}