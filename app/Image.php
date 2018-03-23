<?php

namespace App;

use App\Lib\ImageBasedClass;
use Illuminate\Database\Eloquent\Model;

class Image extends Model implements ImageBasedClass
{
    public function parent()
    {
        return $this->morphTo();
    }

    public function imageFileExists(){
        //todo implement
    	return true;
    }
}