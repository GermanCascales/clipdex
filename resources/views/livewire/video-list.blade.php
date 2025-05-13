<div class="max-w-7xl mx-auto">
    <div class="overflow-hidden sm:rounded-lg">
        @if (session()->has('message'))
        <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            {{ session('message') }}
        </div>
        @endif

        <div class="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            @foreach($videos as $video)
            <livewire:video-card :video="$video" :key="$video->id" />
            @endforeach
        </div>

        <div class="mt-6">
            {{ $videos->links() }}
        </div>
    </div>
</div>