<?php

namespace App;

use App\Http\Traits\HasLatest;
use App\Lib\SUtils;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasLatest;

    public function getImage(){
        return Image::where([
            'parent_type' => 'Article',
            'parent_id' => $this->id
        ])->first();
    }

    public static function getChosen(){
        $articles = self::getLatest(4);
        $articles = $articles->map(function($article){
            $article->image = $article->getImage() ?? '';
            return $article;
        });

        self::clearFromHtml($articles);
        return $articles;
    }

    public static function clearFromHtml(&$articles){
        $articles = $articles->map(function($article){
            unset($article->html);
            return $article;
        });
    }
}
