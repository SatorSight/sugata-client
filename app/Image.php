<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    public function parent()
    {
        return $this->morphTo();
    }
}