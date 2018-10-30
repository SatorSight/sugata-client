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

trait TagRoutes{
    /**
     * @desc all bundles
     * @return \Illuminate\Http\JsonResponse
     */
    public function tagGetBundles(){
        $bundles = Cache::remember('bundles', $this->bundle_expiration, function(){
            $bundles = Bundle::orderBy('order', 'ASC')->get();
            Bundle::injectJournalNames($bundles);
            Bundle::injectIssuesCovers($bundles);
            Bundle::injectWithImages($bundles);
            return $bundles;
        });

        return response()->json($bundles);
    }

    public function tagGetTag($tag_id){
//        $tag = Cache::remember('tag_' . $tag_id, $this->tag_expiration, function() use($tag_id) {
            $tag = Tag::find($tag_id);

            $tag_collection = new Collection();
            $tag_collection->push($tag);

            Tag::injectWithImages($tag_collection);

//            return $tag;
//        });

        return response()->json($tag);
    }

    /**
     * @desc tag articles
     * @param $tag_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function tagGetArticles($tag_id){
//        $articles = Cache::remember('tag_articles_' . $tag_id, $this->tag_expiration, function() use($tag_id) {
            $articles_tag = ArticlesTag::where('tag_id', $tag_id)->get();
            $ids = $articles_tag->map(function($t){
                return $t->article_id;
            });

            $articles = Article::whereIn('id', $ids)->orderByDesc('created_at')->get();

            Article::removeWithBlankText($articles);
            Article::clearFromHtml($articles);
            Article::injectDates($articles);
            Article::injectJournalImages($articles);
            Article::injectJournalNames($articles);
            Article::injectWithImages($articles);
            Article::injectIssueContentDate($articles);

            ImageProxyService::resize($articles, 'image_path', ImageProxyService::ARTICLE_PREVIEW_150);

//            return $articles;
//        });

        return response()->json(array_values($articles->toArray()));
    }

}