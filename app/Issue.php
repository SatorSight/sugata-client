<?php

namespace App;

use App\Http\Traits\HasImage;
use App\Http\Traits\HasLatest;
use App\Lib\SUtils;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Issue extends Model
{
    use HasImage;
    use HasLatest;

    public function journal(){
        return $this->belongsTo(Journal::class);
    }

    public function articles(){
        return $this->hasMany(Article::class);
    }

    public static function boot(){
        parent::boot();
        static::deleting(function($issue){
            foreach ($issue->articles()->get() as $article)
                $article->delete();
        });
    }

    public static function getLastIssuesDistinctJournal(Bundle $bundle, $limit = 4){
        $journals = $bundle->journals;
        $journals = $journals->filter(function ($journal) { return !$journal->archived; });
        $last_issues_packs = $journals->reduce(function($carry, $journal) use ($journals, $limit) {
            $last_issues = Issue::where('journal_id', $journal->id)
                ->orderByDesc('content_date')
                //to get at least 4 issue covers
                ->limit(ceil($limit / $journals->count()))
                ->get()
            ;

            return $carry->concat($last_issues);
        }, new Collection());

        $last_issues = $last_issues_packs
            //distinct journals
            ->reduce(function($carry, $issue) use ($limit) {
                if($carry->count() < $limit){
                    if(!$carry->search(function($item) use ($issue) {
                        return $issue->journal_id === $item->journal_id;
                    }))
                        $carry->push($issue);
                }
                return $carry;
            }, new Collection())
        ;

        $all_issues = $last_issues_packs->flatten();

        // fill issues if its not enough
        if($last_issues->count() < $limit){
            $new_limit = $limit - $last_issues->count();
            for($i = 0; $i < $new_limit; $i++){
                $last_issues->push(self::getMissingIssue($all_issues, $last_issues));
            }
        }

        return $last_issues;
    }

    private static function getMissingIssue($all_issues, $issues){
        $added_issue = $all_issues->reduce(function($carry, $issue) use ($issues) {
            if(!$carry){
                if(false === $issues->search(function($item) use ($issue) {
                    return $issue->id == $item->id;
                }))
                    $carry = $issue;
            }
            return $carry;
        }, null);

        return $added_issue;
    }

    public static function getLastForJournals(Collection $journals) : Collection {
        $last_issues = new Collection();
        $journals->map(function($journal) use (&$last_issues){
            /** @var Journal $journal */
            $last_issue = $journal->getLastIssue();
            $last_issue->image;
            if($last_issues->count() <= 5)
                $last_issues->push($last_issue);
        });
        return $last_issues;
    }


    public function getCoverArticle(){

//        SUtils::trace($this->id);

//        $test = $this->articles()->orderByDesc('id')->get();
//        foreach ($test as $r){
//            SUtils::dump($r->id);
//            var_dump($r->cover);
//
//        }
//        die;


        return $this->articles()->orderByDesc('id')->where('cover','=', true)->get()->first();
    }

    public function getFirstBasicArticle(){
        $basic_article = Article::where('issue_id', $this->id)
            ->where('show_in_lists', true)
            ->where(function($query){
                $query->where('cover', false)
                      ->orWhereNull('cover');
            })
            ->where(function($query){
                $query->where('chosen', false)
                    ->orWhereNull('chosen');
            })
            ->orderBy('page_number')
            ->limit(1)
            ->get()
            ->first();
        ;

        return $basic_article;
    }

    public function getNthBasicArticle($n = 0){
        $basic_article = Article::where('issue_id', $this->id)
            ->where('show_in_lists', true)
            ->where(function($query){
                $query->where('cover', false)
                    ->orWhereNull('cover');
            })
            ->where(function($query){
                $query->where('chosen', false)
                    ->orWhereNull('chosen');
            })
            ->orderBy('page_number')
            ->offset($n)
            ->limit(1)
            ->get()
            ->first();
        ;

        return $basic_article;
    }

    public static function injectWithJournalNames(Collection &$issues){
        return $issues->map(function($issue){
            $journal_name = $issue->journal->name;
            unset($issue->journal);
            $issue->journal_name = $journal_name;
            return $issue;
        });
    }

    public static function injectWithJournalLogo(Collection &$issues){
        return $issues->map(function($issue){
            $journal = $issue->journal;
            if(!empty($journal->logo))
                $issue->logo_path = $journal->logo->path;
            unset($issue->journal);
            return $issue;
        });
    }

    public function getNotFirstRandomBasicArticle(){
        $basic_article = Article::where('issue_id', $this->id)
            ->where('show_in_lists', true)
            ->where(function($query){
                $query->where('cover', false)
                    ->orWhereNull('cover');
            })
            ->where(function($query){
                $query->where('chosen', false)
                    ->orWhereNull('chosen');
            })
            ->orderBy('page_number')
            ->get()
            ->slice(1)
            ->shuffle()
            ->first();
        ;

        return $basic_article;
    }


    public function getNotFirstBasicArticle(){
        $basic_article = Article::where('issue_id', $this->id)
            ->where('show_in_lists', true)
            ->where(function($query){
                $query->where('cover', false)
                    ->orWhereNull('cover');
            })
            ->where(function($query){
                $query->where('chosen', false)
                    ->orWhereNull('chosen');
            })
            ->orderBy('page_number')

            //not last!

            ->limit(2)
            ->get()
            ->last();
        ;
        return $basic_article;
    }

    public static function getLastFromEachJournal($limit = 4, Bundle $bundle = null){
        $bundle_journal_ids = [];
        if($bundle)
            $bundle_journal_ids = Journal::select('id')
                ->where('bundle_id', $bundle->id)
                ->get()
                ->map(function($journal){
                    return $journal->id;
                })->toArray();

        $last_issues_id_objects = Issue::select(DB::raw('max(id) as id'));

        if($bundle)
            $last_issues_id_objects = $last_issues_id_objects
                ->whereIn('journal_id', $bundle_journal_ids);

        $last_issues_id_objects = $last_issues_id_objects
            ->groupBy('journal_id')
            ->orderByDesc('id')
            ->get();

        $last_issues_ids = $last_issues_id_objects
            ->map(function($id_object){ return $id_object->id; })
            ->take($limit)
            ->sort()
            ->reverse()
            ->toArray();

        $last_issues = Issue::whereIn('id', $last_issues_ids)->orderBy('id', 'desc')->get();
        return $last_issues;
    }

    public static function getCoverArticles(Collection $issues){
        $cover_articles = $issues
            ->map   (function($issue){   return $issue->getCoverArticle(); })
            ->reject(function($article){ return empty($article); });
        return $cover_articles;
    }



    public static function getNthBasicArticles(Collection $issues, $n){
        $basic_articles = $issues
            ->map   (function($issue) use ($n) { /** @var Issue $issue */ return $issue->getNthBasicArticle($n); })
            ->reject(function($article){ return empty($article); });

        return $basic_articles;
    }


    public static function getFirstBasicArticles(Collection $issues){
        $basic_articles = $issues
            ->map   (function($issue){ /** @var Issue $issue */ return $issue->getFirstBasicArticle(); })
            ->reject(function($article){ return empty($article); });

        return $basic_articles;
    }

    public static function getRandomBasicArticles(Collection $issues){
        $basic_articles = $issues
            ->map   (function($issue){ /** @var Issue $issue */ return $issue->getNotFirstRandomBasicArticle(); })
            ->reject(function($article){ return empty($article); });

        return $basic_articles;
    }

    public static function getNotFirstBasicArticles(Collection $issues){
        $basic_articles = $issues
            ->map   (function($issue){ /** @var Issue $issue */ return $issue->getNotFirstBasicArticle(); })
            ->reject(function($article){ return empty($article); });

        return $basic_articles;
    }

    public function getBasicArticles($limit, $from = 0){
        return $this->articles()
            ->where('show_in_lists', true)
            ->where(function($query){
                $query->where('cover', false)
                    ->orWhereNull('cover');
            })
            ->where(function($query){
                $query->where('chosen', false)
                    ->orWhereNull('chosen');
            })
            ->orderByDesc('page_number')
            ->get()
            ->reject(function($article){ return empty($article); })
            ->slice($from)
            ->take($limit);
    }

    public static function injectWithPagesCount(Collection &$issues){
        return $issues->map(function($issue){
            $pages_count = Article::where('issue_id', $issue->id)->count();
            $issue->pages_count = $pages_count;
            return $issue;
        });

    }

    public static function injectWithPageIds(Collection &$issues){
        return $issues->map(function($issue){
            $pages = Article::select('page_number')
                ->where('issue_id', $issue->id)
                ->get()
                ->map(function($article){
                    return $article->page_number;
                })
                ->sort()
                ->values()
                ->toArray()
            ;
//            $issue->page_numbers = array_values($pages);
            $issue->page_numbers = $pages;
            return $issue;
        });

    }


}
