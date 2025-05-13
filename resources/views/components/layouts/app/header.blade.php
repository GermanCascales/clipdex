<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="dark">
    <head>
        @include('partials.head')
        @fluxAppearance
    </head>
    <body class="min-h-screen bg-white dark:bg-zinc-900">
        <flux:header container class="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700 py-2">
            <div class="flex items-center min-w-[240px]">
                <flux:sidebar.toggle class="lg:hidden" icon="bars-2" inset="left" />
                <a href="{{ route('home') }}" class="ml-2 mr-5 flex items-center space-x-2 lg:ml-0" wire:navigate>
                    <x-app-logo />
                </a>
            </div>

            <div class="flex-1 flex justify-center">
                <livewire:search-videos />
            </div>

            <div class="flex items-center justify-end min-w-[240px]">
                <a href="{{ route('videos.create') }}" class="mr-4 inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium text-white bg-[var(--color-papaya)] hover:bg-[var(--color-papaya)]  hover:brightness-110 transition-colors duration-200">
                    {{ __('Subir un clip') }}
                </a>

            <flux:dropdown position="top" align="start">
                <flux:profile circle avatar="{{ auth()->user()->avatar_url }}" href="{{ route('my.videos') }}" />
                <flux:menu>
                    <a href="{{ route('my.videos') }}" class="block w-full hover:bg-zinc-50 dark:hover:bg-zinc-600 transition-colors duration-150 rounded-md">
                        <div class="flex items-center gap-3 p-3 w-full">
                            <img src="{{ auth()->user()->avatar_url }}" alt="{{ auth()->user()->name }}" class="w-8 h-8 rounded-sm">
                            <div class="flex flex-col">
                                <span class="text-sm font-bold">{{ auth()->user()->name }}</span>
                                <span class="text-zinc-500 dark:text-zinc-300 text-sm">{{ __('Ver mis clips') }}</span>
                            </div>
                            <flux:icon.chevron-right class="ml-auto text-zinc-400" />
                        </div>
                    </a>

                    <flux:menu.separator />

                    <div class="flex items-center justify-between px-3 py-1">
                        <span class="text-sm font-medium">Tema</span>
                        <div class="inline-flex">
                            <flux:radio.group x-data variant="segmented" x-model="$flux.appearance" class="w-auto">
                                <flux:radio value="light" icon="sun" class="w-10"></flux:radio>
                                <flux:radio value="dark" icon="moon" class="w-10"></flux:radio>
                                <flux:radio value="system" class="w-10 text-xs">Auto</flux:radio>
                            </flux:radio.group>
                        </div>
                    </div>

                    <flux:menu.separator />

                    <flux:menu.item class="py-3" icon="cog-6-tooth" href="{{ route('settings.profile') }}">
                        {{ __('Configuración') }}
                    </flux:menu.item>
                    <flux:menu.item class="py-3" icon="arrow-right-start-on-rectangle" href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                        {{ __('Cerrar sesión') }}
                    </flux:menu.item>
                    <form id="logout-form" action="{{ route('logout') }}" method="POST" class="hidden">
                        @csrf
                    </form>
                    
                    <flux:menu.separator />

                    <div class="flex gap-4 p-2 text-sm text-zinc-500 dark:text-zinc-400">
                        <a href="#">Privacidad</a>
                        <a href="#">Condiciones</a>
                        <a href="#">Copyright</a>
                    </div>
                </flux:menu>
            </flux:dropdown>
        </flux:header>

        {{ $slot }}

        @fluxScripts
    </body>
</html>
