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
        foreach($images as $image){
            if($image->imageFileExists())
                $return = $image;
            break;
        }

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

        $articles = Article::where('chosen', true)->orderBy('page_number', 'desc')->take(4)->get();

//        $articles = collect([]);
//        //todo rewrite
//        $journals = Journal::where('id','>','0')->orderBy('order', 'desc')->take(4)->get();
//        foreach ($journals as $key => $journal) {
//            $issue = $journal->issues->sort()->reverse()->first();
//            // $ar = Article::where('id','>','0')->orderBy('id', 'desc')->take(1)->get();
//            $arr = $issue->articles;
//            $counter = 0;
//            $ar = null;
//            foreach ($arr as $key => $a) {
//                $counter++;
//
//                if(!empty($a->title) && $counter > 10){
//                    $ar = $a;
//                    break;
//                }
//            }
//
//
//
//            // SUtils::trace($ar->issue_id);
//
//            $ar->image_path = $ar->getImage()->path ?? '';
//            $ar->title = strtoupper($ar->title);
//            unset($ar->image);
//            unset($ar->html);
//
//
//            $articles->push($ar);
//        }

        // SUtils::trace(get_class($articles[0]));
        

        // $articles = self::where('id', 'in' '2,3,4,5')->get();

        // $articles = self::getLatest(4);
        // $articles = $articles->map(function($article){
        //     $article->image_path = $article->getImage()->path ?? '';
        //     unset($article->image);
        //     return $article;
        // });



        // self::clearFromHtml($articles);
        return $articles;
    }

    public static function injectWithText(Collection &$articles) : void {
        $articles = $articles->map(function($article){
            if($article) {
                $text = $article->getClearText();
                if (!empty($text))
                    $article->text = $text;
            }
            return $article;
        });
    }

    public static function injectWithCustomData(Collection &$articles, $key, $value) : void {
        $articles = $articles->map(function($article) use ($key, $value){
            if($article)
                $article->$key = $value;
            return $article;
        });
    }


    public function getClearText(){
        $s = $this->html;

        $pattern = '/<p>.*?<\/p>/is';
        preg_match_all($pattern, $s, $matches);

        if(empty($matches))
            return false;

        $matches = array_shift($matches);

        if(empty($matches))
            return false;

        $text = implode(' ', $matches);

        if(mb_strlen($text) < 200)
            return false;

        $text = mb_substr($text, 0, 350);

        $p2 = '/<\/p>.<p>/is';
        $res = preg_replace($p2, ' ', $text);

        if(empty($res))
            return false;

        $res = substr($res, 0, strrpos($res, '.') + 1);
        $res = str_replace('<p>', '', $res);
        $res = str_replace('</p>', '', $res);
        $res = str_replace('</br>', '', $res);
        $res = str_replace('<br/>', '', $res);
        $res = strip_tags($res);

        return $res;
    }

    public static function injectWithImages(Collection &$articles) : void {
        $articles = $articles->map(function($article){
            if(!empty($article)) {
                if (!empty($article->getImage())) {
                    $image = $article->getImage();
                    if (isset($image->path))
                        $article->image_path = $image->path;
                }
            }
            return $article;
        });
    }

    public static function injectOtherArticlesIdList(Collection &$articles) : void {
        $articles = $articles->map(function($article){
            if(!empty($article)) {
                /** @var Collection $ids */
                $ids = Article::select('id')->where('issue_id', $article->issue_id)->get();
                $article->other_articles_ids = $ids->reduce(function($carry, $item){
                    $carry[] = $item->id;
                    return $carry;
                }, []);
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

    public static function removeWithBlankText(Collection &$articles) : void {
        $articles = $articles->reject(function($article){
            if($article)
                return $article->text === false;
            return false;
        });
    }

    public static function injectJournalNames(Collection &$articles) : void {
        $articles = $articles->map(function($article){
            if($article) {
                //breaking eager loading to remove needless data
                $issue = Issue::find($article->issue_id);
                $article->journal_name = $issue->journal->name;
            }
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

    public function isArticleCorrect(){
        if($this->page_number < 2)
            return false;

        if(empty($this->title))
            return false;
        if(empty($this->html))
            return false;

        if(!self::isHTMLCorrect($this->html))
            return false;

        /** @var Image $image */
        $image = $this->getImage();
        if(empty($image))
            return false;

        if(!file_exists(public_path() . $image->path))
            return false;

        return true;
    }

    public static function isHTMLCorrect(string $html) : bool {
        preg_match('/<p>(.*?)<\/p>/', $html, $matches);
        if(empty($matches))
            return false;

        $p_contents = $matches[1];
        if(strlen($p_contents) > 200)
            return true;
        return false;
    }

}
