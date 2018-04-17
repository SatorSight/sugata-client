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

trait AllIssuesRoutes
{
    /**
     * @desc all bundles
     * @return \Illuminate\Http\JsonResponse
     */
    public function allIssuesGetAllBundles(){
        $bundles = Cache::remember('bundles', $this->expiration, function () {
            return Bundle::orderBy('order', 'ASC')->get();
        });

        return response()->json($bundles);
    }

    /**
     * @desc title of current bundle
     * @param $bundle_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function allIssuesGetBundleName($bundle_id){
        $name = Cache::remember('bundle_name_' . $bundle_id, $this->expiration, function () use ($bundle_id) {
            return Bundle::find($bundle_id)->name;
        });

        $nameObj = new \stdClass();
        $nameObj->name = $name;

        return response()->json($nameObj);
    }

    /**
     * @desc title of current journal
     * @param $journal_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function allIssuesGetJournalName($journal_id){
        $name = Cache::remember('journal_name_' . $journal_id, $this->expiration, function () use ($journal_id) {
            return Journal::find($journal_id)->name;
        });

        $nameObj = new \stdClass();
        $nameObj->name = $name;

        return response()->json($nameObj);
    }

    /**
     * @desc  first 20 issues for journal
     * @param $journal_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function allIssuesJournalGetIssues($journal_id){
        $issues = Cache::remember('all_issues_journal_' . $journal_id, $this->expiration, function () use ($journal_id) {
            $issues = Journal::find($journal_id)->issues->sortByDesc('id')->take(20);

            Issue::injectWithImages($issues);
            Issue::injectWithJournalNames($issues);
            ImageProxyService::resize($issues, 'image_path', ImageProxyService::ISSUE_STANDARD_500);

            return $issues;
        });

        return response()->json(array_values($issues->toArray()));
    }

    /**
     * @desc first 20 issues for bundle
     * @param $bundle_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function allIssuesBundleGetIssues($bundle_id){
        $issues = Cache::remember('all_issues_bundle_' . $bundle_id, $this->expiration, function () use ($bundle_id) {
            $journals = Bundle::find($bundle_id)->journals;
            $journals_ids = $journals->map(function($journal){
                return $journal->id;
            })->toArray();

            $issues = Issue::whereIn('journal_id', $journals_ids)->orderByDesc('id')->limit(20)->get();

            Issue::injectWithImages($issues);
            Issue::injectWithJournalNames($issues);
            ImageProxyService::resize($issues, 'image_path', ImageProxyService::ISSUE_STANDARD_500);

            return $issues;
        });

        return response()->json(array_values($issues->toArray()));
    }

    /**
     * @desc more issues for journal
     * @param $journal_id
     * @param $from
     * @return \Illuminate\Http\JsonResponse
     */
    public function allIssuesMoreJournalGetIssues($journal_id, $from){
        $issues = Cache::remember('all_issues_journal_' . $journal_id, $this->expiration, function () use ($journal_id, $from) {
            $issues = Journal::find($journal_id)->issues->sortByDesc('id')->slice($from)->take(20);

            Issue::injectWithImages($issues);
            Issue::injectWithJournalNames($issues);
            ImageProxyService::resize($issues, 'image_path', ImageProxyService::ISSUE_STANDARD_500);

            return $issues;
        });

        return response()->json(array_values($issues->toArray()));
    }

    /**
     * @desc more issues for bundle
     * @param $bundle_id
     * @param $from
     * @return \Illuminate\Http\JsonResponse
     */
    public function allIssuesMoreBundleGetIssues($bundle_id, $from){
        $issues = Cache::remember('all_issues_bundle_' . $bundle_id, $this->expiration, function () use ($bundle_id, $from) {
            $journals = Bundle::find($bundle_id)->journals;
            $journals_ids = $journals->map(function($journal){
                return $journal->id;
            })->toArray();

            $issues = Issue::whereIn('journal_id', $journals_ids)->orderByDesc('id')->offset($from)->limit(20)->get();

            Issue::injectWithImages($issues);
            Issue::injectWithJournalNames($issues);
            ImageProxyService::resize($issues, 'image_path', ImageProxyService::ISSUE_STANDARD_500);

            return $issues;
        });

        return response()->json(array_values($issues->toArray()));
    }
}