<?php

namespace App\Http\Traits\ApiTraits;

use App\Bundle;
use App\Lib\AuthService;
use App\Lib\SUtils;

trait AuthRoutes{

    public function checkMsisdn($data){
        $decoded = json_decode($data);
        $msisdn = $decoded->data;
        $msisdn = SUtils::normalizeTel($msisdn);

        //todo get actual bundle
        $bundle = Bundle::first();

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
}