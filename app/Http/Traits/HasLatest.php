<?php

namespace App\Http\Traits;

use App\Http\Controllers\Helper;
use App\Lib\SUtils;
use Illuminate\Database\Eloquent\Model;

trait HasLatest{
    public static function getLatest(int $limit){
        $collection = self::latest()->limit($limit)->get();
        return Helper::injectWithImages($collection);
    }

    public static function getLatestAfter(int $limit, int $after){
        $collection = self::where('id', '>', $after)->latest()->limit($limit)->get();
        return Helper::injectWithImages($collection);
    }
}