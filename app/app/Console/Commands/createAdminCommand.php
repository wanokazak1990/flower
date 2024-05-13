<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class createAdminCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:create-admin';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Создать админа';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $user = \App\Models\User::where('email', 'admin@admin.ru')->first();

        if($user !== null)
            exit("Админ уже создан \n");

        \App\Models\User::create([
            'email' => 'admin@admin.ru',
            'name' => 'admin',
            'password' => Hash::make(env('ADMIN_PASSWORD')),
            'role' => 1
        ]);

        dump('Пользователь админ создан');
    }
}
