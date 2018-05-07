<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{

    public function bundle_accesses() {
        return $this->belongsToMany(BundleAccess::class, 'users_bundle_accesses');
    }

    public function operator() {
        return $this->belongsTo('App\Operator');
    }
}
