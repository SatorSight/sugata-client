<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\Collection;

class Helper{
    public static function injectImagePath($object){
        if(!empty($object->image)){
            $object->image_path = $object->image->path;
            unset($object->image);
//            $object->image_path = $path ?? '';
        }
        return $object;
    }

    public static function removeImageObjectReference(&$object){
        if(!empty($object->image))
            unset($object->image);
    }

    public static function injectWithImages(Collection $collection) : Collection{
        return $collection->map(function($obj){
            return Helper::injectImagePath($obj);
        });
    }
}