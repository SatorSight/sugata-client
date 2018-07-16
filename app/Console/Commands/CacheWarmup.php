<?php

namespace App\Console\Commands;

use App\Article;
use App\Lib\SUtils;
use Illuminate\Console\Command;

use App\Bundle;
use App\Issue;
use App\Journal;
use Illuminate\Routing\RouteCollection;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Route;
use GuzzleHttp\Client;
use GuzzleHttp\Promise;

class EntityMap{
    public $entity;
    public $ids;
    public function __construct($entity, $ids){
        $this->entity = $entity;
        $this->ids = $ids;
    }
}

class CacheWarmup extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'cache:warm';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Warm up api cache except articles';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $routes_array = [];
        /** @var RouteCollection $routeCollection */
        $routeCollection = Route::getRoutes();
        $routes = $routeCollection->getRoutes();

        /** @var \Illuminate\Routing\Route $route */
        foreach ($routes as $route){
            $uri = $route->uri;
            if(
                strpos($uri, 'api/') !== false &&
                strpos($uri, 'auth') === false &&
                strpos($uri, 'article_id') === false
            ){
                $routes_array[] = $uri;
            }
        }

        $entities = self::collectEntitiesFromRoutes($routes_array);
        $entity_maps = self::getEntityMaps($entities);

        $promises = [];
        $client = new Client();

        foreach ($routes_array as $route){
            $filled_routes = self::getFilledRoutes($route, $entity_maps);
            foreach($filled_routes as $filled_route){
                $url = self::assembleUrlForApi($filled_route);
                $promises[] = $client->get($url);
            }
        }

        Promise\settle($promises)->wait();

        SUtils::dump_console('Done');
        return 1;
    }

    private static function getFilledRoutes(string $route, array $entity_maps) : array {
        $param = self::extractParamFromRoute($route);
        $entity = self::mapParamToEntity($param);
        $entity_maps_filtered = array_filter($entity_maps, function($entity_map) use ($entity){
            return $entity_map->entity === $entity;
        });

        if(empty($entity_maps_filtered))
            return [$route];

        $ids = array_shift($entity_maps_filtered)->ids;

        return array_map(function($id) use ($route){
            $mask = '/(.*?)\{(.*?)\}(.*?)/';
            return preg_replace($mask, '${1}'.$id.'${3}', $route);
        }, $ids);
    }

    private static function assembleUrlForApi($uri){
        return Request::root(). DIRECTORY_SEPARATOR . $uri;
    }

    private static function extractParamFromRoute(string $route) : ?string {
        $mask = '/.*?\{(.*?)\}.*?/';
        preg_match($mask, $route, $matches);
        if(empty($matches))
            return null;
        return $matches[1];
    }

    private static function mapParamToEntity(?string $param) : ?string {
        switch($param){
            case 'bundle_id':
                return Bundle::class;
            case 'journal_id':
                return Journal::class;
            case 'issue_id':
                return Issue::class;
            case 'article_id':
                return Article::class;
            default:
                return null;
        }
    }

    private static function getIdListForEntity(string $entity) : array {
        return $entity::select('id')
            ->get()
            ->map(function($item){
                return $item['id'];
            })
            ->toArray();
    }

    private static function getEntityMaps(array $entities) : array {
        return array_map(function($entity){
            $ids = self::getIdListForEntity($entity);
            return new EntityMap($entity, $ids);
        }, $entities);
    }

    private static function collectEntitiesFromRoutes(array $routes) : array {
        return array_reduce($routes, function($carry, $route){
            $param = self::extractParamFromRoute($route);
            $entity = self::mapParamToEntity($param);
            if($entity && !in_array($entity, $carry))
                array_push($carry, $entity);
            return $carry;
        }, []);
    }
}
