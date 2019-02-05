<?php

namespace App\Http\Traits\ApiTraits;

use App\Article;
use App\ArticlesTag;
use App\Bundle;
use App\Http\Controllers\Helper;
use App\Issue;
use App\Journal;
use App\Lib\ImageProxyService;
use App\Lib\SUtils;
use App\Tag;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Cache;

trait TagSearchRoutes{
    /**
     * @desc all bundles
     * @return \Illuminate\Http\JsonResponse
     */
    public function tagSearchGetBundles(){
        $bundles = Cache::remember('bundles', $this->bundle_expiration, function(){
            $bundles = Bundle::orderBy('order', 'ASC')->get();
            Bundle::injectJournalNames($bundles);
            Bundle::injectIssuesCovers($bundles);
            Bundle::injectWithImages($bundles);
            return $bundles;
        });

        return response()->json($bundles);
    }

    public function tagSearchGetTags(){
//        $tag = Cache::remember('tag_' . $tag_id, $this->tag_expiration, function() use($tag_id) {
        $tags = Tag::all();
//            return $tag;
//        });

        return response()->json($tags);
    }

    /**
     * @desc tag articles
     * @param $tag_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function tagSearchGetJournals(){
//        $articles = Cache::remember('tag_articles_' . $tag_id, $this->tag_expiration, function() use($tag_id) {


        $journals = Journal::where(function($query){
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

//        $articles = Article::whereIn('id', $ids)->orderByDesc('created_at')->get();

//        Article::removeWithBlankText($articles);
//        Article::clearFromHtml($articles);
//        Article::injectDates($articles);
//        Article::injectJournalImages($articles);
//        Article::injectJournalNames($articles);
//        Article::injectWithImages($articles);
//        Article::injectIssueContentDate($articles);
//
//        ImageProxyService::resize($articles, 'image_path', ImageProxyService::ARTICLE_PREVIEW_150);

//            return $articles;
//        });

        return response()->json(array_values($journals->toArray()));
    }

}