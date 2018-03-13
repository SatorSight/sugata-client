<?php

namespace App\Lib;

use App\Article;
use App\Bundle;
use App\Comment;
use App\Image;
use App\Issue;
use App\Journal;
use App\Like;
use App\Listing;
use App\Locale;
use App\Operator;
use App\Period;
use App\Setting;
use App\User;
use App\UserData;
use App\UserHistory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

//todo rewrite with extending GatewayService

class MasterGateway{

    private $image_ids;

    public function __construct(){
        $this->image_ids = [];
    }

    public static function getAuthUrlPostfix() : string {
        $realm_id = config('client.realm_id');
        $secret = config('client.secret');

        return $realm_id . '/' . $secret . '/';
    }

    public static function getMasterJsonDataUrl() : string {
        $url = config('client.json_data_load_route');
        return self::getSchemaDomainUrlPart() . '/' . $url . '/' . self::getAuthUrlPostfix();
    }

    public static function getMasterImagesDataUrl() : string {
        $url = config('client.images_archive_load_route');
        return self::getSchemaDomainUrlPart() . '/' . $url . '/' . self::getAuthUrlPostfix();
    }

    public static function getChangedDataUrl() : string {
        $url = config('client.changed_data_url');
        return self::getSchemaDomainUrlPart() . '/' . $url . '/' . self::getAuthUrlPostfix();
    }

    public static function getImagesSyncUrl(array $ids) : string {
        $url = config('client.images_sync_url');
        return self::getSchemaDomainUrlPart() . '/' . $url . '/' . self::getAuthUrlPostfix() . '/'
            . json_encode($ids);
    }

    public static function downloadChangedData() : \stdClass{
        $url = self::getChangedDataUrl();
        $json = file_get_contents($url);
        $data = json_decode($json);
        return $data;
    }

    public static function downloadImagesArray(array $ids) : void{
        $zip_file_final_name = time() . 'temp_images_archive.zip';

        $url = self::getImagesSyncUrl($ids);
        $json = file_get_contents($url);
        $res = json_decode($json);
        $zip_file_url = $res->file;
        $zip_file_url = 'http://' . $zip_file_url;

        SUtils::dump_console($json);
        SUtils::dump_console($zip_file_url);


        $file = fopen($zip_file_url, 'r');
        Storage::disk('local')->put($zip_file_final_name, $file);
        fclose($file);

        $zipper = new \Chumper\Zipper\Zipper;
        $zipper->make('storage/app/' . $zip_file_final_name)->extractTo('public/uploaded_images');

        Storage::delete($zip_file_final_name);
    }

    public function downloadAndSavePeriods(array $periods) : void {
        foreach ($periods as $period){
            $p = new Period();
            $p->id = $period->id;
            $p->name = $period->name;
            $p->key = $period->key;

            $p->save();
        }
    }

    public function downloadAndSaveOperators(array $operators) : void {
        foreach ($operators as $operator){
            $o = new Operator();
            $o->id = $operator->id;
            $o->key = $operator->key;
            $o->value = $operator->value;

            $o->save();
        }
    }

    public function downloadAndSaveUsers(array $users) : void {
        foreach ($users as $user){
            $u = new User();
            $u->id = $user->id;
            $u->msisdn = $user->msisdn;
            $u->email = $user->email;
            $u->login = $user->login;
            $u->active = $user->active;
            $u->setCreatedAt(new \DateTime($user->created_at));
            $u->setUpdatedAt(new \DateTime($user->updated_at));
            $u->operator_id = $user->operator_id;

            $u->save();
        }
    }

    public function downloadAndSaveUserHistories(array $users_histories) : void {
        foreach ($users_histories as $history){
            $u = new UserHistory();
            $u->id = $history->id;
            $u->user_id = $history->user_id;

            $u->save();
        }
    }

    public function downloadAndSaveUserData(array $users_data) : void {
        foreach ($users_data as $data){
            $u = new UserData();
            $u->id = $data->id;
            $u->user_id = $data->user_id;

            $u->save();
        }
    }

    public function downloadAndSaveSettings(array $settings) : void {
        foreach ($settings as $setting){
            $s = new Setting();
            $s->id = $setting->id;
            $s->key = $setting->key;
            $s->value = $setting->value;

            $s->save();
        }
    }

    public function downloadAndSaveLocales(array $locales) : void {
        foreach ($locales as $locale){
            $l = new Locale();
            $l->id = $locale->id;
            $l->locale_file_path = $locale->locale_file_path;

            $l->save();
        }
    }

    public function downloadAndSaveLikes(array $likes) : void {
        foreach ($likes as $like){
            $l = new Like();
            $l->id = $like->id;
            $l->setCreatedAt(($like->created_at));
            $l->user_id = $like->user_id;
            $l->article_id = $like->article_id;

            $l->save();
        }
    }

    public function downloadAndSaveComments(array $comments) : void {
        foreach ($comments as $comment){
            $c = new Comment();
            $c->id = $comment->id;
            $c->setCreatedAt(($comment->created_at));
            $c->setUpdatedAt(($comment->updated_at));
            $c->user_id = $comment->user_id;
            $c->article_id = $comment->article_id;

            $c->save();
        }
    }

    public function downloadAndSaveBundles(array $bundles) : void {
        foreach ($bundles as $bundle){
            $b = new Bundle();
            $b->id = $bundle->id;
            $b->name = $bundle->name;
            $b->realm_id = config('client.realm_id');
            if(!empty($bundle->image_id))
                $this->image_ids[] = $bundle->image_id;

            $b->save();
        }
    }

    public function downloadAndSaveJournals(array $journals) : void {
        foreach ($journals as $journal){
            $j = new Journal();
            $j->id = $journal->id;
            $j->name = $journal->name;
            $j->url_prefix = $journal->url_prefix;
            $j->order = $journal->order;
            $j->archived = $journal->archived;
            $j->description = $journal->description;
            $j->bundle_id = $journal->bundle_id;
            $j->period_id = $journal->period_id;
            $j->image_id = $journal->image_id;

            if(!empty($journal->image_id))
                $this->image_ids[] = $journal->image_id;

            $j->save();
        }
    }

    public function downloadAndSaveIssues(array $issues) : void {
        foreach ($issues as $issue){
            $i = new Issue();
            $i->id = $issue->id;
            $i->number = $issue->number;
            $i->listing_page = $issue->listing_page;
            $i->double_month = $issue->double_month;
            $i->double_number = $issue->double_number;
            $i->setCreatedAt(new \DateTime($issue->created_at));
            $i->setUpdatedAt(new \DateTime($issue->updated_at));
            $i->journal_id = $issue->journal_id;
            $i->image_id = $issue->image_id;
            $i->content_date = new \DateTime($i->content_date);

            if(!empty($issue->image_id))
                $this->image_ids[] = $issue->image_id;

            $i->save();
        }
    }

    public function downloadAndSaveArticles(array $articles) : void {
        foreach ($articles as $article){
            $a = new Article();
            $a->id = $article->id;
            $a->title = $article->title;
            $a->html = $article->html;
            $a->page_number = $article->page_number;
            $a->desktop_html = $article->desktop_html;
            $a->desktop_bg = $article->desktop_bg;
            $a->setCreatedAt(new \DateTime($article->created_at));
            $a->setUpdatedAt(new \DateTime($article->updated_at));
            $a->issue_id = $article->issue_id;

            $a->save();
        }
    }

    public function downloadAndSaveListings(array $listings) : void {
        foreach ($listings as $listing){
            $l = new Listing();
            $l->id = $listing->id;
            $l->content = $listing->content;
            $l->setCreatedAt(new \DateTime($listing->created_at));
            $l->setUpdatedAt(new \DateTime($listing->updated_at));
            $l->issue_id = $listing->issue_id;

            $l->save();
        }
    }

    public function saveImages($images) : void {
        foreach ($images as $image){
            $i = new Image();
            $i->id = $image->id;
            $i->extension = $image->extension;
            $i->content_key = $image->content_key;
            $i->path = $image->path;
            $i->parent_id = $image->parent_id;
            $i->setCreatedAt(new \DateTime($image->created_at));
            $i->setUpdatedAt(new \DateTime($image->updated_at));
            $i->parent_type = $image->parent_type;
            $i->page_number = $image->page_number;

            $i->save();
        }
    }

    public static function removeAllImageFiles(){
        File::deleteDirectory('storage/uploaded_images', true);
    }

    public function dropAllData(){
        DB::statement('TRUNCATE issues CASCADE');
        DB::statement('TRUNCATE articles CASCADE');
        DB::statement('TRUNCATE listings CASCADE');
        DB::statement('TRUNCATE locales CASCADE');
        DB::statement('TRUNCATE images CASCADE');
        DB::statement('TRUNCATE journals CASCADE');
        DB::statement('TRUNCATE bundles CASCADE');
        DB::statement('TRUNCATE periods CASCADE');
        DB::statement('TRUNCATE user_histories CASCADE');
        DB::statement('TRUNCATE user_datas CASCADE');
        DB::statement('TRUNCATE users CASCADE');
        DB::statement('TRUNCATE settings CASCADE');
        DB::statement('TRUNCATE operators CASCADE');
    }

    public function downloadImages() : void {

        // var_dump(__DIR__);
        // die;

//         $url = self::getMasterImagesDataUrl();

// $ch = curl_init();
// curl_setopt($ch, CURLOPT_URL, 'http://'.$url);
// curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
// $f = curl_exec($ch);
// curl_close($ch);


//        $f = fopen($url, 'r');
//        stream_set_timeout($f, 600);
        // Storage::put('images_archive.zip', $f);
//curl_close($ch)
//        fclose($f);

        $zipper = new \Chumper\Zipper\Zipper;
        $zipper->make('storage/app/images_archive.zip')->folder('public')->extractTo('public');
    }

    private static function getSchemaDomainUrlPart() : string {
        $master_url = config('client.master_url');
        return 'http://' . $master_url;
    }
}
