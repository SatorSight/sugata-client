<?php

namespace App;

use App\Http\Traits\HasImage;
use App\Http\Traits\ImageInjector;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class Bundle extends Model
{
    use HasImage;
    use ImageInjector;

    public function journals(){
        return $this->hasMany('App\Journal');
    }

    public static function boot(){
        parent::boot();
        static::deleting(function($bundle){
            foreach ($bundle->journals()->get() as $journal)
                $journal->delete();
        });
    }

    public static function injectJournalNames(Collection &$bundles){
        $bundles->transform(function($bundle){
            $journals = $bundle->journals;
            $journals = $journals->filter(function ($journal) { return !$journal->archived; });
            $journal_names = $journals->map(function($j){ return $j->name; })->toArray();
            $journal_names = array_values($journal_names);
            $bundle->journal_names = $journal_names;
            unset($bundle->journals);
            return $bundle;
        });
    }

    public static function injectIssuesCovers(Collection &$bundles){
        $bundles->transform(function($bundle){
            $last_issues = Issue::getLastIssuesDistinctJournal($bundle);
//            dump($last_issues);
//            $journals = $bundle->journals;
//            $journals = $journals->filter(function ($journal) { return !$journal->archived; });
//            $last_issues = $journals->reduce(function($carry, $journal) use ($journals) {
//                $last_issues = Issue::where('journal_id', $journal->id)
//                    ->orderByDesc('content_date')
//                    //to get at least 4 issue covers
//                    ->limit(ceil(4 / $journals->count()))
//                    ->get()
//                ;
//                return $carry->concat($last_issues);
//            }, new Collection())
//                ->reduce()
//                ->sortByDesc('content_date')
//                ->take(4);
//            dump($last_issues);

            $bundle->issue_covers = $last_issues->map(function($i){ return $i->image->path; });
            $bundle->issue_covers = array_values($bundle->issue_covers->toArray());
            unset($bundle->journals);
            return $bundle;
        });
    }

}