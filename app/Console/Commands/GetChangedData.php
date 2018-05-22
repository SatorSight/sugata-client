<?php

namespace App\Console\Commands;

use App\Lib\ImageBasedClass;
use App\Lib\MasterClassAdapter;
use App\Lib\MasterGateway;
use App\Lib\SUtils;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Schema;

use App\Article;
use App\Bundle;
use App\Comment;
use App\Image;
use App\Issue;
use App\Journal;
use App\Like;
use App\Listing;
use App\Locale;
use App\Operator;
use App\Period;
use App\Setting;
use App\User;
use App\UserData;
use App\UserHistory;


class GetChangedData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sugata:get-changed-data';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Download changed data from platform and sync';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        ini_set('default_socket_timeout', 900);

        //todo rewrite some day
        $image_ids = [];
        $entities = MasterGateway::downloadChangedData();

        foreach($entities as $master_class => $objects_array){
            if(!empty($objects_array)){
                foreach($objects_array as $object){

                    if(isset($object->id))
                        $existing_object = MasterClassAdapter::masterToSlave($master_class)::find($object->id);
                    else{
                        $object_data = (array)$object;
                        $criteria = [];
                        foreach ($object_data as $key => $value){
                            $criteria[] = [$key, '=', $value];
                        }
                        $existing_object = MasterClassAdapter::masterToSlave($master_class)::where($criteria)->first();
                    }

                    if($existing_object){
                        $arrayed_object = (array)$object;
                        foreach ($arrayed_object as $field => $value){
                            $klass = MasterClassAdapter::masterToSlave($master_class);
                            if(Schema::hasColumn($existing_object->getTable(), $field)){
                                if($field != 'updated_at' && $field != 'created_at') {
                                    if(strpos($field, 'date') !== false){
                                        $value = new \DateTime($value);
                                    }
                                    if ($existing_object->$field != $value) {
                                        $existing_object->$field = $value;
                                        if (new $klass instanceof ImageBasedClass) {
                                            if (!empty($arrayed_object['parent_id'])) {
                                                if ($field == 'id')
                                                    $image_ids[] = $value;
                                            } else {
                                                continue;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        try {
                            $existing_object->save();
                        }catch(\Exception $e){}
                    }else{
                        $arrayed_object = (array)$object;
                        $klass = MasterClassAdapter::masterToSlave($master_class);
                        $obj = new $klass;

                        if($obj instanceof ImageBasedClass)
                            if(Schema::hasColumn($obj->getTable(), 'parent_id')) {
                                if(!empty($arrayed_object['parent_id']))
                                    $klass::where('parent_id', $arrayed_object['parent_id'])->delete();
                            }else
                                continue;

                        foreach ($arrayed_object as $field => $value){
                            if(Schema::hasColumn($obj->getTable(), $field)){
                                if($field != 'updated_at' && $field != 'created_at') {
                                    if(strpos($field, 'date') !== false)
                                        $value = new \DateTime($value);
                                    $obj->$field = $value;
                                    if ($obj instanceof ImageBasedClass) {
                                        if ($field == 'id')
                                            $image_ids[] = $value;
                                    }
                                }
                            }
                        }
                        try {
                            $obj->save();
                        }catch(\Exception $e){}
                    }
                }
            }
        }

        SUtils::dump_console('Objects transmission done');

        if(!empty($image_ids))
            MasterGateway::downloadImagesArray($image_ids);

        SUtils::dump_console('Images transmission done');
        SUtils::dump_console('All done');
        return true;
    }
}
