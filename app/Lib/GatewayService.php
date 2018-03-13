<?php

namespace App\Lib;

abstract class GatewayService{
    protected $realm_id;
    protected $secret;
    protected $master_url;

    public function __construct(){
        $this->realm_id = config('client.realm_id');
        $this->secret = config('client.secret');
        $this->master_url = config('client.master_url');
    }

    protected function getAuthUrlPostfix() : string {
        return $this->realm_id . '/' . $this->secret . '/';
    }

    protected function getSchemaDomainUrlPart() : string {
        return 'http://' . $this->master_url;
    }

    protected function read($url){
        $json = file_get_contents($url);
        $data = json_decode($json);
        return $data;
    }
}