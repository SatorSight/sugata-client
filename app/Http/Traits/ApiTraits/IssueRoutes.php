<?php

namespace App\Http\Traits\ApiTraits;

use App\Article;
use App\Bundle;
use App\Issue;
use App\Journal;
use App\Lib\SUtils;
use Illuminate\Database\Eloquent\Collection;

trait IssueRoutes{
    /**
     * @desc all bundles
     * @return \Illuminate\Http\JsonResponse
     */
    public function issueGetBundles(){
        return response()->json(Bundle::all());
    }

    /**
     * @desc current bundle info
     * @param $bundle_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function issueGetCurrentBundle($issue_id){
        $bundle = Issue::find($issue_id)->journal->bundle;
        return response()->json($bundle);
    }

    /**
     * @desc get all issue data
     * @param $issue_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function issueGetIssue($issue_id){
        $issue = Issue::find($issue_id);

        $issue_collection = new Collection();
        $issue_collection->push($issue);

        Issue::injectWithImages($issue_collection);
        Issue::injectWithJournalLogo($issue_collection);
        Issue::injectWithJournalNames($issue_collection);

        $issue = $issue_collection->first();

        return response()->json($issue);
    }

    /**
     * @desc get prev issue data
     * @param $issue_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function issueGetPreviousIssue($issue_id){
        $issue = Issue::find($issue_id);

        $issue_collection = new Collection();
        $issue_collection->push($issue);

        Issue::injectWithImages($issue_collection);
        Issue::injectWithJournalLogo($issue_collection);
        Issue::injectWithJournalNames($issue_collection);

        $issue = $issue_collection->first();

        return response()->json($issue);
    }

    /**
     * @desc get all issues
     * @param $issue_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function issueGetAllIssues($issue_id){
        /** @var Issue $issue */
        $issue = Issue::find($issue_id);

//        //todo optimize maybe
//
//        $next = null;
//        $prev = null;

        $journal_issues = $issue->journal->issues;
//            ->toArray();

//
//        foreach ($journal_issues as $key => $i){
//            if($i['id'] == $issue->id){
//                if($key == 0){
//                    if(count($journal_issues) > 1) {
//                        $next = $journal_issues[$key + 1];
//                    }
//                }else{
//                    if($key == count($journal_issues) - 1){
//                        $prev = $journal_issues[$key - 1];
//                    }else{
//                        $next = $journal_issues[$key + 1];
//                        $prev = $journal_issues[$key - 1];
//                    }
//                }
//                break;
//            }
//        }
//
//        $side_issues = new \stdClass();
//        $side_issues->prev = $prev;
//        $side_issues->next = $next;

        Issue::injectWithImages($journal_issues);
        Issue::injectWithJournalNames($journal_issues);

        return response()->json($journal_issues);
    }

    /**
     * @desc cover article + all chosen articles
     * @param $issue_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function issueGetMainTopics($issue_id){
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

        $issue = Issue::find($issue_id);
        $pages_count = $issue->articles->count();

        Article::injectWithCustomData($main_topics, 'pages_count', $pages_count);
        Article::injectWithText($main_topics);
        Article::clearFromHtml($main_topics);
        Article::injectDates($main_topics);
        Article::injectJournalNames($main_topics);
        Article::injectWithImages($main_topics);

        return response()->json($main_topics);
    }

    /**
     * @desc all basic articles order by page_number desc
     * @param $issue_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function issueGetNewArticles($issue_id){

        $issue = Issue::find($issue_id);
        $basic_articles = $issue->getBasicArticles(5);

        Article::injectWithText($basic_articles);
        Article::removeWithBlankText($basic_articles);
        Article::clearFromHtml($basic_articles);
        Article::injectDates($basic_articles);
        Article::injectJournalNames($basic_articles);
        Article::injectWithImages($basic_articles);

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
        $issues = Issue::find($issue_id)->journal->issues
            ->sortByDesc('number')
            ->reject(function($i) use ($issue_id){
                return $issue_id == $i->id;
            });

        Issue::injectWithImages($issues);
        Issue::injectWithJournalNames($issues);
        Issue::injectWithJournalLogo($issues);

        return response()->json(array_values($issues->toArray()));
    }

}