<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Orders extends Model
{
    use HasFactory;

    protected $fillable = [
        'week_issued', 
        'product_order', 
        'item_code', 
        'description', 
        'quantity', 
        'cutting',
        'date_cutted',
        'assembly_prep', 
        'date_preped',
        'assembly_one',
        'date_assembled_one',
        'assembly_two',
        'date_assembled_two',
        'quality_control',
        'date_checked',
        'finishing_one', 
        'date_finished_one',
        'finishing_two',
        'status', 
        'date_started',
        'date_finished'
    ];
}
