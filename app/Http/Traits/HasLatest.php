<?php

namespace App\Http\Traits;

use App\Http\Controllers\Helper;
use App\Lib\SUtils;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

trait HasLatest{
    //todo move title check somewhere
    public static function getLatest(int $limit) : Collection{
        $collection = self::latest()->limit($limit)->get();
        return Helper::injectWithImages($collection);
    }

    public static function getLatestNonEmpty(int $limit, string $notEmptyField) : Collection{
        $collection = self::latest()->where($notEmptyField, '!=', '')->limit($limit)->get();
        return Helper::injectWithImages($collection);
    }

    public static function getLatestAfter(int $limit, int $after){
        $collection = self::where('id', '>', $after)->latest()->limit($limit)->get();
        return Helper::injectWithImages($collection);
    }

    public static function getLatestNonEmptyAfter(int $limit, int $after, string $notEmptyField){
        $collection = self::where('id', '>', $after)->where($notEmptyField, '!=', '')->latest()->limit($limit)->get();
        return Helper::injectWithImages($collection);
    }
}