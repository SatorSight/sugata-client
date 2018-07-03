<?php

namespace App\Http\Controllers;

use App\Article;
use App\Bundle;
use App\Http\Traits\ApiTraits\AllIssuesRoutes;
use App\Http\Traits\ApiTraits\ArticleRoutes;
use App\Http\Traits\ApiTraits\AuthRoutes;
use App\Http\Traits\ApiTraits\BundleRoutes;
use App\Http\Traits\ApiTraits\IndexRoutes;
use App\Http\Traits\ApiTraits\IssueRoutes;
use App\Http\Traits\ApiTraits\JournalRoutes;
use App\Issue;
use App\Journal;
use App\Lib\AuthService;
use App\Lib\SUtils;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class ApiController extends Controller
{
    private $expiration;
    private $bundle_expiration;
    private $issues_expiration;
    private $article_expiration;
    private $articles_list_expiration;
    private $journals_expiration;
    private $listing_expiration;

    public function __construct(){
        //todo unleash power of redis on release
        $this->expiration = now()->addMinutes(120);


        $this->bundle_expiration = now()->addMinutes(SUtils::TIME_INTERVAL_ARRAY_MINUTES['year']);
        $this->issues_expiration = now()->addMinutes(SUtils::TIME_INTERVAL_ARRAY_MINUTES['day']);
        $this->journals_expiration = now()->addMinutes(SUtils::TIME_INTERVAL_ARRAY_MINUTES['month']);
        $this->article_expiration = now()->addMinutes(SUtils::TIME_INTERVAL_ARRAY_MINUTES['year']);
        $this->articles_list_expiration = now()->addMinutes(SUtils::TIME_INTERVAL_ARRAY_MINUTES['day']);
        $this->listing_expiration = now()->addMinutes(SUtils::TIME_INTERVAL_ARRAY_MINUTES['year']);
    }

    use AuthRoutes;
    use IndexRoutes;
    use JournalRoutes;
    use IssueRoutes;
    use BundleRoutes;
    use ArticleRoutes;
    use AllIssuesRoutes;
}