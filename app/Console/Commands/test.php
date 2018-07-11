<?php

namespace App\Console\Commands;

use App\Article;
use App\Bundle;
use App\Lib\AuthService;
use App\Lib\ImageProxyService;
use App\Lib\SUtils;
use Illuminate\Console\Command;

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

        $image_path = 'public/images/test/o.jpg';
        $new_image_path = 'public/images/test/o2.jpg';

        $img = new \imagick($image_path);

//        $img->scaleImage(20, 0);

        $img->setImageCompression(\imagick::COMPRESSION_JPEG);
        $img->setImageCompressionQuality(20);

        $img->writeImage($new_image_path);

//        SUtils::dump_console(file_exists($image_path));



        SUtils::dump_console('Done');
        return 1;
    }
}
