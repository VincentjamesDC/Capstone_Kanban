<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'week_issued' => $this->week_issued,
            'product_order' => $this->product_order,
            'item_code' => $this->item_code,
            'description' => $this->description,
            'quantity' => $this->quantity,
            'cutting' => $this->cutting,
            'date_cutted' => $this->date_cutted,
            'assembly_prep' => $this->assembly_prep,
            'date_preped' => $this->date_preped,
            'assembly_one' => $this->assembly_one,
            'date_assembled_one' => $this->date_assembled_one,
            'assembly_two' => $this->assembly_two,
            'date_assembled_two' => $this->date_assembled_two,
            'quality_control' => $this->quality_control,
            'date_checked' => $this->date_checked,
            'finishing_one' => $this->finishing_one,
            'date_finished_one' => $this->date_finished_one,
            'finishing_two' => $this->finishing_two,
            'status' => $this->status,
            'date_started' => $this->date_started,
            'date_finished' => $this->date_finished
        ];
    }
}
