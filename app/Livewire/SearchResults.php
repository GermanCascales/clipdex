<?php

namespace App\Livewire;

use App\Models\Video;
use Illuminate\Support\Facades\DB;
use Livewire\Component;
use Livewire\WithPagination;
use Livewire\Attributes\Url;

class SearchResults extends Component
{
    use WithPagination;

    #[Url(history: true)]
    public string $query = '';

    public function mount()
    {
        $this->query = request()->get('query', '');
    }

    protected function normalizeText(string $text): string
    {
        return str_replace(
            ['á', 'é', 'í', 'ó', 'ú', 'ñ', 'ü', 'à', 'è', 'ì', 'ò', 'ù',
             'Á', 'É', 'Í', 'Ó', 'Ú', 'Ñ', 'Ü', 'À', 'È', 'Ì', 'Ò', 'Ù'], 
            ['a', 'e', 'i', 'o', 'u', 'n', 'u', 'a', 'e', 'i', 'o', 'u',
             'a', 'e', 'i', 'o', 'u', 'n', 'u', 'a', 'e', 'i', 'o', 'u'],
            $text
        );
    }

    public function getResults()
    {
        if (strlen($this->query) < 2) {
            return collect();
        }

        $searchTerm = $this->normalizeText($this->query);
        $searchTermLower = mb_strtolower($searchTerm);
        
        return Video::query()
            ->select('videos.*')
            ->where(function($query) use ($searchTermLower) {
                $query->whereRaw('LOWER(title) LIKE ?', ['%' . $searchTermLower . '%'])
                    ->orWhereRaw('LOWER(description) LIKE ?', ['%' . $searchTermLower . '%']);
            })
            ->orderByRaw('
                CASE 
                    WHEN LOWER(title) LIKE ? THEN 1
                    WHEN LOWER(title) LIKE ? THEN 2
                    WHEN LOWER(description) LIKE ? THEN 3
                    ELSE 4
                END
            ', [
                $searchTermLower . '%',
                '%' . $searchTermLower . '%',
                '%' . $searchTermLower . '%'
            ])
            ->with('user')
            ->paginate(12);
    }

    public function render()
    {
        return view('livewire.search-results', [
            'videos' => $this->getResults()
        ]);
    }
}
