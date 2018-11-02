<?php

namespace App;

use App\Http\Controllers\Helper;
use App\Http\Traits\HasLatest;
use App\Lib\SUtils;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
//use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Collection;

class Article extends Model
{
    use HasLatest;

    public function issue() {
        return $this->belongsTo('App\Issue');
    }

    public function getImage(){

        $preview = SmallPreviewImage::where([
            'parent_type' => 'Article',
            'parent_id' => $this->id
        ])->first();

        if($preview && $preview->imageFileExists())
            return $preview;

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

    public function getBigPreviewImage(){
        $image = BigPreviewImage::where([
            'parent_type' => 'Article',
            'parent_id' => $this->id
        ])->first();

        if(!$image || !$image->imageFileExists())
            return null;
        return $image;
    }

    public static function getChosen() : Collection {
        $articles = Article::where('chosen', true)->orderBy('page_number', 'desc')->take(4)->get();
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


        $p2 = '/<\/p>.<p>/is';
        $res = preg_replace($p2, ' ', $text);

        if(empty($res))
            return false;

//        $res = substr($res, 0, strrpos($res, '.') + 1);
        $res = str_replace('<p>', '', $res);
        $res = str_replace('</p>', '', $res);
        $res = str_replace('</br>', '', $res);
        $res = str_replace('<br/>', '', $res);
        $res = str_replace('&nbsp;', ' ', $res);
        $res = str_replace('&lt;', ' ', $res);
        $res = str_replace('&gt;', ' ', $res);
        $res = strip_tags($res);

        $res = mb_substr($res, 0, 100);

        return $res;
    }

    public static function injectWithImages(Collection &$articles) : void {
        //todo change to transform
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

    public static function injectWithBigPreviews(Collection &$articles) : void {
        //todo change to transform
        $articles = $articles->map(function($article){
            if(!empty($article)) {
                if(!empty($article->getBigPreviewImage())){
                    $image = $article->getBigPreviewImage();
                    if (isset($image->path))
                        $article->image_path = $image->path;
                }else{
                    if(!empty($article->getImage())){
                        $image = $article->getImage();
                        if (isset($image->path))
                            $article->image_path = $image->path;
                    }
                }
            }
            return $article;
        });
    }

    public static function injectNextAndPrevIssue(Collection &$articles) : void {
        $articles = $articles->map(function($article){
            if(!empty($article)) {

                $issue_id = $article->issue->id;
                $journal = $article->issue->journal;
                $issues = $journal->issues->sortByDesc('content_date')->values();

                $current_key = null;
                $issues->each(function($issue, $key) use ($issue_id, &$current_key){
                    if($issue->id === $issue_id){
                        $current_key = $key;
                    }
                });

                $prev = $issues->get($current_key - 1);
                $next = $issues->get($current_key + 1);

                //todo fix this wtf
                $side_collection = new \Illuminate\Database\Eloquent\Collection();
                if($prev)
                    $side_collection->push($prev);
                if($next)
                    $side_collection->push($next);

                Issue::injectWithImages($side_collection);
                Issue::injectWithJournalNames($side_collection);
                Issue::injectWithJournalLogo($side_collection);

                $next = $side_collection->pop();
                $prev = $side_collection->pop();

                $side_issues = new \stdClass();
                $side_issues->prev = $prev;
                $side_issues->next = $next;

                $article->side_issues = $side_issues;

                /** @var Collection $ids */
                $ids = Article::select('id')->where('issue_id', $article->issue_id)->orderBy('page_number')->get();
                $article->other_articles_ids = $ids->reduce(function($carry, $item){
                    $carry[] = $item->id;
                    return $carry;
                }, []);
            }
            return $article;
        });
    }

    public static function injectOtherArticlesIdList(Collection &$articles) : void {
        $articles = $articles->map(function($article){
            if(!empty($article)) {
                /** @var Collection $ids */
                $ids = Article::select('id')->where('issue_id', $article->issue_id)->orderBy('page_number')->get();
                $article->other_articles_ids = $ids->reduce(function($carry, $item){
                    $carry[] = $item->id;
                    return $carry;
                }, []);
            }
            return $article;
        });
    }

    public static function clearDefaultStyles(Collection &$articles) : void {
        $articles = $articles->map(function($article){
            if(!empty($article)) {
                $html = $article->html;
                if(!empty($html))
                    $html = preg_replace('/<style>.*?<\/style>/is', '', $html);
//                    $html = preg_replace('/class=".*?"/is', '', $html);

                $article->html = $html;
            }
            return $article;
        });
    }

    public static function injectIssueContentDate(Collection &$articles) : void {
        $articles = $articles->map(function($article){
            if(!empty($article)) {
                $article->content_date = $article->issue->content_date;
                unset($article->issue);
            }
            return $article;
        });
    }

    public static function injectTags(Collection &$articles) : void {
        $articles = $articles->map(function($article){
            $ar_tags = ArticlesTag::where('article_id', $article->id)->get();
            $tags = $ar_tags->map(function($ar_tag){
                return Tag::find($ar_tag->tag_id);
            });

            $article->tags = $tags;

            return $article;
        });
    }

    public static function injectComments(Collection &$articles) : void {
        $articles = $articles->map(function($article){
            $comments = Comment::where('article_id', $article->id)
                ->where('approved', true)
                ->orderByDesc('created_at')
                ->with(['user'])
                ->get();

            $article->comments = $comments;

            return $article;
        });
    }

    public static function injectNextArticle(Collection &$articles) : void {
        $articles = $articles->map(function($article){
            $next_article = Article::where('issue_id', $article->issue_id)->where('page_number', $article->page_number + 1)->first();

            if($next_article) {

                $collection = new Collection();
                $collection->push($next_article);

                self::injectWithImages($collection);

                $next_article = $collection->first();


                $next_article_obj = new \stdClass();
                if(!empty($next_article->image_path))
                    $next_article_obj->image_path = $next_article->image_path;
                if(!empty($next_article->title))
                    $next_article_obj->title = $next_article->title;
                $next_article_obj->page_number = $next_article->page_number;

            }else{
                $next_article_obj = null;
            }

            $article->next_article = $next_article_obj;

            return $article;
        });
    }

    public static function clearFromHtml(Collection &$articles) : void {
        $articles = $articles->map(function($article){
            unset($article->html);
            return $article;
        });
    }

    public static function clearFromDesktopHtml(Collection &$articles) : void {
        $articles = $articles->map(function($article){
            unset($article->desktop_html);
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

    public static function injectJournalImages(Collection &$articles) : void {
        $articles = $articles->map(function($article){
            if($article) {
                //breaking eager loading to remove needless data
                $issue = Issue::find($article->issue_id);
                $article->issue_image = $issue->image;
            }
            return $article;
        });
    }

    public static function injectJournalCovers(Collection &$articles) : void {
        $articles = $articles->map(function($article){
            //breaking eager loading to remove needless data
            $issue = Issue::find($article->issue_id);
            if($issue && $issue->image)
                $article->issue_cover = $issue->image->path;
            return $article;
        });
    }

    public static function injectDates(Collection &$articles) : void {
        $articles = $articles->map(function($article){
            if($article) {
                $issue = Issue::find($article->issue_id);
                if (!empty($issue->content_date)) {
                    $date = Carbon::parse($issue->content_date);
                    $date_str = SUtils::getRuMonth($date->getTimestamp()) . ' ' . $date->format('Y');
                    $article->date = $date_str;
                }
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
        preg_match_all('/<p>(.*?)<\/p>/is', $html, $matches);

        if(empty($matches))
            return false;

        $text_found = false;
        foreach ($matches[1] as $match)
            if(strlen($match) > 200)
                $text_found = true;
        if(!$text_found)
            return false;

        return true;
    }

}
