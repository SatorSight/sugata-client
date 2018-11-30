<?php

return [
    'realm_id' => 1,
    'secret' => 'ymLjGq7iMupL5dHu7Z3iDUs6',
    'master_url' => '185.22.63.2',
//    'master_url' => 'localhost:3000',
    'json_data_load_route' => 'get_json_data',
    'images_archive_load_route' => 'get_zipped_images',
    'user_hit' => 'user_hit',
    'add_comment' => 'add_comment',
    'changed_data_url' => 'get_changed_data',
    'all_ids_url' => 'get_all_ids',
    'images_sync_url' => 'get_changed_images',

    'auth_actions_url' => 'auth_actions',
    'bridge_token_info_url' => 'bridge_token_info',
    'field_info_url' => 'field_info',

    'ip_checker_url' => 'http://ip.blinko.ru/api/get_op'
];
