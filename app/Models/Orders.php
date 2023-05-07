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
        'cutting_start',
        'cutting_finish',
        'assembly_prep',
        'assembly_prep_start',
        'assembly_prep_finish',
        'assembly_one',
        'assembly_one_start',
        'assembly_one_finish',
        'assembly_two',
        'assembly_two_start',
        'assembly_two_finish',
        'quality_control',
        'quality_control_start',
        'quality_control_finish',
        'finishing_one',
        'finishing_one_start',
        'finishing_one_finish',
        'finishing_two',
        'finishing_two_start',
        'finishing_two_finish',
        'date_started',
        'date_finished',
        'status'
    ];
}
