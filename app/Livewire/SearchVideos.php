<?php

namespace App\Livewire;

use App\Models\Video;
use Illuminate\Support\Collection;
use Livewire\Attributes\Url;
use Livewire\Component;

class SearchVideos extends Component
{
    #[Url(history: true)]
    public string $search = '';

    public function submitSearch()
    {
        if (strlen($this->search) >= 2) {
            return $this->redirect(route('search', ['query' => $this->search]), navigate: true);
        }
    }

    public function render()
    {
        return view('livewire.search-videos');
    }
}
