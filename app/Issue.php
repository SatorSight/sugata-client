<?php

namespace App;

use App\Http\Traits\HasImage;
use App\Http\Traits\HasLatest;
use Illuminate\Database\Eloquent\Model;

class Issue extends Model
{
    use HasImage;
    use HasLatest;

    public function journal(){
        return $this->belongsTo('App\Journal');
    }

    public function articles(){
        return $this->hasMany('App\Article');
    }
}
