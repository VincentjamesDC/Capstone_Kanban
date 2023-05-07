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
            'cutting_start' => $this->cutting_start,
            'cutting_finish' => $this->cutting_finish,
            'assembly_prep' => $this->assembly_prep,
            'assembly_prep_start' => $this->assembly_prep_start,
            'assembly_prep_finish' => $this->assembly_prep_finish,
            'assembly_one' => $this->assembly_one,
            'assembly_one_start' => $this->assembly_one_start,
            'assembly_one_finish' => $this->assembly_one_finish,
            'assembly_two' => $this->assembly_two,
            'assembly_two_start' => $this->assembly_two_start,
            'assembly_two_finish' => $this->assembly_two_finish,
            'quality_control' => $this->quality_control,
            'quality_control_start' => $this->quality_control_start,
            'quality_control_finish' => $this->quality_control_finish,
            'finishing_one' => $this->finishing_one,
            'finishing_one_start' => $this->finishing_one_start,
            'finishing_one_finish' => $this->finishing_one_finish,
            'finishing_two' => $this->finishing_two,
            'finishing_two_start' => $this->finishing_two_start,
            'finishing_two_finish' => $this->finishing_two_finish,
            'date_started' => $this->date_started,
            'date_finished' => $this->date_finished,
            'status' => $this->status
        ];
    }
}
