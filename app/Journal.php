<?php

namespace App;

use App\Http\Traits\HasImage;
use App\Http\Traits\ImageInjector;
use Illuminate\Database\Eloquent\Model;

class Journal extends Model
{
    use HasImage;
    use ImageInjector;

    public function issues(){
        return $this->hasMany('App\Issue');
    }

}