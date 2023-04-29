<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Orders>
 */
class OrdersFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            '' => fake()->word(),
            'product_order' => fake()->word(),
            'item_code' => fake()->sentence(),
            'description' => fake()->randomElement(['Authentic', 'Modern']),
            'quantity' => fake()->randomElement(['Exotic', 'Pastries', 'Deserts', 'Traditional']),
            'specialties' => fake()->randomElement(['Betute', 'Bulig', 'Sisig', 'Kamaru', 'Murcon', 'Pindang Damulag', 'Buro', 'Tibuk-tibuk', 'Chicharon', 'Turrones de Casuy']),
            'phone_number_one' => fake()->numerify('###-###-####'),
            'phone_number_two' => fake()->numerify('###-###-####'),
            'price_range' => fake()->randomElement(['100', '200', '300', '400', '500', '1000']),
            'operating_from' => fake()->time(),
            'operating_to' => fake()->time(),
            'open_from' => fake()->randomElement(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']),
            'open_to' => fake()->randomElement(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']),
            'service_options' => fake()->randomElement(['Walk In', 'Reservation', 'Delivery']),
            'rating' => fake()->randomElement(['0']),
            // 'rating' => fake()->randomElement(['0', '1', '2', '3', '4', '5']),
            'email' => fake()->email(),
            'socials' => fake()->word(),
            'latitude' => fake()->latitude(15, 120),
            'longitude' => fake()->longitude(15, 120),
            'town' => fake()->randomElement(['Angeles', 'Mabalacat', 'San Fernando', 'Porac', 'Magalang', 'Apalit']),
            'address' => fake()->address(),
            'date_applied' => fake()->dateTimeThisMonth(),
            'date_archived' => fake()->dateTimeThisMonth()
        ];
    }
}
