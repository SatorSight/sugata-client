<?php

namespace Tests\Feature;

use App\Lib\SUtils;
use Illuminate\Routing\RouteCollection;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Route;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;


class ApiRoutes200Test extends TestCase
{
    /**
     * @return void
     */
    public function testAllRoutesRespondsWith200(){
        $routes_array = [];
        /** @var RouteCollection $routeCollection */
        $routeCollection = Route::getRoutes();
        $routes = $routeCollection->getRoutes();

        /** @var \Illuminate\Routing\Route $route */
        foreach ($routes as $route){
            $uri = $route->uri;
            if(strpos($uri, 'api/') !== false &&
               strpos($uri, 'auth') === false){
                $routes_array[] = $uri;
            }
        }

        $routes_array = self::setParams($routes_array);
        foreach ($routes_array as $r){
            $url = self::assembleUrlForApi($r);
            $response = $this->get($url);
            $response->assertStatus(200);
        }
    }

    private static function assembleUrlForApi($uri){
        return Request::root(). DIRECTORY_SEPARATOR . $uri;
    }

    private static function setParams(array $routes) : array {
        foreach ($routes as $key => $route){
            if(strpos($route, '{from}') !== false)
                $routes[$key] = str_replace('{from}', 10, $route);
            $route = $routes[$key];

            if(strpos($route, '{bundle_id}') !== false)
                $routes[$key] = str_replace('{bundle_id}', 1, $route); //men

            if(strpos($route, '{journal_id}') !== false)
                $routes[$key] = str_replace('{journal_id}', 12, $route); //avtomir

            if(strpos($route, '{issue_id}') !== false)
                $routes[$key] = str_replace('{issue_id}', 985, $route); //avtomir
        }
        return $routes;
    }
}
