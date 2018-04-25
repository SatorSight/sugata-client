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

trait BundleRoutes{

    /**
     * @desc all bundles
     * @return \Illuminate\Http\JsonResponse
     */
    public function bundleGetAllBundles(){
        $bundles = Cache::remember('bundles', $this->expiration, function(){
            return Bundle::orderBy('order', 'ASC')->get();
        });

        return response()->json($bundles);
    }

    /**
     * @desc bundle data
     * @param $bundle_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function bundleGetBundle($bundle_id){
        $bundle = Cache::remember('bundle_' . $bundle_id, $this->expiration, function() use($bundle_id) {
            return Bundle::find($bundle_id);
        });
        return response()->json($bundle);
    }

    /**
     * @desc one last issue for each journal within bundle
     * @param $bundle_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function bundleGetLastIssues($bundle_id){
        $last_issues = Cache::remember('last_issues_' . $bundle_id, $this->expiration, function() use($bundle_id) {
            $bundle = Bundle::find($bundle_id);
            $last_issues = Issue::getLastFromEachJournal(4, $bundle);

            Issue::injectWithImages($last_issues);
            ImageProxyService::resize($last_issues, 'image_path', ImageProxyService::ISSUE_STANDARD_500);

            return $last_issues;
        });

        return response()->json($last_issues);
    }

    /**
     * @desc last cover articles from journal selected above
     * @param $journal_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function bundleGetLastCoverArticles($bundle_id){
        $last_cover_articles = Cache::remember('bundle_last_cover_articles_' . $bundle_id, $this->expiration, function() use($bundle_id) {
            $bundle = Bundle::find($bundle_id);
            $last_issues = Issue::getLastFromEachJournal(4, $bundle);

            $last_cover_articles = $last_issues->map(function($issue){
                /** @var Issue $issue */
                return $issue->getCoverArticle();
            })
                ->reject(function($article){ return empty($article); })
            ;

            Article::injectWithImages($last_cover_articles);
            Article::injectDates($last_cover_articles);
            Article::clearFromHtml($last_cover_articles);
            Article::injectJournalNames($last_cover_articles);

            ImageProxyService::resize($last_cover_articles, 'image_path', ImageProxyService::COVER_ARTICLE_800);

            return $last_cover_articles;
        });

        return response()->json(array_values($last_cover_articles->toArray()));
    }

    /**
     * @desc first valid articles from last issue of each journal within bundle
     * @param $bundle_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function bundleGetNewArticles($bundle_id){
        $articles = Cache::remember('bundle_new_articles_' . $bundle_id, $this->expiration, function() use ($bundle_id) {
            $bundle = Bundle::find($bundle_id);
            $last_issues = Issue::getLastFromEachJournal(null, $bundle);
            /** @var Collection $articles */
            $articles = Issue::getFirstBasicArticles($last_issues)->take(5);

            if ($articles->count() < 5) {
                $more_articles = Issue::getNotFirstBasicArticles($last_issues)->take(5 - $articles->count());
                $articles = $articles->concat($more_articles);
            }

            if ($articles->count() < 5) {
                $more_articles = Issue::getRandomBasicArticles($last_issues)->take(5 - $articles->count());
                $articles = $articles->concat($more_articles);
            }

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

    /**
     * @desc not first valid articles from last issue of each journal within bundle
     * @param $bundle_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function bundleGetPopularArticles($bundle_id){
        $articles = Cache::remember('bundle_popular_articles_' . $bundle_id, $this->expiration, function() use ($bundle_id) {
            $bundle = Bundle::find($bundle_id);
            $last_issues = Issue::getLastFromEachJournal(null, $bundle);
            /** @var Collection $articles */
            $articles = Issue::getRandomBasicArticles($last_issues)->take(5);

            $safe_counter = 0;
            while($articles->count() < 5){
                if(++$safe_counter > 10)
                    break;

                $more_articles = Issue::getRandomBasicArticles($last_issues)->take(5 - $articles->count());
                foreach ($more_articles as $article)
                    if(!$articles->contains(function($a) use ($article){
                        return $a->id === $article->id;
                    }))
                        $articles->push($article);
            }

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

    /**
     * @desc more new articles
     * @param $bundle_id
     * @param $from
     * @return \Illuminate\Http\JsonResponse
     */
    public function bundleGetMoreMoreNewArticles($bundle_id, $from){
        $articles = Cache::remember('bundle_more_new_articles_' . $bundle_id . '_' . $from, $this->expiration, function() use ($bundle_id, $from) {
            $bundle = Bundle::find($bundle_id);
            $last_issues = Issue::getLastFromEachJournal(null, $bundle);
            /** @var Collection $articles */
            $articles = Issue::getFirstBasicArticles($last_issues)
                ->slice($from)
                ->take(5);

            $safe_counter = 0;
            while($articles->count() < 5){
                if(++$safe_counter > 10)
                    break;

                $more_articles = Issue::getRandomBasicArticles($last_issues)->take(5 - $articles->count());
                $articles = $articles->concat($more_articles);
            }

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

    /**
     * @desc more popular articles
     * @param $bundle_id
     * @param $from
     * @return \Illuminate\Http\JsonResponse
     */
    public function bundleGetMorePopularArticles($bundle_id, $from){
        $articles = Cache::remember('bundle_more_popular_articles_' . $bundle_id . '_' . $from, $this->expiration, function() use ($bundle_id, $from) {
            $bundle = Bundle::find($bundle_id);
            $last_issues = Issue::getLastFromEachJournal(null, $bundle);
            /** @var Collection $articles */
            $articles = Issue::getRandomBasicArticles($last_issues)
                ->slice($from)
                ->take(5);

            $safe_counter = 0;
            while($articles->count() < 5){
                if(++$safe_counter > 10)
                    break;

                $more_articles = Issue::getRandomBasicArticles($last_issues)->take(5 - $articles->count());
                $articles = $articles->concat($more_articles);
            }

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

    /**
     * @desc all random journals
     * @return \Illuminate\Http\JsonResponse
     */
    public function bundleGetPopularEditions($bundle_id){
        $journals = Cache::remember('bundle_journals' . $bundle_id, $this->expiration, function() use ($bundle_id) {
            $journals = Journal::where('bundle_id', $bundle_id)
                ->where(function($query){
                    $query->where('archived', false)
                        ->orWhereNull('archived');
                })
                ->get()
                ->shuffle();

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