<?php

namespace App\Http\Traits\ApiTraits;

use App\Article;
use App\Bundle;
use App\Http\Controllers\Helper;
use App\Issue;
use App\Journal;
use App\Lib\AuthService;
use App\Lib\ImageProxyService;
use App\Lib\MasterGateway;
use App\Lib\SUtils;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Cache;

trait PaymentRoutes
{
    /**
     * @desc payment page
     * @return \Illuminate\Http\JsonResponse
     */
    public function payment($bundle_id){
        //get products for bundle
        $products_url = MasterGateway::getProductsUrl($bundle_id);
        $result = file_get_contents($products_url);
        $result = json_decode($result);

        return response()->json($result);
    }

    /**
     * @desc all bundles
     * @return \Illuminate\Http\JsonResponse
     */
    public function paymentGetBundles(){
        $bundles = Cache::remember('bundles', $this->bundle_expiration, function(){
            $bundles = Bundle::orderBy('order', 'ASC')->get();
            Bundle::injectJournalNames($bundles);
            Bundle::injectIssuesCovers($bundles);
            Bundle::injectWithImages($bundles);
            return $bundles;
        });

        return response()->json($bundles);
    }
}