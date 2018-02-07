<?php

namespace App\Console\Commands;

use App\Lib\MasterGateway;
use App\Lib\SUtils;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Config;

class UploadMasterData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sugata:upload-json-data';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Uploading json data containing everything';

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
        $mg = new MasterGateway();

        $mg->downloadImages();



        die;


        $mg->dropAllData();

        $json_data_url = MasterGateway::getMasterJsonDataUrl();
        $json = file_get_contents($json_data_url);
        $json = json_decode($json);

        $mg->downloadAndSaveOperators($json->operators);
        $mg->downloadAndSaveSettings($json->settings);
        $mg->downloadAndSaveLocales($json->locale);
        $mg->downloadAndSaveUsers($json->users);
        $mg->downloadAndSaveUserData($json->user_data);
        $mg->downloadAndSaveUserHistories($json->user_history);
        $mg->downloadAndSavePeriods($json->periods);
        $mg->downloadAndSaveBundles($json->bundles);
        $mg->downloadAndSaveJournals($json->journals);
        $mg->downloadAndSaveIssues($json->issues);
        $mg->downloadAndSaveArticles($json->articles);
        $mg->downloadAndSaveListings($json->listings);
        $mg->downloadAndSaveLikes($json->likes);
        $mg->downloadAndSaveComments($json->comments);

        $mg->saveImages($json->images);

        die;


//        MasterGateway::downloadAndSaveBundles($json->bundles);
//        MasterGateway::downloadAndSaveJournals($json->journals);
//        die;
//
//
//        SUtils::dump_console($json->journals);
//        die;

    }
}