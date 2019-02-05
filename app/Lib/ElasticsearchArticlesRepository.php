<?php

namespace App\Lib;

use App\Article;
use Elasticsearch\Client;

class ElasticsearchArticlesRepository
{
    private $search;

    public function __construct(Client $client) {
        $this->search = $client;
    }

    public function search(string $query = "")
    {
        $items = $this->searchOnElasticsearch($query);

        return $this->buildCollection($items);
    }

    private function searchOnElasticsearch(string $query): array
    {
        $instance = new Article;

        $items = $this->search->search([
            'index' => $instance->getSearchIndex(),
            'type' => $instance->getSearchType(),
            'body' => [
                'query' => [
//                    'multi_match' => [
//                        'fields' => ['title^3', 'html'],
////                        'query' => [
////                            'match' => '*audi a*',
////                        ],
////                        'query' => "\"audi a\"",
////                        'query' => $query,
////                        'query' => [
////                            'bool' => [
////                                'term' => ['match' => 'audi a']
////                            ]
////                        ]
//                        'query' => $a
//                    ],
//                    'match' => [
//                        'title' => 'audi a'
//                    ]
//                    'bool' => [
//                        'must' => [
//                            'match' => [
//                                'title' => 'audi a'
//                            ]
//                        ]
//                    ]
                    'query_string' => [
                        'fields' => ['title^3', 'html'],
                        'query' => "\"$query\"",
                    ]
                ],

                "highlight" => [
                    "order" => "score",

                    "fields" => [
                        'html' => new \stdClass(),
                        'title' => new \stdClass(),
                    ],

                    "number_of_fragments" => 3,
                    "fragment_size" => 300,
                ]


            ],
        ]);

        return $items;
    }

    private function buildCollection(array $items)
    {
        $highlights = array_pluck($items['hits']['hits'], 'highlight') ?: [];
        $hits = array_pluck($items['hits']['hits'], '_source') ?: [];

        $new_items = [];

        foreach($highlights as $key => $highlight){
            $hit = $hits[$key];
            $item = [];

            if(!empty($highlight['title']))
                $item['title'] = is_array($highlight['title']) ? array_shift($highlight['title']) : $highlight['title'];
            else
                $item['title'] = is_array($hit['title']) ? array_shift($hit['title']) : $hit['title'];

            $cleaned_html = '';

            if(!empty($highlight['html'])) {
                foreach ($highlight['html'] as $h) {
                    $cleaned = Article::removeTags($h);
//                $cleaned_html .= '...' . ' ' . $cleaned;
                    $cleaned_html .= $cleaned;
                }


//            if(empty($cleaned_html)){
//                $cleaned_html = Article::removeTags(substr($hit['html'], 0, 300));
//            }

//            $cleaned_html .= ' ...';

                $item['html'] = $cleaned_html;
            }
            $item['id'] = $hit['id'];

            $new_items[] = $item;
        }

        return $new_items;

        /**
         * The data comes in a structure like this:
         *
         * [
         *      'hits' => [
         *          'hits' => [
         *              [ '_source' => 1 ],
         *              [ '_source' => 2 ],
         *          ]
         *      ]
         * ]
         *
         * And we only care about the _source of the documents.
         */

//        $sources = array_map(function ($source) {
            // The hydrate method will try to decode this
            // field but ES gives us an array already.
//            $source['tags'] = json_encode($source['tags']);
//            return $source;
//        }, $hits);

        // We have to convert the results array into Eloquent Models.
//        return Article::hydrate($sources);
    }
}
