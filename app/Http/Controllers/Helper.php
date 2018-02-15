<?php

namespace App\Http\Controllers;

use App\Lib\SUtils;
use Illuminate\Database\Eloquent\Collection;

class Helper{
    public static function injectImagePath($object){
        if(isset($object->image)){
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

    public static function removeFieldFromCollection(Collection &$collection, $field_name) : void {
        $collection = $collection->map(function($object) use ($field_name){
            if(isset($object->$field_name))
                unset($object->$field_name);
            return $object;
        });
    }
}