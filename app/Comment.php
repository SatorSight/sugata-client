<?php

namespace App;

use App\Lib\MasterGateway;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    public function user(){
        return $this->belongsTo('App\User');
    }

    public function article(){
        return $this->belongsTo('App\Article');
    }

    public static function send($msisdn, $article_id, $content){
        if($msisdn && $article_id && $content){
            $url = MasterGateway::addComment();
            $client = new \GuzzleHttp\Client();
            try {
                $client->post(
                    $url,
                    [
                        \GuzzleHttp\RequestOptions::JSON =>
                            [
                                'msisdn' => $msisdn,
                                'article_id' => $article_id,
                                'content' => $content,
                            ],
                        'timeout' => 0.01
                    ]
                );
            }catch(\Exception $e){}
        }
    }
}
