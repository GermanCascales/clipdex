<div>
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="overflow-hidden sm:rounded-lg p-6">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold">Mis clips</h2>
            </div>

            @if (session()->has('message'))
            <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                {{ session('message') }}
            </div>
            @endif

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                @forelse($videos as $video)
                <div class="bg-white dark:bg-zinc-800 rounded-lg shadow-md overflow-hidden" wire:key="{{ $video->id }}">
                    <div class="aspect-w-16 aspect-h-9 relative group">
                        @if($video->thumbnail_path)
                        <div x-data="{ 
                                        muted: true,
                                        init() {
                                            let video = this.$refs.videoPlayer;
                                            video.muted = this.muted;
                                            this.$watch('muted', value => {
                                                video.muted = value;
                                            });
                                        }
                                    }">
                            <video
                                x-ref="videoPlayer"
                                class="object-cover w-full h-full rounded-lg"
                                loop
                                autoplay
                                playsinline
                                @mouseenter="muted = false"
                                @mouseleave="muted = true">
                                <source src="{{ Storage::url($video->thumbnail_path) }}" type="video/mp4">
                            </video>

                            <!-- Ícono del altavoz -->
                            <div class="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <svg x-show="muted" class="w-6 h-6 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z M17 14l2-2m0 0l2-2M19 12l2 2m-2-2l-2 2" />
                                </svg>
                                <svg x-show="!muted" class="w-6 h-6 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072M12 8v8m4.536-11.536a9 9 0 010 15.072M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                </svg>
                            </div>
                        </div>
                        @else
                        <div class="bg-gray-200 flex items-center justify-center">
                            <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        @endif
                    </div>

                    <div class="p-4">
                        <h3 class="text-lg font-semibold mb-2">{{ $video->title }}</h3>
                        <p class="text-gray-600 text-sm mb-4">{{ Str::limit($video->description, 100) }}</p>
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-500">{{ $video->created_at->diffForHumans() }}</span>
                            <button wire:click="delete({{ $video->id }})"
                                class="text-red-500 hover:text-red-700"
                                onclick="return confirm('¿Seguro que quieres eliminar el clip?')">
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
                @empty
                <div class="col-span-3 text-center py-8 text-gray-500">
                    Aún no has subido ningún clip. Hoy es un buen día para subir tu primer clip.
                </div>
                @endforelse
            </div>

            <div class="mt-6">
                {{ $videos->links() }}
            </div>
        </div>
    </div>
</div>