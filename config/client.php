<?php

return [
    'realm_id' => 1,
    'secret' => 'ymLjGq7iMupL5dHu7Z3iDUs6',
    'master_url' => '185.22.63.2',
//    'master_url' => 'localhost:3000',
    'json_data_load_route' => 'get_json_data',
    'images_archive_load_route' => 'get_zipped_images',
    'changed_data_url' => 'get_changed_data',
    'images_sync_url' => 'get_changed_images',

    'auth_actions_url' => 'auth_actions',
    'bridge_token_info_url' => 'bridge_token_info',
    'msisdn_info_url' => 'msisdn_info',

    'ip_checker_url' => 'http://ip.blinko.ru/api/get_op'
];
