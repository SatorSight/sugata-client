<?php

namespace App\Console\Commands;

use App\Article;
use App\Lib\SUtils;
use Illuminate\Console\Command;

class FillTitles extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sugata:fill-titles';

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
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $articles = Article::where('title', '')->limit(100)->get();

        $pattern = '/<h1>(.*?)<\/h1>/is';
        $articles->each(function($article) use ($pattern) {
            if(!empty($article->html)){
                $html = $article->html;
                preg_match_all($pattern, $html, $matches);

                SUtils::dump_console($matches);

            }
        });

        SUtils::dump_console($articles->count());


        return 1;
    }
}
