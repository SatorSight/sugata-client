<?php

namespace App\Console\Commands;

use App\Bundle;
use App\Lib\AuthService;
use App\Lib\SUtils;
use Illuminate\Console\Command;

class test extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:test';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

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
     * Execute the console coammand.
     *
     * @return mixed
     */
    public function handle()
    {
        $b_t = 'JPw38NefrTtSlT2FyQfc_NHgPpnNLqrlCsnPTfA6QODkpWfi64Fmj4G886_3dQOXqZ17G2wuaYvbH-AKZrsdcslFrhWxXM_Q7TxBXMxX4aF1M9MorpN42UTFRsDXB0sYnXLIVXZSusT12sLApFa9DCMb9bsdhD7-jWR6a78Uiz6c6QY36N8jtA';
        $msisdn = '+79663785583';

        $bundle = Bundle::first();
        $as = new AuthService();
//        $data = $as->askInfoForBundleByBridgeToken($b_t, $bundle);
        $data = $as->askInfoForBundleByMsisdn($msisdn, $bundle);
        SUtils::dump_console($data);

        return 'ok';
    }
}
