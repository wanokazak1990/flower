<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
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
            'name' => 'required|string|min:2|max:50',
            'price' => 'required|integer|min:0',
            'category_id' => 'required|exists:categories,id',
            'description' => 'required|string|max:500',
            'img' => 'sometimes|required|image'
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Название продукта обязательное поле',
            'name.string' => 'Название продукта это текст',
            'name.min' => 'Название продукта должно состоять минимум из 2 символов',
            'name.max' => 'Название продукта должно состоять максимум из 50 символов',
            'price.required' => 'Цена продукта обязательна для заполнения',
            'price.integer' => 'Цена продукта это целое число',
            'price.min' => 'Цена продукта не может быть меньше либо равна 0',
            'category_id.required' => 'Категория продукта обязательна для заполнения',
            'category_id.exists' => 'Продукт должен соответствовать существующей категории',
            'description.required' => 'Описание продукта обязательно для заполнения',
            'description.string' => 'Описание продукта это текст',
            'description.max' => 'Описание продукта максимум 500 символов',
            'img.required' => 'Картинка продукта обязательна',
            'img.image' => 'Картинка продукта не может быть с не веб-расширением',
        ];
    }
}
