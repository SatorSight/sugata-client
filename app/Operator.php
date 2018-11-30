<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Operator extends Model
{
    public static function getUnknown(){
        return self::find(4);
    }
}
