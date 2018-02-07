<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddReferences extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('msisdn');
            $table->string('email');
            $table->string('login');
            $table->boolean('active');
            $table->timestamps();
        });

        Schema::table('journals', function (Blueprint $table) {
            $table->integer('bundle_id')->unsigned();
            $table->integer('period_id')->unsigned();
            $table->integer('image_id')->unsigned();

            $table->foreign('bundle_id')->references('id')->on('bundles');
            $table->foreign('period_id')->references('id')->on('periods');
            $table->foreign('image_id')->references('id')->on('images');
        });

        Schema::table('issues', function (Blueprint $table) {
            $table->integer('journal_id')->unsigned();
            $table->integer('image_id')->unsigned();

            $table->foreign('journal_id')->references('id')->on('journals');
            $table->foreign('image_id')->references('id')->on('images');
        });

        Schema::table('articles', function (Blueprint $table) {
            $table->integer('issue_id')->unsigned();

            $table->foreign('issue_id')->references('id')->on('issues');
        });

        Schema::table('user_histories', function (Blueprint $table) {
            $table->integer('user_id')->unsigned();

            $table->foreign('user_id')->references('id')->on('users');
        });

        Schema::table('user_datas', function (Blueprint $table) {
            $table->integer('user_id')->unsigned();

            $table->foreign('user_id')->references('id')->on('users');
        });

        Schema::table('users', function (Blueprint $table) {
            $table->integer('operator_id')->unsigned();

            $table->foreign('operator_id')->references('id')->on('operators');
        });

        Schema::table('likes', function (Blueprint $table) {
            $table->integer('article_id')->unsigned();

            $table->foreign('article_id')->references('id')->on('articles');
        });

        Schema::table('comments', function (Blueprint $table) {
            $table->integer('article_id')->unsigned();

            $table->foreign('article_id')->references('id')->on('articles');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
