<?php

namespace App\Lib;

use Illuminate\Support\Collection;

class ImageProxyService{

    const ISSUE_STANDARD_500 = 500;
    const ARTICLE_PREVIEW_150 = 150;
    const COVER_ARTICLE_800 = 800;
    const LISTING_ARTICLE_200 = 200;

    const BASE_DIR = 'uploaded_images_resized';
    const PREVIEW_DIR = 'uploaded_images_resized_previews';

    public static function resize(Collection &$entities, $key, $size){
        $resized_dir_path = self::getResizeDirPath($size);
        $preview_dir_path = self::getPreviewDirPath($size);

        $entities = $entities->map(function($entity) use ($key, $size, $resized_dir_path, $preview_dir_path) {
            if(empty($entity->$key))
                return $entity;

            $image = $entity->$key;

            $file_name = SUtils::getFilenameFromPath($image);

            if(strpos($file_name, '.png') !== false)
                return $entity;

            $image_absolute_path = self::absolute_path($image);
            $image_resized_path = $resized_dir_path . '/' . $file_name;
            $image_preview_path = $preview_dir_path . '/' . $file_name;
            $image_public_path = '/' . self::BASE_DIR . '/' . $size . '/' . $file_name;

            if(!file_exists($image_resized_path) && file_exists($image_absolute_path)){
                $img = new \imagick($image_absolute_path);
                $img->scaleImage($size, 0);
                $img->setImageCompression(\imagick::COMPRESSION_JPEG);
                $img->setImageCompressionQuality(0);

                $img->writeImage($image_resized_path);
            }

            // previews for progressive images
            if(!file_exists($image_preview_path) && file_exists($image_absolute_path)){
                $img = new \imagick($image_absolute_path);

                $img->scaleImage(100, 0);

                $img->setImageCompression(\imagick::COMPRESSION_JPEG);
                $img->setImageCompressionQuality(10);

                $img->writeImage($image_preview_path);
            }

            $resized_key = $key.'_resized';
            $entity->$key = $image_public_path;
            $entity->$resized_key = $image_public_path;
            return $entity;
        });
    }



    private static function absolute_path($string){
        return public_path() . $string;
    }

    private static function getResizeDirPath($size){
        $basic_dir = public_path() . '/' . self::BASE_DIR;

        if(!is_dir($basic_dir))
            mkdir($basic_dir);

        $dir = $basic_dir . '/' . $size;

        if(!is_dir($dir))
            mkdir($dir);

        return $dir;
    }

    private static function getPreviewDirPath($size){
        $preview_dir = public_path() . '/' . self::PREVIEW_DIR;

        if(!is_dir($preview_dir))
            mkdir($preview_dir);

        $dir = $preview_dir . '/' . $size;

        if(!is_dir($dir))
            mkdir($dir);

        return $dir;
    }
}