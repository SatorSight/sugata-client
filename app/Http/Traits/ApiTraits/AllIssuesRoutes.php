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
     * @desc all issues for journal
     * @param $journal_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function allIssuesJournalGetIssues($journal_id){
        $issues = Cache::remember('all_issues_journal_' . $journal_id, $this->expiration, function () use ($journal_id) {
            $issues = Journal::find($journal_id)->issues->sortByDesc('id');

            Issue::injectWithImages($issues);
            ImageProxyService::resize($issues, 'image_path', ImageProxyService::ISSUE_STANDARD_500);

            return $issues;
        });

        return response()->json(array_values($issues->toArray()));
    }

    /**
     * @desc all issues for bundle
     * @param $bundle_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function allIssuesBundleGetIssues($bundle_id){
        $issues = Cache::remember('all_issues_bundle_' . $bundle_id, $this->expiration, function () use ($bundle_id) {
            $journals = Bundle::find($bundle_id)->journals;
            $journals_ids = $journals->map(function($journal){
                return $journal->id;
            })->toArray();

            $issues = Issue::whereIn('journal_id', $journals_ids)->orderByDesc('id')->get();

            Issue::injectWithImages($issues);
            ImageProxyService::resize($issues, 'image_path', ImageProxyService::ISSUE_STANDARD_500);

            return $issues;
        });

        return response()->json(array_values($issues->toArray()));
    }
}