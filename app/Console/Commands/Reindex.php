<?php

namespace App\Console\Commands;

use App\Article;
use Elasticsearch\Client;
use Elasticsearch\ClientBuilder;
use Illuminate\Console\Command;

class Reindex extends Command
{
    protected $signature = 'search:reindex';

//    protected $name = "search:reindex";
    protected $description = "Indexes all articles to elasticsearch";
    private $search;

    public function __construct()
    {
        parent::__construct();

        $this->search = ClientBuilder::create()->setHosts(['localhost:9200'])->build();

    }

    public function handle()
    {
        $this->info('Indexing all articles. Might take a while...');

        foreach (Article::cursor() as $model)
        {
            $this->search->index([
                'index' => $model->getSearchIndex(),
                'type' => $model->getSearchType(),
                'id' => $model->id,
                'body' => $model->toSearchArray(),
            ]);

            // PHPUnit-style feedback
            $this->output->write('.');
        }

        $this->info("Done!");
    }
}
