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

    public static function injectWithLogo(Collection &$journals) : void {
        $journals = $journals->map(function($journal){
            if(!empty($journal->logo))
                $journal->logo_path = $journal->logo->path;
            unset($journal->logo);
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

}