<div class="flex flex-col">
    <div class="bg-[var(--color-papaya)] w-full py-12">
        <div class="container mx-auto px-4 text-center">
            <h1 class="text-4xl font-bold text-white">{{ $query }}</h1>
            <p class="text-white/90 mt-2">{{ trans_choice('{1} :count clip|[2,*] :count clips', $videos->total()) }}</p>
        </div>
    </div>

    <div class="container mx-auto px-4 py-8">
        @if($videos->isEmpty())
            <div class="text-center py-12">
                <p class="text-lg text-zinc-600 dark:text-zinc-400">{{ __('No se encontraron resultados para tu búsqueda') }}</p>
            </div>
        @else
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                @foreach($videos as $video)
                    <livewire:video-card :video="$video" :key="$video->id" />
                @endforeach
            </div>

            <div class="mt-8">
                {{ $videos->links() }}
            </div>
        @endif
    </div>
</div>
