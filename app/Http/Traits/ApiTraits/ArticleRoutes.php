<?php

namespace App\Http\Traits\ApiTraits;

use App\Article;
use App\Bundle;
use App\Http\Controllers\Helper;
use App\Issue;
use App\Journal;
use App\Lib\SUtils;
use Illuminate\Database\Eloquent\Collection;

trait ArticleRoutes{

    /**
     * @desc journal data
     * @param $journal_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function articleGetJournal($article_id){
        $article = Article::find($article_id);
        $journal = $article->issue->journal;

        return response()->json($journal);
    }

    /**
     * @desc get article issue
     * @param $article_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function articleGetIssue($article_id){
        $article = Article::find($article_id);
        $issue = $article->issue;

        //todo rewrite this
        $issue_collection = new Collection();
        $issue_collection->push($issue);
        Issue::injectWithImages($issue_collection);
        Issue::injectWithPagesCount($issue_collection);

        $issue = $issue_collection->first();

        return response()->json($issue);
    }

    /**
     * @desc article data
     * @param $article_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function articleGetArticle($article_id){
        $article = Article::find($article_id);

        $article_collection = new Collection();
        $article_collection->push($article);
        Article::injectOtherArticlesIdList($article_collection);

        $article = $article_collection->first();

        return response()->json($article);
    }

    /**
     * @desc next article in issue
     * @param $article_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function articleGetNextArticle($article_id){
        $article = Article::find($article_id);
        $page_number = $article->page_number;
        $next_article = Article::where('issue_id', $article->issue_id)->where('page_number', $page_number + 1)->get();

        Article::injectWithImages($next_article);

        return response()->json($next_article->first());
    }

}