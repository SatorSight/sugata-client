<?php

namespace App;

use App\Http\Traits\HasImage;
use App\Http\Traits\ImageInjector;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasImage;
    use ImageInjector;

}