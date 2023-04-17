<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class OrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'week_issued' => ['required', 'string'],
            'product_order' => ['required', 'string'],
            'item_code' => ['required', 'string'],
            'description' => ['required', 'string'],
            'quantity' => ['required', 'string'],
            'cutting' => ['nullable', 'string'],
            'assembly_prep' => ['nullable', 'string'],
            'assembly_one' => ['nullable', 'string'],
            'assembly_two' => ['nullable', 'string'],
            'quality_control' => ['nullable', 'string'],
            'finishing_one' => ['nullable', 'string'],
            'finishing_two' => ['nullable', 'string'],
            'status' => ['nullable', 'string'],
            'date_started' => ['required', 'date'],
            'date_finished' => ['nullable', 'date']
        ];
    }
}
