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

trait ArticleRoutes{

    /**
     * @desc all bundles
     * @return \Illuminate\Http\JsonResponse
     */
    public function articleGetAllBundles(){
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
    public function articleGetCurrentBundle($article_id){
        $bundle = Cache::remember('article_current_bundle_' . $article_id, $this->expiration, function() use($article_id) {
            return Article::find($article_id)->issue->journal->bundle;
        });

        return response()->json($bundle);
    }

    /**
     * @desc current issue listing
     * @param $article_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function articleGetListing($article_id){
        $listing = Cache::remember('article_listing_' . $article_id, $this->expiration, function() use($article_id) {
            $issue = Article::find($article_id)->issue;

            $listing = Article::where('issue_id', $issue->id)
                ->whereNotNull('title')
                ->where('title', '!=', '')
                ->get()
                ->map(function($article){
                    /** @var Article $article */
                    if(!empty($article->title)){
                        $l = new \stdClass();
                        $l->id = $article->id;
                        $l->page_number = $article->page_number;
                        $l->title = $article->title;

                        $article_collection = new Collection();
                        $article_collection->push($article);

                        Article::injectWithImages($article_collection);
                        ImageProxyService::resize($article_collection, 'image_path', ImageProxyService::LISTING_ARTICLE_200);

                        $l->image = $article->image_path;

                        return $l;
                    }
                    return null;
                })
            ;

            $listing = array_values($listing->toArray());
            usort($listing, function($a, $b){
                return $a->page_number - $b->page_number;
            });

            return $listing;
        });

        return response()->json($listing);
    }

    /**
     * @desc journal data
     * @param $journal_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function articleGetJournal($article_id){
        $journal = Cache::remember('article_journal_' . $article_id, $this->expiration, function() use($article_id) {
            return Article::find($article_id)->issue->journal;
        });

        return response()->json($journal);
    }

    /**
     * @desc get article issue
     * @param $article_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function articleGetIssue($article_id){
        $issue = Cache::remember('article_issue_' . $article_id, $this->expiration, function() use($article_id) {
            $article = Article::find($article_id);
            $issue = $article->issue;

            //todo rewrite this
            $issue_collection = new Collection();
            $issue_collection->push($issue);
            Issue::injectWithImages($issue_collection);
            Issue::injectWithPagesCount($issue_collection);

            $issue = $issue_collection->first();

            return $issue;
        });

        return response()->json($issue);
    }

    /**
     * @desc article data
     * @param $article_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function articleGetArticle($article_id){
        $article = Cache::remember('article_article_' . $article_id, $this->expiration, function() use($article_id) {
            $article = Article::find($article_id);

            $article_collection = new Collection();
            $article_collection->push($article);

            Article::clearDefaultStyles($article_collection);
            Article::injectOtherArticlesIdList($article_collection);
            Article::injectNextArticle($article_collection);
            Article::injectNextAndPrevIssue($article_collection);

            $article = $article_collection->first();

            return $article;
        });

        return response()->json($article);
    }

    /**
     * @desc next article in issue
     * @param $article_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function articleGetNextArticle($article_id){
        $next_article = Cache::remember('article_next_article_' . $article_id, $this->expiration, function() use($article_id) {
            $article = Article::find($article_id);
            $page_number = $article->page_number;
            $next_article = Article::where('issue_id', $article->issue_id)->where('page_number', $page_number + 1)->get();

            Article::injectWithImages($next_article);

            return $next_article;
        });

        return response()->json($next_article->first());
    }

}