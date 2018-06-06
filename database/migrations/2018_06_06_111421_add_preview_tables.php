<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddPreviewTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('big_preview_images', function (Blueprint $table) {
            $table->increments('id');
            $table->string('path');
            $table->integer('parent_id');
            $table->string('parent_type');
            $table->string('extension');

            $table->timestamps();
        });

        Schema::create('small_preview_images', function (Blueprint $table) {
            $table->increments('id');
            $table->string('path');
            $table->integer('parent_id');
            $table->string('parent_type');
            $table->string('extension');

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
        //
    }
}
