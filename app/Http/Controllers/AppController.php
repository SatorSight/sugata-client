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

    public function tryToAuthorizeByBridge(Route $route){
        if(!empty($_GET['bridge_token'])){
            $bridge_token = $_GET['bridge_token'];

            $bp = new BundleProvider($route);
            $bundle = $bp->getCurrentBundle();

            $as = new AuthService($bundle);

            $bundle_accesses = $as->getBundleAccessesByBridgeToken($bridge_token);

            if(empty($bundle_accesses))
                return false;

            $msisdn = $as->getMsisdn();
            $user = null;

            if(AuthService::userAuthorized()){
                $user = AuthService::getAuthorizedUser();
            }else{
                $user = $as->getUserByMsisdn($msisdn);
            }

            if(!$user){
                $user = $as->createUserWith($msisdn);
            }

            if(!$user)
                return false;

            AuthService::syncUserBundleAccesses($user, $bundle_accesses);
            $as->writeUserSessionAndCookies($user);
        }
        return true;
    }

}
