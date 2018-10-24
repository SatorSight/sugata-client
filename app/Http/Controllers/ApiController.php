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
use App\Http\Traits\ApiTraits\TagRoutes;
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
    private $hubs_expiration;
    private $issues_expiration;
    private $article_expiration;
    private $articles_list_expiration;
    private $journals_expiration;
    private $listing_expiration;
    private $tag_expiration;

    public function __construct(){
        //todo unleash power of redis on release
        $this->expiration = now()->addMinutes(120);


        $this->bundle_expiration = now()->addMinutes(SUtils::TIME_INTERVAL_ARRAY_MINUTES['year']);
        $this->hubs_expiration = now();
        $this->issues_expiration = now()->addMinutes(SUtils::TIME_INTERVAL_ARRAY_MINUTES['day']);
        $this->journals_expiration = now()->addMinutes(SUtils::TIME_INTERVAL_ARRAY_MINUTES['month']);
        $this->article_expiration = now()->addMinutes(SUtils::TIME_INTERVAL_ARRAY_MINUTES['year']);
        $this->articles_list_expiration = now()->addMinutes(SUtils::TIME_INTERVAL_ARRAY_MINUTES['day']);
        $this->listing_expiration = now()->addMinutes(SUtils::TIME_INTERVAL_ARRAY_MINUTES['year']);
        $this->tag_expiration = now()->addMinutes(SUtils::TIME_INTERVAL_ARRAY_MINUTES['day']);
    }

    use AuthRoutes;
    use IndexRoutes;
    use JournalRoutes;
    use IssueRoutes;
    use BundleRoutes;
    use ArticleRoutes;
    use AllIssuesRoutes;
    use TagRoutes;

//    public function test(){
//
//        $image_path = public_path() . '/images/test/o.jpg';
//        $new_image_path = public_path() . '/images/test/o2.jpg';
//
//        $img = new \imagick($image_path);
//        $img->setImageCompression(\imagick::COMPRESSION_JPEG);
//        $img->setImageCompressionQuality(2);
//
//        $img->writeImage($new_image_path);
//
//        return 'done';
//    }

}