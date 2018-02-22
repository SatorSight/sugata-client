<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AdditionalImage extends Model
{
    public function parent()
    {
        return $this->morphTo();
    }

    public function imageFileExists(){
        return true;
    }
}