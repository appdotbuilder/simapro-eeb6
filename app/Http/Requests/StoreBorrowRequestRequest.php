<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBorrowRequestRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'asset_id' => 'required|exists:assets,id',
            'borrower_name' => 'required|string|max:255',
            'borrower_employee_id' => 'required|string|max:255',
            'borrower_phone' => 'required|string|max:20',
            'borrower_email' => 'nullable|email|max:255',
            'borrower_department' => 'nullable|string|max:255',
            'purpose' => 'required|string',
            'requested_start_date' => 'required|date|after_or_equal:today',
            'requested_end_date' => 'required|date|after:requested_start_date',
            'notes' => 'nullable|string',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'asset_id.required' => 'Please select an asset to borrow.',
            'asset_id.exists' => 'The selected asset is not available.',
            'borrower_name.required' => 'Your name is required.',
            'borrower_employee_id.required' => 'Your employee ID is required.',
            'borrower_phone.required' => 'Your phone number is required.',
            'borrower_email.email' => 'Please provide a valid email address.',
            'purpose.required' => 'Please describe the purpose of borrowing.',
            'requested_start_date.required' => 'Please select a start date.',
            'requested_start_date.after_or_equal' => 'Start date cannot be in the past.',
            'requested_end_date.required' => 'Please select an end date.',
            'requested_end_date.after' => 'End date must be after the start date.',
        ];
    }
}