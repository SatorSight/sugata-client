<?php

namespace App\Http\Traits;

use App\Http\Controllers\Helper;
use Illuminate\Database\Eloquent\Collection;

trait HasImage{
    public function image(){
        return $this->morphOne('App\Image', 'parent');
    }

    public static function injectWithImages(Collection &$items) : void {
        $items = $items->map(function($item){
            $image = $item->image;
            if(isset($image->path)) {
                $item->image_path = $image->path;
                unset($item->image);
                unset($item->image_id);
            }
            return $item;
        });
    }
}