<?php

namespace App\Http\Traits\ApiTraits;

use App\Article;
use App\Bundle;
use App\Issue;
use App\Journal;
use App\Lib\ImageProxyService;
use App\Lib\SUtils;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Cache;

trait IssueRoutes{
    /**
     * @desc all bundles
     * @return \Illuminate\Http\JsonResponse
     */
    public function issueGetBundles(){
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
    public function issueGetCurrentBundle($issue_id){
        $bundle = Cache::remember('issue_current_bundle_' . $issue_id, $this->expiration, function() use($issue_id) {
            return Issue::find($issue_id)->journal->bundle;
        });

        return response()->json($bundle);
    }

    /**
     * @desc first issue article id
     * @param $issue_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function issueGetFirstArticleId($issue_id){
        $id = Cache::remember('issue_first_article_id_' . $issue_id, $this->expiration, function() use($issue_id) {
            $id = Article::select('id')
                ->where('issue_id', $issue_id)
                ->orderBy('page_number')
                ->limit(1)
                ->get()
                ->first()
                ->id
            ;

            return $id;
        });

        $idObj = new \stdClass();
        $idObj->id = $id;

        return response()->json($idObj);
    }

    /**
     * @desc get all issue data
     * @param $issue_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function issueGetIssue($issue_id){
        $issue = Cache::remember('issue_issue_' . $issue_id, $this->expiration, function() use($issue_id) {
            $issue = Issue::find($issue_id);

            $issue_collection = new Collection();
            $issue_collection->push($issue);

            Issue::injectWithImages($issue_collection);
            Issue::injectWithJournalLogo($issue_collection);
            Issue::injectWithJournalNames($issue_collection);

            ImageProxyService::resize($issue_collection, 'image_path', ImageProxyService::ISSUE_STANDARD_500);

            $issue = $issue_collection->first();

            return $issue;
        });

        return response()->json($issue);
    }

    /**
     * @desc get prev issue data
     * @param $issue_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function issueGetPreviousIssue($issue_id){
        $issue = Cache::remember('issue_prev_issue_' . $issue_id, $this->expiration, function() use($issue_id) {
            $issue = Issue::find($issue_id);

            $issue_collection = new Collection();
            $issue_collection->push($issue);

            Issue::injectWithImages($issue_collection);
            Issue::injectWithJournalLogo($issue_collection);
            Issue::injectWithJournalNames($issue_collection);

            ImageProxyService::resize($issue_collection, 'image_path', ImageProxyService::ISSUE_STANDARD_500);

            $issue = $issue_collection->first();

            return $issue;
        });

        return response()->json($issue);
    }

    /**
     * @desc get all issues
     * @param $issue_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function issueGetAllIssues($issue_id){
        $journal_issues = Cache::remember('issue_all_issues_' . $issue_id, $this->expiration, function() use($issue_id) {
            /** @var Issue $issue */
            $issue = Issue::find($issue_id);

            $journal_issues = $issue->journal->issues;

            Issue::injectWithImages($journal_issues);
            Issue::injectWithJournalNames($journal_issues);

            ImageProxyService::resize($journal_issues, 'image_path', ImageProxyService::ISSUE_STANDARD_500);

            $journal_issues = $journal_issues->sortByDesc('content_date');

            return $journal_issues;
        });

        return response()->json(array_values($journal_issues->toArray()));
    }

    /**
     * @desc cover article + all chosen articles
     * @param $issue_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function issueGetMainTopics($issue_id){
        $main_topics = Cache::remember('issue_main_topics_' . $issue_id, $this->expiration, function() use($issue_id) {
            $cover_article = Article::where('issue_id', $issue_id)
                ->where('cover', true)
                ->get()
                ->first();
            ;

            $chosen_articles = Article::where('issue_id', $issue_id)
                ->where('chosen', true)
                ->get()
            ;

            $main_topics = new Collection();
            $main_topics = $main_topics
                ->push($cover_article)
                ->concat($chosen_articles);

            $main_topics = $main_topics->reject(function($article){
                return empty($article);
            });

            $issue = Issue::find($issue_id);
            $pages_count = $issue->articles->count();

            Article::injectWithCustomData($main_topics, 'pages_count', $pages_count);
            Article::injectWithText($main_topics);
            Article::clearFromHtml($main_topics);
            Article::injectDates($main_topics);
            Article::injectJournalNames($main_topics);
            Article::injectWithImages($main_topics);

            ImageProxyService::resize($main_topics, 'image_path', ImageProxyService::COVER_ARTICLE_800);

            return $main_topics;
        });

        return response()->json($main_topics);
    }

    /**
     * @desc all basic articles order by page_number desc
     * @param $issue_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function issueGetNewArticles($issue_id){
        $basic_articles = Cache::remember('issue_new_articles_' . $issue_id, $this->expiration, function() use($issue_id) {
            $issue = Issue::find($issue_id);
            $basic_articles = $issue->getBasicArticles(5);

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


//
//        $articles = Article::where('issue_id', $issue_id)
//            ->where(function($query){
//                $query->where('cover', false)
//                    ->orWhereNull('cover');
//            })
//            ->where(function($query){
//                $query->where('chosen', false)
//                    ->orWhereNull('chosen');
//            })
//            ->orderBy('page_number', 'desc')
//            ->limit(10)
//            ->get()
//        ;
//
//        Article::injectWithText($articles);
//        Article::removeWithBlankText($articles);
//        Article::clearFromHtml($articles);
//        Article::injectDates($articles);
//        Article::injectJournalNames($articles);
//        Article::injectWithImages($articles);

        return response()->json(array_values($basic_articles->toArray()));
    }

    /**
     * @desc more basic articles
     * @param $issue_id
     * @param $from
     * @return \Illuminate\Http\JsonResponse
     */
    public function issueGetMoreNewArticles($issue_id, $from){
        $basic_articles = Cache::remember('issue_more_new_articles_' . $issue_id . '_' . $from, $this->expiration, function() use($issue_id, $from) {
            /** @var Issue $issue */
            $issue = Issue::find($issue_id);
            /** @var Collection $basic_articles */
            $basic_articles = $issue->getBasicArticles(5, $from);

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
//
//        $articles = Article::where('issue_id', $issue_id)
//            ->where(function($query){
//                $query->where('cover', false)
//                    ->orWhereNull('cover');
//            })
//            ->where(function($query){
//                $query->where('chosen', false)
//                    ->orWhereNull('chosen');
//            })
//            ->orderBy('page_number', 'desc')
//            ->get()
//            ->slice($from)
//            ->take(10);
//        ;
//
//        Article::injectWithText($articles);
//        Article::removeWithBlankText($articles);
//        Article::clearFromHtml($articles);
//        Article::injectDates($articles);
//        Article::injectJournalNames($articles);
//        Article::injectWithImages($articles);
//
//        return response()->json(array_values($articles->toArray()));

//
//        $response = new \stdClass();
//        $response->ids = $ids;
//        $response->articles = $articles;
    }

    /**
     * @desc other issues from journal
     * @param $issue_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function issueGetOtherIssues($issue_id){
        $issues = Cache::remember('issue_other_issues_' . $issue_id, $this->expiration, function() use($issue_id) {
            $issues = Issue::find($issue_id)->journal->issues
                ->sortByDesc('content_date')
                ->reject(function($i) use ($issue_id){
                    return $issue_id == $i->id;
                });

            Issue::injectWithImages($issues);
            Issue::injectWithJournalNames($issues);
            Issue::injectWithJournalLogo($issues);

            return $issues;
        });

        return response()->json(array_values($issues->toArray()));
    }

}