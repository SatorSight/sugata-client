<?php

namespace App\Http\Traits\ApiTraits;

use App\Article;
use App\Bundle;
use App\Http\Controllers\Helper;
use App\Issue;
use App\Journal;
use App\Lib\ImageProxyService;
use App\Lib\SUtils;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Cache;

trait JournalRoutes{
    /**
     * @desc all bundles
     * @return \Illuminate\Http\JsonResponse
     */
    public function journalGetBundles(){
        $bundles = Cache::remember('bundles', $this->expiration, function(){
            $bundles = Bundle::orderBy('order', 'ASC')->get();
            Bundle::injectJournalNames($bundles);
            return $bundles;
        });

        return response()->json($bundles);
    }

    /**
     * @desc current bundle info
     * @param $bundle_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function journalGetCurrentBundle($journal_id){
        $bundle = Cache::remember('journal_current_bundle_' . $journal_id, $this->expiration, function() use($journal_id) {
            return Journal::find($journal_id)->bundle;
        });

        return response()->json($bundle);
    }

    /**
     * @desc last 4 issues to upper swiper part
     * @param $journal_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function journalGetLastIssues($journal_id){
        $last_issues = Cache::remember('journal_last_issues_' . $journal_id, $this->expiration, function() use($journal_id) {
            $last_issues = Journal::find($journal_id)->issues->sortByDesc('id')->take(4);

            Issue::injectWithImages($last_issues);
            ImageProxyService::resize($last_issues, 'image_path', ImageProxyService::ISSUE_STANDARD_500);

            return $last_issues;
        });

        return response()->json(array_values($last_issues->toArray()));
    }

    /**
     * @desc get cover articles for given journal
     * @param $journal_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function journalGetIssuesCoverArticles($journal_id){
        $cover_articles = Cache::remember('journal_cover_articles_' . $journal_id, $this->expiration, function() use($journal_id) {
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

            ImageProxyService::resize($cover_articles, 'image_path', ImageProxyService::COVER_ARTICLE_800);

            return $cover_articles;
        });

        return response()->json(array_values($cover_articles->toArray()));
    }

    /**
     * @desc 5 non-cover, non-chosen articles for last issue of journal for first articles block
     * @param $journal_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function journalGetBasicArticlesForLastIssue($journal_id){
        $basic_articles = Cache::remember('journal_basic_articles_' . $journal_id, $this->expiration, function() use($journal_id) {
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
            Article::injectIssueContentDate($basic_articles);

            ImageProxyService::resize($basic_articles, 'image_path', ImageProxyService::ARTICLE_PREVIEW_150);

            return $basic_articles;
        });

        return response()->json($basic_articles);
    }

    /**>
     * @desc random articles for second articles block
     * @param $journal_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function journalGetRandomArticlesFromNonLastIssue($journal_id){
        $articles = Cache::remember('journal_random_articles_' . $journal_id, $this->expiration, function() use($journal_id) {
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
            Article::injectIssueContentDate($articles);

            ImageProxyService::resize($articles, 'image_path', ImageProxyService::ARTICLE_PREVIEW_150);

            return $articles;
        });

        return response()->json(array_values($articles->toArray()));
    }

    public function journalGetMoreMoreNewArticles($journal_id, $from){
        $basic_articles = Cache::remember('journal_more_new_articles_' . $journal_id . '_' . $from, $this->expiration, function() use($journal_id, $from) {
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
            Article::injectIssueContentDate($basic_articles);

            ImageProxyService::resize($basic_articles, 'image_path', ImageProxyService::ARTICLE_PREVIEW_150);

            return $basic_articles;
        });

        return response()->json(array_values($basic_articles->toArray()));
    }

    public function journalGetMorePopularArticles($journal_id, $from){
        $articles = Cache::remember('journal_more_popular_articles_' . $journal_id . '_' . $from, $this->expiration, function() use($journal_id, $from) {
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
            Article::injectIssueContentDate($articles);
            Article::injectWithImages($articles);

            ImageProxyService::resize($articles, 'image_path', ImageProxyService::ARTICLE_PREVIEW_150);

            return $articles;
        });


        return response()->json(array_values($articles->toArray()));
    }

    /**
     * @desc journal info
     * @param $journal_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function journalGetJournal($journal_id){
        $journal = Cache::remember('journal_journal_' . $journal_id, $this->expiration, function() use($journal_id) {
            $journal = Journal::find($journal_id);

            $journal_collection = new Collection();
            $journal_collection->push($journal);

            Journal::injectWithImages($journal_collection);
            Journal::injectWithAdditionalImages($journal_collection);
            Journal::injectWithLogo($journal_collection);
            Journal::injectWithIssuesCount($journal_collection);

            $journal = $journal_collection->first();

            return $journal;
        });

        return response()->json($journal);
    }

    /**
     * @desc rest of journal issues
     * @param $journal_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function journalGetRestIssues($journal_id){
        $issues = Cache::remember('journal_rest_issues_' . $journal_id, $this->expiration, function() use($journal_id) {
            $issues = Journal::find($journal_id)
                ->issues
                ->sortByDesc('id')
                ->slice(1)
//            ->reject(function($issue) use ($journal_id){ return $issue->journal_id == $journal_id; })
            ;

            Issue::injectWithImages($issues);
            ImageProxyService::resize($issues, 'image_path', ImageProxyService::ISSUE_STANDARD_500);

            return $issues;
        });

       return response()->json(array_values($issues->toArray()));
    }

    /**
     * @desc same bundle journals
     * @param $journal_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function journalGetSameBundleJournals($journal_id){
        $journals = Cache::remember('journal_same_bundle_journals_' . $journal_id, $this->expiration, function() use($journal_id) {
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

            return $journals;
        });

        return response()->json($journals);
    }
}