<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTagsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tags', function (Blueprint $table) {
            $table->increments('id');

            $table->string('name');
            $table->string('key');
            $table->boolean('is_hub')->nullable();

            $table->timestamps();
        });

        Schema::create('articles_tags', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('article_id')->unsigned()->nullable();
            $table->foreign('article_id')->references('id')
                ->on('articles')->onDelete('cascade');

            $table->integer('tag_id')->unsigned()->nullable();
            $table->foreign('tag_id')->references('id')
                ->on('tags')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('articles_tags');
        Schema::dropIfExists('tags');
    }
}
