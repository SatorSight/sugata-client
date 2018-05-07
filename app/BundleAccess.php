<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BundleAccess extends Model
{
    public function operator(){
        return $this->belongsTo(Operator::class);
    }

    public function bundles(){
        return $this->belongsToMany(Bundle::class, 'bundle_accesses_bundles');
    }
}
