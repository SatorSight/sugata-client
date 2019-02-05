<?php

namespace App\Console\Commands;

use App\Article;
use App\Bundle;
use App\Lib\AuthService;
use App\Lib\ImageProxyService;
use App\Lib\SUtils;
use Illuminate\Console\Command;
use GuzzleHttp\Client;
use GuzzleHttp\Promise;


class test extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:test';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

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
     * Execute the console coammand.
     *
     * @return mixed
     */
    public function handle()
    {


        $items = Article::search('Suzuki');
        dd($items);
//        dd(get_class($items->first()));

//        $time1 = microtime(true);
//
//        $urls = [];
//        for($i = 0; $i < 100; $i++){
//            $urls[] = 'http://sugata.client/';
//        }
//
////        $url1 = 'http://sugata.client/';
////        $url2 = 'http://sugata.client/';
////        $url3 = 'http://sugata.client/';
//
//        $client = new Client();
//
//
//        foreach ($urls as $url){
//            $promises[] = $client->getAsync($url);
//        }



//        $response1 = $client->get($url1);
//        $response2 = $client->get($url2);
//        $response3 = $client->get($url3);
//        SUtils::dump_console($response1->getStatusCode());
//        SUtils::dump_console($response2->getStatusCode());
//        SUtils::dump_console($response3->getStatusCode());


//        foreach ($urls as $url){
//            $promises[] = $client->getAsync($url);
//        }
//
//
//        $results = Promise\settle($promises)->wait();
//
//        $promises[] = $client->getAsync($url1);
//        $promises[] = $client->getAsync($url2);
//        $promises[] = $client->getAsync($url3);
//        $results = Promise\settle($promises)->wait();





//        $promises[] = $client->get($url);
//






//        $image_path = 'public/images/test/o.jpg';
//        $new_image_path = 'public/images/test/o2.jpg';
//
//        $img = new \imagick($image_path);
//
////        $img->scaleImage(20, 0);
//
//        $img->setImageCompression(\imagick::COMPRESSION_JPEG);
//        $img->setImageCompressionQuality(20);
//
//        $img->writeImage($new_image_path);

//        SUtils::dump_console(file_exists($image_path));

//        $time2 = microtime(true);
//        $duration = $time2 - $time1;
//
//        $hours = (int)($duration/60/60);
//        $minutes = (int)($duration/60)-$hours*60;
//        $seconds = (int)$duration-$hours*60*60-$minutes*60;
//
//
//        SUtils::dump_console($seconds);
        SUtils::dump_console('Done');
        return 1;
    }
}
