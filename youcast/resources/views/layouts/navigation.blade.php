@php
    $user = Auth::user();
    $messagesRoute = $user?->isAdmin() ? route('admin.messages.index') : route('messages.index');
    $unreadMessages = $unreadMessages ?? 0;
@endphp

<nav x-data="{ open: false }" class="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-all duration-200">
    <div class="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between gap-4">
            {{-- Brand --}}
            <div class="flex min-w-0 items-center gap-3">
                <a href="{{ route('home') }}" class="group flex shrink-0 items-center gap-2.5 transition-transform duration-200 hover:scale-[1.02]" aria-label="Accueil YouCast">
                    <div class="relative flex items-center justify-center">
                        <x-application-logo class="h-9 w-9 transition-transform duration-300 group-hover:rotate-3" />
                    </div>
                    <span class="font-display text-lg font-extrabold tracking-tight text-slate-900 group-hover:text-brand-600 transition-colors">YouCast</span>
                </a>
                @guest
                    <span class="hidden truncate border-slate-200 text-xs font-medium text-slate-500 lg:block lg:border-l lg:ps-3">
                        Plateforme BDE YouCode
                    </span>
                @endguest
            </div>

            {{-- Primary navigation --}}
            <div class="hidden items-center gap-1.5 lg:flex">
                <x-nav-link :href="route('home')" :active="request()->routeIs('home')" icon="home">Accueil</x-nav-link>

                @auth
                    <x-nav-link :href="route('activities.index')" :active="request()->routeIs('activities.*')" icon="calendar">Activités</x-nav-link>
                    <x-nav-link :href="route('dashboard')" :active="request()->routeIs('dashboard')" icon="grid">Tableau de bord</x-nav-link>
                    <x-nav-link :href="route('ideas.index')" :active="request()->routeIs('ideas.*')" icon="bulb">Mes idées</x-nav-link>

                    @if ($user->isAdmin())
                        <div class="mx-1 h-5 w-px bg-slate-200"></div>
                        <x-nav-link :href="route('admin.activities.index')" :active="request()->routeIs('admin.activities.*')" icon="settings">Gestion</x-nav-link>
                        <x-nav-link :href="route('admin.ideas.index')" :active="request()->routeIs('admin.ideas.*')" icon="flag">Modération</x-nav-link>
                    @endif

                    <x-nav-link :href="$messagesRoute" :active="request()->routeIs('messages.*') || request()->routeIs('admin.messages.*')" icon="message">
                        Messages
                        @if ($unreadMessages > 0)
                            <span class="ms-1.5 inline-flex min-w-5 items-center justify-center rounded-full bg-gradient-to-r from-brand-600 to-electric-600 px-1.5 py-0.5 text-[0.6875rem] font-bold text-white shadow-xs">
                                {{ $unreadMessages > 99 ? '99+' : $unreadMessages }}
                            </span>
                        @endif
                    </x-nav-link>
                @endauth
            </div>

            {{-- Account area --}}
            <div class="flex items-center gap-2.5">
                @guest
                    <a href="{{ route('login') }}" class="hidden rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 transition-colors duration-150 hover:bg-slate-100 hover:text-slate-900 sm:inline-flex">
                        Se connecter
                    </a>
                    <x-button href="{{ route('register') }}" size="md">Créer un compte</x-button>
                @else
                    <div class="hidden lg:block">
                        <x-dropdown align="right" width="56">
                            <x-slot name="trigger">
                                <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-bold text-white shadow-xs">
                                    {{ mb_strtoupper(mb_substr($user->name, 0, 1)) }}
                                </span>
                                <span class="max-w-[10rem] truncate text-sm font-semibold text-slate-800">{{ $user->name }}</span>
                                <x-icon name="chevron-down" :size="16" class="text-slate-400" />
                            </x-slot>
                            <x-slot name="content">
                                <div class="border-b border-slate-100 bg-slate-50/50 px-4 py-3">
                                    <p class="truncate text-sm font-bold text-slate-900">{{ $user->name }}</p>
                                    <p class="truncate text-xs text-slate-500">{{ $user->email }}</p>
                                    <p class="mt-2 inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-0.5 text-[0.6875rem] font-bold uppercase tracking-wider text-brand-700 ring-1 ring-inset ring-brand-200">
                                        <x-icon name="shield" :size="12" />
                                        {{ $user->role->label() }}
                                    </p>
                                </div>
                                <div class="py-1.5">
                                    <x-dropdown-link :href="route('profile.edit')" icon="user">Mon profil</x-dropdown-link>
                                    @if ($user->isAdmin())
                                        <x-dropdown-link :href="route('admin.messages.index')" icon="inbox">Boîte de réception</x-dropdown-link>
                                    @else
                                        <x-dropdown-link :href="route('messages.index')" icon="inbox">Mes messages</x-dropdown-link>
                                    @endif
                                    <div class="my-1 border-t border-slate-100"></div>
                                    <form method="POST" action="{{ route('logout') }}">
                                        @csrf
                                        <button type="submit" class="flex w-full items-center gap-2.5 px-4 py-2 text-start text-sm font-medium text-rose-600 transition-colors duration-150 hover:bg-rose-50">
                                            <x-icon name="logout" :size="17" class="text-rose-500" />
                                            Se déconnecter
                                        </button>
                                    </form>
                                </div>
                            </x-slot>
                        </x-dropdown>
                    </div>
                @endguest

                {{-- Mobile toggle --}}
                <button type="button"
                        @click="open = ! open"
                        @keydown.escape="open = false"
                        :aria-expanded="open"
                        aria-controls="mobile-navigation"
                        class="inline-flex min-h-10 min-w-10 items-center justify-center rounded-xl text-slate-700 transition-colors duration-150 hover:bg-slate-100 lg:hidden">
                    <span class="sr-only">Ouvrir le menu</span>
                    <x-icon name="menu" :size="22" x-show="! open" />
                    <x-icon name="close" :size="22" x-show="open" x-cloak />
                </button>
            </div>
        </div>
    </div>

    {{-- Mobile panel --}}
    <div id="mobile-navigation" x-show="open" x-cloak @keydown.escape="open = false"
         class="border-t border-slate-200/80 bg-white/95 backdrop-blur-md lg:hidden">
        <div class="mx-auto max-w-content space-y-1 px-4 py-4 sm:px-6">
            <x-responsive-nav-link :href="route('home')" :active="request()->routeIs('home')" icon="home">Accueil</x-responsive-nav-link>

            @auth
                <x-responsive-nav-link :href="route('activities.index')" :active="request()->routeIs('activities.*')" icon="calendar">Activités</x-responsive-nav-link>
                <x-responsive-nav-link :href="route('dashboard')" :active="request()->routeIs('dashboard')" icon="grid">Tableau de bord</x-responsive-nav-link>
                <x-responsive-nav-link :href="route('ideas.index')" :active="request()->routeIs('ideas.*')" icon="bulb">Mes idées</x-responsive-nav-link>

                @if ($user->isAdmin())
                    <div class="my-2 border-t border-slate-100"></div>
                    <x-responsive-nav-link :href="route('admin.activities.index')" :active="request()->routeIs('admin.activities.*')" icon="settings">Gestion des activités</x-responsive-nav-link>
                    <x-responsive-nav-link :href="route('admin.ideas.index')" :active="request()->routeIs('admin.ideas.*')" icon="flag">Modération des idées</x-responsive-nav-link>
                @endif

                <x-responsive-nav-link :href="$messagesRoute" :active="request()->routeIs('messages.*') || request()->routeIs('admin.messages.*')" icon="message">
                    Messages
                    @if ($unreadMessages > 0)
                        <span class="ms-auto inline-flex min-w-5 items-center justify-center rounded-full bg-brand-600 px-1.5 py-0.5 text-[0.6875rem] font-bold text-white">
                            {{ $unreadMessages > 99 ? '99+' : $unreadMessages }}
                        </span>
                    @endif
                </x-responsive-nav-link>

                <div class="mt-3 border-t border-slate-100 pt-3">
                    <x-responsive-nav-link :href="route('profile.edit')" :active="request()->routeIs('profile.*')" icon="user">Mon profil</x-responsive-nav-link>
                    <form method="POST" action="{{ route('logout') }}">
                        @csrf
                        <button type="submit" class="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-start text-sm font-semibold text-rose-600 transition-colors duration-150 hover:bg-rose-50">
                            <x-icon name="logout" :size="18" />
                            Se déconnecter
                        </button>
                    </form>
                </div>
            @else
                <div class="mt-3 border-t border-slate-100 pt-3 space-y-2">
                    <x-responsive-nav-link :href="route('login')" icon="lock">Se connecter</x-responsive-nav-link>
                    <x-responsive-nav-link :href="route('register')" icon="plus">Créer un compte</x-responsive-nav-link>
                </div>
            @endauth
        </div>
    </div>
</nav>
