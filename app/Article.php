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

//    public function image(){
//        $t = new \stdClass();
//        $t->path = '123';
//        return $t;
//    }

    public function getImage(){
        $images = Image::where([
            'parent_type' => 'Article',
            'parent_id' => $this->id
        ])->get();

        if(empty($images))
            return null;

        $return = null;
        foreach($images as $image)
            if(file_exists($image))
                $return = $image;

        return $return;
    }

//    public function getExistingImages(){
//
//    }

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

    public static function injectWithImages(Collection &$articles) : void {
        $articles = $articles->map(function($article){
//
//            if($article->id == 59243){
//
//                $images = $article->getImage();
////
//                SUtils::trace($images);
//
//
//                SUtils::trace('hi');

//            }

//            SUtils::trace('end');

            if(!empty($article->getImage())) {
                $image = $article->getImage();
                if(isset($image->path))
                    $article->image_path = $image->path;
            }
            return $article;
        });
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
