<?php

namespace App\Http\Controllers;

use App\Article;

class SearchController extends Controller
{
    public function search($query)
    {
        $items = Article::search($query);
        return response()->json($items);
    }
}