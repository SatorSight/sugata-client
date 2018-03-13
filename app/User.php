<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    public function bundle() {
        return $this->belongsTo('App\Bundle');
    }

    public function operator() {
        return $this->belongsTo('App\Operator');
    }
}
