<?php

namespace App\Http\Traits\ApiTraits;

use App\Bundle;
use App\Lib\AuthService;
use App\Lib\SUtils;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Session;

trait AuthRoutes{

    public function checkMsisdn($data){
        $decoded = json_decode($data);

        $msisdn = $decoded->data->msisdn;
        $msisdn = SUtils::normalizeTel($msisdn);

        $bundle_id = $decoded->data->bundle_id;
        $bundle = Bundle::find($bundle_id);

        $as = new AuthService($bundle);
        $as->loadSubscriptionInfoByMsisdn($msisdn);

        if($as->userSubscribed()){
            if($as->userExists()){
                $as->writeUserSessionAndCookies();
                return response()->json(['result' => 'ok']);
            }else{
                $as->createUser();
                $as->writeUserSessionAndCookies();
                return response()->json(['result' => 'ok']);
            }
        }else{
            $operator = $as->getOperatorTech();
            $as->setOperator($operator);
            $actions = $as->askMasterForActions();

            if(!empty($actions)){
                if(isset($actions->action_type) && $actions->action_type == 'redirect'){
                    return response()->json([
                        'result' => $actions->action_type,
                        'to' => $actions->link,
                        'message' => 'redirect_required'
                    ]);
                }
            }

            //todo ip checkup and redirect
            return response()->json(['result' => 'fail', 'message' => 'not_subscribed']);
        }
    }

    public function userAuthorized(){
        $res = AuthService::userAuthorized() ? 'ok' : 'fail';
        return response()->json(['result' => $res]);
    }

    public function loadAuthData(){
        $user_msisdn = Cookie::get('COOKIE_USER_MSISDN');
        $users = User::where('msisdn', $user_msisdn)->get();

        /** @var Collection $user_bundles */
        $user_bundles = $users
            ->map(function($u){
                return $u->bundle->id;
            })
        ;

        $as = new AuthService(Bundle::first());
        $operator = $as->getOperator();

        $resp = new \stdClass();
        $resp->operator = $operator;
        $resp->user_bundles = $user_bundles->isEmpty() ? [] : $user_bundles->toArray();

        return response()->json($resp);
    }

//    public function getSubLink($bundle_id){
//        $bundle = Bundle::find($bundle_id);
//        $auth_service = new AuthService($bundle);
//        $operator = $auth_service->getOperator();

//        if($operator->tech_name === 'unknown')
//            return false;
//
//        $bundle_accesses = $operator->get

//        $operator = AuthService::getOperator();



//    }
}