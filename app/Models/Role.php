<?php

namespace App\Models;

use App\Models\Web\UserType;
use Spatie\Permission\Models\Role as SpatieRole;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Role extends SpatieRole
{
    protected $table = 'roles';

}
