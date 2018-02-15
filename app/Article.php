<?php

namespace App;

use App\Http\Controllers\Helper;
use App\Http\Traits\HasLatest;
use App\Lib\SUtils;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

class Article extends Model
{
    use HasLatest;

    public function issue() {
        return $this->belongsTo('App\Issue');
    }

    public function getImage(){
        return Image::where([
            'parent_type' => 'Article',
            'parent_id' => $this->id
        ])->first();
    }

//    public function getBigImage(){
//        return Image::where([
//            'parent_type' => 'Article',
//            'parent_id' => $this->id
//        ])->first();
//    }

    public static function getChosen() : Collection{
        $articles = self::getLatest(4);
        $articles = $articles->map(function($article){
            $article->image_path = $article->getImage()->path ?? '';
            unset($article->image);
            return $article;
        });

        self::clearFromHtml($articles);
        return $articles;
    }

    public static function clearFromHtml(Collection &$articles) : void {
        $articles = $articles->map(function($article){
            unset($article->html);
            return $article;
        });
    }

    public static function injectJournalNames(Collection &$articles) : void {
        $articles = $articles->map(function($article){
            //breaking eager loading to remove needless data
            $issue = Issue::find($article->issue_id);
            $article->journal_name = $issue->journal->name;
            return $article;
        });
    }

    public static function injectJournalCovers(Collection &$articles) : void {
        $articles = $articles->map(function($article){
            //breaking eager loading to remove needless data
            $issue = Issue::find($article->issue_id);
            $article->issue_cover = $issue->image->path;
            return $article;
        });
    }

    public static function injectDates(Collection &$articles) : void {
        $articles = $articles->map(function($article){
            if(!empty($article->created_at)){
                /** @var Carbon $date */
                $date = new $article->created_at;
                $date_str = SUtils::getRuMonth($date->getTimestamp()) . ' ' . $date->format('Y');
                $article->date = $date_str;
                return $article;
            }
        });
    }
}
