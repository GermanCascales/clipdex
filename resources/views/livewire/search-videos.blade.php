<div>
    <form wire:submit.prevent="submitSearch">
        <label class="relative block">
            <span class="sr-only">{{ __('Buscar') }}</span>
            <span class="absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-400">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </span>
            <input
                wire:model="search"
                type="search"
                class="block w-[480px] h-10 rounded-full bg-[#F5F5F5] border-0 pl-11 pr-4 text-[15px] placeholder-zinc-500 focus:outline-none focus:ring-0 dark:bg-zinc-800/50 dark:placeholder-zinc-400"
                placeholder="{{ __('Busca memes, momentazos, reacciones...') }}"
            />
        </label>
    </form>
</div>
