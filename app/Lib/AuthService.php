<?php

namespace App\Lib;

use App\Bundle;
use App\BundleAccess;
use App\Operator;
use App\User;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Session;

class AuthService extends GatewayService {

    const BACKDOOR_MSISDN = ['+79999999999'];

    private $bundle;
    private $ip_checker_url;

    private const SESSION_USER_ID = 'SESSION_USER_ID';
    private const SESSION_USER_FIELD = 'SESSION_USER_FIELD';

    private const COOKIE_USER_ID = 'COOKIE_USER_ID';
    private const COOKIE_USER_FIELD = 'COOKIE_USER_FIELD';

    public function __construct(Bundle $bundle = null){
        parent::__construct();
        $this->bundle = $bundle;
        $this->ip_checker_url = config('client.ip_checker_url');
    }

    public function getUser(string $field) : ?User {
        $user = null;

        /*
         $user_object = {
            field: '123',
            operator: 1,
            bundle_accesses: [1,2,3]
         }
         */

        //getting user data by msisdn from bridge, return [ null || stdClass ]
        $user_object = $this->getUserObjectFromMaster($field);

        if($user_object){
            $user = $this->getRegisteredUser($user_object->field);
            if(!$user)
                $user = $this->createUserWithObject($user_object);
            AuthService::syncUserBundleAccesses($user, $user_object->bundle_accesses);
        }
        return $user;
    }

    public function getUserObjectFromMaster(string $field) : ?\stdClass {
        return $this->askInfoByField($field);
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

    public function writeUserSessionAndCookies($user){
        $field = $user->msisdn ? $user->msisdn : $user->email;

        Session::put(self::SESSION_USER_ID, $user->id);
        Session::put(self::SESSION_USER_FIELD, $field);

        Cookie::queue(Cookie::make(self::COOKIE_USER_ID, $user->id, SUtils::MAX_COOKIE_TIME));
        Cookie::queue(Cookie::make(self::COOKIE_USER_FIELD, $field, SUtils::MAX_COOKIE_TIME));
    }

    public static function destroyUserSessionAndCookies(){
        Session::put(self::SESSION_USER_ID, null);
        Session::put(self::SESSION_USER_FIELD, null);

        Cookie::queue(Cookie::make(self::COOKIE_USER_ID, null, SUtils::MAX_COOKIE_TIME));
        Cookie::queue(Cookie::make(self::COOKIE_USER_FIELD, null, SUtils::MAX_COOKIE_TIME));
    }


    public static function userAuthorized(){
        $session_user_id = Session::get(self::SESSION_USER_ID);
        $SESSION_USER_FIELD = Session::get(self::SESSION_USER_FIELD);

        $cookie_user_id = Cookie::get(self::COOKIE_USER_ID);
        $COOKIE_USER_FIELD = Cookie::get(self::COOKIE_USER_FIELD);

        if(!empty($session_user_id) && !empty($SESSION_USER_FIELD))
            return true;
        if(!empty($cookie_user_id) && !empty($COOKIE_USER_FIELD))
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
        $field = $user_object->field;

        $user = new User;

        $f = SUtils::isPhone($field) ? 'msisdn' : 'email';

        $user->$f = $field;
        $user->active = true;
        if($operator)
            $user->operator_id = $operator->id;
        else
            $user->operator_id = Operator::getUnknown()->id;

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

    private function getRegisteredUser(string $field): ?User {
        $f = SUtils::isPhone($field) ? 'msisdn' : 'email';
        return User::where($f, $field)->first();
    }

    public function setOperator(string $operator){
        $this->operator = $operator;
    }

    private function askInfoByField(string $field){
        $field = urlencode($field);
        $field = str_replace('.', '%2E', $field);
        $field = str_replace('-', '%2D', $field);

        $url = $this->getFieldInfoUrl($field);

        return $this->read($url);
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

    private function getFieldInfoUrl(string $field) : string {
        $url = config('client.field_info_url');
        return join('/', [
            $this->getSchemaDomainUrlPart(), //http://
            $url, // /something
            $field,
            ($this->bundle ? $this->bundle->id : 'null'),
            $this->getOperator()->id,
            $this->getAuthUrlPostfix() // realm_id + secret
        ]);
    }
}