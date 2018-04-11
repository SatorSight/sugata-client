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
        $articles = Article::find([39595, 39548]);

        Article::injectWithImages($articles);

        ImageProxyService::resize($articles, 'image_path', ImageProxyService::ARTICLE_PREVIEW_200);

//        foreach ($articles as $article){
//            SUtils::dump_console($article->image_path);
//        }

        foreach ($articles as $article){
            SUtils::dump($article->image_path);
        }




        SUtils::dump_console('Done');
        return 1;
    }
}
