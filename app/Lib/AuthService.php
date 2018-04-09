<?php

namespace App\Lib;

use App\Bundle;
use App\Operator;
use App\User;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Session;

class AuthService extends GatewayService {
    private $subscriptionInfo;
    private $bundle;

    private const SESSION_USER_ID = 'SESSION_USER_ID';
    private const SESSION_USER_MSISDN = 'SESSION_USER_MSISDN';

    private const COOKIE_USER_ID = 'COOKIE_USER_ID';
    private const COOKIE_USER_MSISDN = 'COOKIE_USER_MSISDN';

    private $ip_checker_url;
    private $operator;

    public function __construct(Bundle $bundle){
        parent::__construct();
        $this->ip_checker_url = config('client.ip_checker_url');
        $this->bundle = $bundle;
    }

    public function loadSubscriptionInfoByMsisdn(string $msisdn) : void{
        $this->subscriptionInfo = $this->askInfoByMsisdn($msisdn);
    }

    public function loadSubscriptionInfoByBridgeToken(string $bridge_token) : void{
        $this->subscriptionInfo = $this->askInfoByBridgeToken($bridge_token);
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
        $user->bundle_id = $this->bundle->id;
        $user->save();
    }

    public function writeUserSessionAndCookies(){
        $user = $this->getUser();
        Session::put(self::SESSION_USER_ID, $user->id);
        Session::put(self::SESSION_USER_MSISDN, $user->msisdn);

        Cookie::queue(Cookie::make(self::COOKIE_USER_ID, $user->id, SUtils::MAX_COOKIE_TIME));
        Cookie::queue(Cookie::make(self::COOKIE_USER_MSISDN, $user->msisdn, SUtils::MAX_COOKIE_TIME));
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

    private function getUser(): User {
        $msisdn = $this->userMsisdn();
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
        if(empty($data->status))
            $data->status = 0;
        return $data;
    }

    private function askInfoByMsisdn(string $msisdn){
        $url = $this->getMsisdnInfoUrl($msisdn);
        $data = $this->read($url);
        if(empty($data->status))
            $data->status = 0;
        return $data;
    }

    private function getAuthActionsUrl() : string {
        $url = config('client.auth_actions_url');
        $url = join('/', [
            $this->getSchemaDomainUrlPart(),
            $url,
            $this->bundle->id,
            $this->operator,
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
            $this->bundle->id,
            $this->getAuthUrlPostfix() // realm_id + secret
        ]);
    }

    private function getMsisdnInfoUrl(string $msisdn) : string {
        $url = config('client.msisdn_info_url');
        return join('/', [
            $this->getSchemaDomainUrlPart(), //http://
            $url, // /something
            $msisdn,
            $this->bundle->id,
            $this->getAuthUrlPostfix() // realm_id + secret
        ]);
    }
}