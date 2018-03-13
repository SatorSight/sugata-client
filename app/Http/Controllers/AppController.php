<?php

namespace App\Http\Controllers;

use App\Bundle;
use App\Lib\AuthService;
use App\Lib\SUtils;
use Illuminate\Http\Request;

class AppController extends Controller
{
    public function index()
    {
        $this->tryToAuthorizeByBridge();
        return view('spa');
    }

    public function tryToAuthorizeByBridge(){
        if(!empty($_GET['bridge_token'])){
            $bridge_token = $_GET['bridge_token'];

            //todo get actual bundle
            $bundle = Bundle::find(1);

            $as = new AuthService($bundle);
            $as->loadSubscriptionInfoByBridgeToken($bridge_token);
            if($as->userSubscribed())
                $as->writeUserSessionAndCookies();
        }


    }

}
