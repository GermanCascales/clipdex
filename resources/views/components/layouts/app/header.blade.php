<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="dark">
    <head>
        @include('partials.head')
        @fluxAppearance
    </head>
    <body class="min-h-screen bg-white dark:bg-zinc-900">
        <flux:header container class="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700">
            <flux:sidebar.toggle class="lg:hidden" icon="bars-2" inset="left" />

            <a href="{{ route('home') }}" class="ml-2 mr-5 flex items-center space-x-2 lg:ml-0" wire:navigate>
                <x-app-logo />
            </a>

            <flux:navbar class="-mb-px max-lg:hidden">
                <flux:separator vertical variant="subtle" class="my-2"/>
            </flux:navbar>
            <flux:spacer />

            <flux:navbar class="me-4">
            <flux:input icon="magnifying-glass" class="w-64 md:w-80 lg:w-96 rounded-full" placeholder="Busca memes, momentazos, reacciones..."/>
            </flux:navbar>

            <flux:spacer />

            <flux:button href="{{ route('videos.create') }}" class="mr-4 text-white! bg-[#F36D4C]!">
                {{ __('Subir un clip') }}
            </flux:button>

            <flux:dropdown position="top" align="start">
                <flux:profile circle avatar="{{ auth()->user()->avatar_url }}" href="{{ route('my.videos') }}" />
                <flux:menu>
                    <flux:menu.item icon="user" href="{{ route('my.videos') }}">
                        {{ __('Mis clips') }}
                    </flux:menu.item>

                    <flux:menu.separator />

                    <flux:menu.radio.group x-data variant="segmented" x-model="$flux.appearance">
                        <flux:menu.radio value="light" icon="sun">{{ __('Claro') }}</flux:menu.radio>
                        <flux:menu.radio value="dark" icon="moon">{{ __('Oscuro') }}</flux:menu.radio>
                        <flux:menu.radio value="system" icon="computer-desktop">{{ __('Auto') }}</flux:menu.radio>
                    </flux:menu.radio.group>
                    <flux:radio.group x-data variant="segmented" x-model="$flux.appearance">
                        <flux:radio value="light" icon="sun">{{ __('Claro') }}</flux:radio>
                        <flux:radio value="dark" icon="moon">{{ __('Oscuro') }}</flux:radio>
                        <flux:radio value="system" icon="computer-desktop">{{ __('Auto') }}</flux:radio>
                    </flux:radio.group>

                    <flux:menu.separator />

                    <flux:menu.item icon="cog-6-tooth" href="{{ route('settings.profile') }}">
                        {{ __('Configuración') }}
                    </flux:menu.item>

                    <flux:menu.separator />

                    <flux:menu.item icon="arrow-right-start-on-rectangle" href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                        {{ __('Cerrar sesión') }}
                    </flux:menu.item>
                    <form id="logout-form" action="{{ route('logout') }}" method="POST" class="hidden">
                        @csrf
                    </form>
                </flux:menu>
            </flux:dropdown>
        </flux:header>

        {{ $slot }}

        @fluxScripts
    </body>
</html>
