<?php

namespace App\Console\Commands;

use App\Issue;
use App\Lib\MasterClassAdapter;
use App\Lib\MasterGateway;
use App\Lib\SUtils;
use Illuminate\Console\Command;

class CleanMissingObjects extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sugata:clean-missing-objects';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Receive full ids list, compare with own, delete excess';

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
        $all_ids = (array)MasterGateway::downloadAllIds();
        $classes = array_keys($all_ids);

        $own_classes = [];
        foreach ($classes as $class){
            $own_classes[] = MasterClassAdapter::masterToSlave($class);
        }

        $own_ids = [];
        foreach ($own_classes as $own_class){
            $klass = new $own_class;
            $own_ids[$own_class] = $klass::pluck('id')->toArray();
        }

        $excess_ids = [];

        foreach ($all_ids as $outer_class => $ids){
            $own_id_array_key = MasterClassAdapter::masterToSlave($outer_class);
            $own_id_array = $own_ids[$own_id_array_key];

            $excess = array_diff($own_id_array, $ids);
            $excess_ids[$own_id_array_key] = $excess;
        }

        foreach ($excess_ids as $inner_class => $inner_ids){
            $entity = new $inner_class;
            $entity::destroy($inner_ids);
        }

        SUtils::dump_console('Done');
        return 1;
    }
}
