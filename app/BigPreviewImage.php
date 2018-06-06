<?php

namespace App;

use App\Lib\ImageBasedClass;
use Illuminate\Database\Eloquent\Model;

class BigPreviewImage extends Model implements ImageBasedClass
{
    public function parent()
    {
        return $this->morphTo();
    }

    public function imageFileExists(){
        return true;
    }
}