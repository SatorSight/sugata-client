<?php

namespace App\Http\Traits;

use App\Http\Controllers\Helper;

trait HasImage{
    public function image(){
        return $this->morphOne('App\Image', 'parent');
    }
}