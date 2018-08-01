<?php

namespace App\Http\Controllers;

use App\Bundle;
use App\Lib\AuthService;
use App\Lib\BundleProvider;
use App\Lib\SUtils;
use Illuminate\Http\Request;
use Illuminate\Routing\Route;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Session;

class AppController extends Controller
{
    public function index(Route $route, Request $request)
    {
        $this->tryToAuthorizeByBridge($route);
        $this->processFirstFlow($request);
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

    public function processFirstFlow(Request $request){
        $flow = $request->get('flow');
        $sub_url = $request->get('sub_url');
        if($flow == 1 && !empty($sub_url)){
            Session::put('first_flow', true);
            Session::put('sub_url', $sub_url);

            $all_params = $request->all();
            $data = [];
            foreach ($all_params as $key => $value)
                $data[$key] = $value;
            Session::put('initial_params', $data);
        }
    }
}
