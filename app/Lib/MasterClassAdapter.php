<?php

namespace App\Lib;

class MasterClassAdapter{
    const ADAPTER = [
        'Operator' => 'Operator',
        'RealmSetting' => 'Setting',
        'RealmLocale' => 'Locale',
        'User' => 'User',
        'UserData' => 'UserData',
        'UserHistory' => 'UserHistory',
        'Period' => 'Period',
        'Bundle' => 'Bundle',
        'Journal' => 'Journal',
        'Issue' => 'Issue',
        'Article' => 'Article',
        'Listing' => 'Listing',
        'Like' => 'Like',
        'Comment' => 'Comment',
        'Image' => 'Image',
        'Logo' => 'Logo',
        'BundleAccess' => 'BundleAccess',
        'BundleAccessesBundle' => 'BundleAccessesBundle',
        'AdditionalImage' => 'AdditionalImage',
        'BigPreviewImage' => 'BigPreviewImage',
        'SmallPreviewImage' => 'SmallPreviewImage',
        'Tag' => 'Tag',
        'ArticlesTags' => 'ArticlesTag',
    ];

    const IMAGE_CLASSES = ['Image', 'Logo', 'BigPreviewImage', 'SmallPreviewImage'];

    public static function masterToSlave(string $class) : string {
        return 'App\\' . self::ADAPTER[$class];
    }
}