<?php

namespace App;

use App\Http\Traits\HasImage;
use App\Http\Traits\ImageInjector;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class Bundle extends Model
{
    use HasImage;
    use ImageInjector;

    public function journals(){
        return $this->hasMany('App\Journal');
    }

    public static function boot(){
        parent::boot();
        static::deleting(function($bundle){
            foreach ($bundle->journals()->get() as $journal)
                $journal->delete();
        });
    }

    public static function injectJournalNames(Collection &$bundles){
        $bundles->transform(function($bundle){
            $journals = $bundle->journals;
            $journal_names = $journals->map(function($j){ return $j->name; });
            $bundle->journal_names = $journal_names;
            unset($bundle->journals);
            return $bundle;
        });
    }

}