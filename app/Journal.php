<?php

namespace App;

use App\Http\Traits\HasImage;
use App\Http\Traits\ImageInjector;
use App\Lib\SUtils;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

class Journal extends Model
{
    use HasImage;
    use ImageInjector;

    public function issues(){
        return $this->hasMany('App\Issue');
    }

    public function logo(){
        return $this->morphOne('App\Logo', 'parent');
    }

    public function bundle(){
        return $this->belongsTo('App\Bundle');
    }

    public function additional_image(){
        return $this->morphOne('App\AdditionalImage', 'parent');
    }

    public static function injectWithLogo(Collection &$journals) : void {
        $journals = $journals->map(function($journal){
            if(!empty($journal->logo))
                $journal->logo_path = $journal->logo->path;
            unset($journal->logo);
            return $journal;
        });
    }

    public static function injectWithIssuesCount(Collection &$journals) : void {
        $journals = $journals->map(function($journal){
            $journal->issues_count = $journal->issues->count();
            unset($journal->issues);
            return $journal;
        });
    }

    public static function injectWithAdditionalImages(Collection &$journals) : void {
        $journals = $journals->map(function($journal){
            if(!empty($journal->additional_image))
                $journal->additional_image_path = $journal->additional_image->path;
            unset($journal->additional_image);
            return $journal;
        });
    }

    public static function injectWithImages(Collection &$journals) : void {
        $journals = $journals->map(function($journal){
            if(!empty($journal->image))
                $journal->image_path = $journal->image->path;
            unset($journal->image);
            return $journal;
        });
    }

    public static function injectWithBundle(Collection &$journals) : void {
        $journals = $journals->map(function($journal){
            $journal->bundle;
            return $journal;
        });
    }

    public function getLastIssue() : Issue {
        return $this->issues()->get()->last();
    }

    public function getLastIssues($limit = 4){
        return $this->issues->take($limit);
    }

    public function getLastCoverArticles($limit = 4){
        $last_issues = $this->getLastIssues($limit);
        $cover_articles = Issue::getCoverArticles($last_issues);
        return $cover_articles;
    }

}