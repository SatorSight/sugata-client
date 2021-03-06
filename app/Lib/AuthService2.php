<?php

namespace App\Lib;

use App\Bundle;
use App\BundleAccess;
use App\Operator;
use App\User;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Session;

class AuthService2 extends GatewayService {
    private $bundle;
    private $ip_checker_url;

    private const SESSION_USER_ID = 'SESSION_USER_ID';
    private const SESSION_USER_MSISDN = 'SESSION_USER_MSISDN';

    private const COOKIE_USER_ID = 'COOKIE_USER_ID';
    private const COOKIE_USER_MSISDN = 'COOKIE_USER_MSISDN';

    public function __construct(Bundle $bundle = null){
        parent::__construct();
        $this->bundle = $bundle;
        $this->ip_checker_url = config('client.ip_checker_url');
    }

    public function getUser(string $msisdn) : ?User {
        $user = null;

        /*
         $user_object = {
            msisdn: '123',
            operator: new Operator,
            bundle_accesses: [1,2,3]
         }
         * */

        //getting user data by msisdn from bridge, return [ null || stdClass ]
        $user_object = $this->getUserObjectFromMaster($msisdn);
        if($user_object){
            $user = $this->getRegisteredUser($user_object->msisdn);
            if(!$user)
                $user = $this->createUserWithObject($user_object);
            AuthService2::syncUserBundleAccesses($user, $user_object->bundle_accesses);
        }
        return $user;
    }

    public function getUserObjectFromMaster(string $msisdn) : ?\stdClass {
        return $this->askInfoByMsisdn($msisdn);
    }



    public function loadUserByMsisdn(string $msisdn) : void {
        $this->subscriptionInfo = $this->askInfoByMsisdn($msisdn);
        SUtils::trace($this->subscriptionInfo);
    }

    public function loadSubscriptionInfoByBridgeToken(string $bridge_token) : void{
        $this->subscriptionInfo = $this->askInfoByBridgeToken($bridge_token);
    }



    public function getMsisdn(){
        return $this->msisdn;
    }

    public function setMsisdn($msisdn){
        $this->msisdn = $msisdn;
    }





    public function getBundleAccessesByBridgeToken(string $bridge_token) : array {
        $resp = $this->askMasterForBundleAccessesWithBridge($bridge_token);

        if(!empty($resp->msisdn))
            $this->setMsisdn($resp->msisdn);

        return $resp->bundle_accesses_ids;
    }

    public function askMasterForBundleAccessesWithBridge(string $bridge_token) : \stdClass {
        $url = $this->getBridgeTokenInfoUrl($bridge_token);
        $response = $this->read($url);
        return $response;
    }



    public function askMasterForActions(){
        $url = $this->getAuthActionsUrl();
        $data = $this->read($url);
        return $data;
    }

    public function userSubscribed() : bool {
        return !!$this->subscriptionInfo->status;
    }

    public function getOperatorTech() : string {
        $ip = SUtils::get_client_ip();
        $api_route = $this->ip_checker_url . '/' . $ip;
        $resp = file_get_contents($api_route);
        $resp = json_decode($resp);
        return $resp->operator;
    }

    public function getOperator(){
        $tech_name = $this->getOperatorTech();
        $operator =  Operator::where('tech_name', $tech_name)->get()->first();
        return $operator;
    }

    public function createUser() : void {
        $msisdn = $this->userMsisdn();
        $operator_name = $this->subscriptionInfo->operator;
        $operator = Operator::where('tech_name', $operator_name)->first();

        $user = new User;
        $user->msisdn = $msisdn;
//        $user->email = '';
//        $user->login = '';
        $user->active = true;
        $user->operator_id = $operator->id;

        $bundle = $this->bundle ? $this->bundle->id : null;
        if($bundle)
            $bundle = Bundle::find($bundle);
        $bundle_access = self::findBundleAccess($operator, $bundle);

        if($bundle_access) {
            $user->save();
            $user->bundle_accesses()->attach($bundle_access->id);
        }
    }

    public static function findBundleAccess($operator, $bundle){
        $bundle_accesses = BundleAccess::all();

        $bundle_access_key = $bundle_accesses->search(function($b_a) use ($bundle, $operator){
            if($b_a->operator->id == $operator->id) {
                if (!$bundle || $b_a->bundles()->get()->contains($bundle))
                    return $b_a;
                else
                    return false;
            }else
                return false;
        });

        if($bundle_access_key !== false)
            $bundle_access = $bundle_accesses->get($bundle_access_key);
        else
            $bundle_access = null;

        return $bundle_access;
    }


    public function writeUserSessionAndCookies($user = null){
        if(!$user)
            $user = $this->getUser();
        Session::put(self::SESSION_USER_ID, $user->id);
        Session::put(self::SESSION_USER_MSISDN, $user->msisdn);

        Cookie::queue(Cookie::make(self::COOKIE_USER_ID, $user->id, SUtils::MAX_COOKIE_TIME));
        Cookie::queue(Cookie::make(self::COOKIE_USER_MSISDN, $user->msisdn, SUtils::MAX_COOKIE_TIME));
    }

    public static function destroyUserSessionAndCookies(){
        Session::put(self::SESSION_USER_ID, null);
        Session::put(self::SESSION_USER_MSISDN, null);

        Cookie::queue(Cookie::make(self::COOKIE_USER_ID, null, SUtils::MAX_COOKIE_TIME));
        Cookie::queue(Cookie::make(self::COOKIE_USER_MSISDN, null, SUtils::MAX_COOKIE_TIME));
    }


    public static function userAuthorized(){
        $session_user_id = Session::get(self::SESSION_USER_ID);
        $session_user_msisdn = Session::get(self::SESSION_USER_MSISDN);

        $cookie_user_id = Cookie::get(self::COOKIE_USER_ID);
        $cookie_user_msisdn = Cookie::get(self::COOKIE_USER_MSISDN);

        if(!empty($session_user_id) && !empty($session_user_msisdn))
            return true;
        if(!empty($cookie_user_id) && !empty($cookie_user_msisdn))
            return true;
        return false;
    }




    public static function getUserByMsisdn($msisdn){
        return User::where('msisdn', $msisdn)->first();
    }

    public static function getAuthorizedUser(){
        if(!self::userAuthorized())
            return null;

        $session_user_id = Session::get(self::SESSION_USER_ID);
        $cookie_user_id = Cookie::get(self::COOKIE_USER_ID);

        $user = null;

        if(!empty($session_user_id))
            $user = User::find($session_user_id);

        if(!$user && !empty($cookie_user_id))
            $user = User::find($cookie_user_id);

        return $user;
    }

    public static function syncUserBundleAccesses($user, $bundle_accesses_ids){
        $bundle_accesses = BundleAccess::whereIn('id', $bundle_accesses_ids)->get();
        $user->bundle_accesses()->detach();

        foreach ($bundle_accesses as $b_a)
            self::attachBundleAccesses($user, $b_a);
    }

    public function createUserWithObject(\stdClass $user_object) {
        $operator = $user_object->operator;
        $msisdn = $user_object->msisdn;

        $user = new User;
        $user->msisdn = $msisdn;
        $user->active = true;
        $user->operator_id = $operator->id;

        $user->save();
        return $user;
    }

    public function createUserWith($msisdn) {
        $operator = $this->getOperator();

        $user = new User;
        $user->msisdn = $msisdn;
        $user->active = true;
        $user->operator_id = $operator->id;

        $user->save();
        return $user;
    }

    public static function attachBundleAccesses(User $user, $bundle_access){
        $user->bundle_accesses()->attach($bundle_access->id);
    }






    private function getRegisteredUser(string $msisdn): User {
//        $msisdn = $this->userMsisdn();
        return  User::where('msisdn', $msisdn)->first();
    }

    public function setOperator(string $operator){
        $this->operator = $operator;
    }

    private function userMsisdn() : string {
        return $this->subscriptionInfo->userId;
    }

    public function userExists() : bool {
        $msisdn = $this->subscriptionInfo->userId;
        $user = User::where('msisdn', $msisdn)->first();
        return !!$user;
    }
//
//    private function getMsisdnFromInfo(\stdClass $info) : string {
//        return $info->userId;
//    }
//
//    private function userExistsInSession(Session $session){
////        $session->get('');
//    }

//    public function setSession($msisdn)


    private function askInfoByBridgeToken(string $bridge_token){
        $url = $this->getBridgeTokenInfoUrl($bridge_token);
        $data = $this->read($url);
        if(empty($data->status)) {
            if(empty($data))
                $data = new \stdClass();
            $data->status = 0;
        }
        return $data;
    }

    private function askInfoByMsisdn(string $msisdn){
        $url = $this->getMsisdnInfoUrl($msisdn);
        $data = $this->read($url);
        return $data;
//        if(!$data)
//            $data = new \stdClass();
//        if(empty($data->status))
//            $data->status = 0;
//        return $data;
    }

    private function getAuthActionsUrl() : string {
        $url = config('client.auth_actions_url');
        $url = join('/', [
            $this->getSchemaDomainUrlPart(),
            $url,
            ($this->bundle ? $this->bundle->id : 'null'),
            $this->getOperator()->id,
            $this->getAuthUrlPostfix()
        ]);
        return $url;
    }

    private function getBridgeTokenInfoUrl(string $bridge_token) : string {
        $url = config('client.bridge_token_info_url');
        return join('/', [
            $this->getSchemaDomainUrlPart(), //http://
            $url, // /something
            $bridge_token,
            ($this->bundle ? $this->bundle->id : 'null'),
            $this->getOperator()->id,
            $this->getAuthUrlPostfix() // realm_id + secret
        ]);
    }

    private function getMsisdnInfoUrl(string $msisdn) : string {
        $url = config('client.msisdn_info_url');
        return join('/', [
            $this->getSchemaDomainUrlPart(), //http://
            $url, // /something
            $msisdn,
            ($this->bundle ? $this->bundle->id : 'null'),
            $this->getOperator()->id,
            $this->getAuthUrlPostfix() // realm_id + secret
        ]);
    }
}