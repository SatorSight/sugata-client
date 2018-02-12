<?php

namespace App\Http\Traits;

use App\Http\Controllers\Helper;
use App\Lib\SUtils;
use Illuminate\Database\Eloquent\Model;

trait ImageInjector{
    public static function all($columns = ['*']){
        return parent::all($columns)->map(function($obj){
            return Helper::injectImagePath($obj);
        });
    }
}