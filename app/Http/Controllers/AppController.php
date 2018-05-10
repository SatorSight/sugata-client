<?php

namespace App\Http\Controllers;

use App\Bundle;
use App\Lib\AuthService;
use App\Lib\BundleProvider;
use App\Lib\SUtils;
use Illuminate\Http\Request;
use Illuminate\Routing\Route;

class AppController extends Controller
{
    public function index(Route $route)
    {
        $this->tryToAuthorizeByBridge($route);
        return view('spa');
    }

    public function getCurrentBundle(){

    }

    public function tryToAuthorizeByBridge(Route $route){
        if(!empty($_GET['bridge_token'])){
            $bridge_token = $_GET['bridge_token'];

            $bp = new BundleProvider($route);
            $bundle = $bp->getCurrentBundle();

            $as = new AuthService($bundle);
            $as->loadSubscriptionInfoByBridgeToken($bridge_token);
            if($as->userSubscribed()) {
                $as->createUser();
                $as->writeUserSessionAndCookies();
            }
        }
    }

}
