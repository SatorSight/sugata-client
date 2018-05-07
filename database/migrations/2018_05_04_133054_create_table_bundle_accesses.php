<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableBundleAccesses extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bundle_accesses', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('redirect_url');
            $table->timestamps();

            $table->integer('operator_id')->unsigned();
            $table->foreign('operator_id')->references('id')->on('operators');

        });

        Schema::create('bundle_accesses_bundles', function (Blueprint $table) {
            $table->integer('bundle_id')->unsigned()->nullable();
            $table->foreign('bundle_id')->references('id')
                ->on('bundles')->onDelete('cascade');

            $table->integer('bundle_access_id')->unsigned()->nullable();
            $table->foreign('bundle_access_id')->references('id')
                ->on('bundle_accesses')->onDelete('cascade');

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
