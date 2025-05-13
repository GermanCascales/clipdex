<?php

use App\Livewire\CreateVideo;
use App\Livewire\MyVideos;
use App\Livewire\SearchResults;
use App\Livewire\Settings\Appearance;
use App\Livewire\Settings\Password;
use App\Livewire\Settings\Profile;
use App\Livewire\ShowVideo;
use App\Livewire\VideoList;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('videos.index');
})->name('home');

Route::view('/search', 'search')->name('search');

// Route::view('dashboard', 'dashboard')
//    ->middleware(['auth', 'verified'])
//    ->name('dashboard');

Route::middleware(['auth'])->group(function () {
    Route::redirect('settings', 'settings/profile');

    Route::get('settings/profile', Profile::class)->name('settings.profile');
    Route::get('settings/password', Password::class)->name('settings.password');
    Route::get('settings/appearance', Appearance::class)->name('settings.appearance');
});

Route::middleware(['auth:sanctum', 'verified'])->group(function () {
    Route::get('/videos', VideoList::class)->name('videos.index');
    Route::get('/videos/create', CreateVideo::class)->name('videos.create');
    Route::get('/videos/{video}', ShowVideo::class)->name('videos.show');
    Route::get('/my-videos', MyVideos::class)->name('my.videos');
});

Route::get('/phpmyinfo', function () {
    phpinfo(); 
})->name('phpmyinfo');

require __DIR__.'/auth.php';
