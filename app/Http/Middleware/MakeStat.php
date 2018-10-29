<?php

namespace App\Http\Middleware;

use App\Lib\MasterGateway;
use App\User;
use Closure;

class MakeStat
{
    /**
     * Send user_history data to master
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $uri = $request->getRequestUri();
        $msisdn = $request->cookies->get('COOKIE_USER_MSISDN');
        $params = explode('/', $uri);
        if(empty($params) || empty($msisdn))
            return $next($request);

        //remove empty
        $params = array_reduce($params, function($acc, $p){
            if($p)
                $acc[] = $p;
            return $acc;
        }, []);

        if(empty($params) || $params[0] == 'api')
            return $next($request);

        if(!empty($params[0]) && !empty($params[1]) && $params[0] == 'article'){
            $encrypter = app(\Illuminate\Contracts\Encryption\Encrypter::class);
            $msisdn = $encrypter->decrypt($msisdn);

            $user = User::where('msisdn', $msisdn)->first();
            $operator = $user->operator->id;

            self::sendStat($msisdn, $params[1], $operator);
        }

        return $next($request);
    }

    private static function sendStat($msisdn, $article_id, $operator){
        $url = MasterGateway::getUserHitUrl($msisdn, $article_id, $operator);

        //set timeout to 10ms for not waiting for response
        $client = new \GuzzleHttp\Client();
        try {
            $client->request('get', $url, ['timeout' => 0.01]);
        }catch(\Exception $e){}
    }
}
