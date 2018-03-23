<?php

namespace App\Console\Commands;

use App\Article;
use App\Lib\SUtils;
use Illuminate\Console\Command;

class FillShowInListsFlag extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sugata:fill-show-in-lists';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sets show-in-lists flag for all articles, depending on article content/images';

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
        foreach (Article::all() as $article) {
            if ($article->isArticleCorrect())
                $article->show_in_lists = true;
            else
                $article->show_in_lists = false;

            $article->save();
        }

        return 1;
    }
}