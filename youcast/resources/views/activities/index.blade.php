<x-app-layout>
    <x-slot name="title">Catalogue des activités — YouCast</x-slot>

    <x-slot name="header">
        <x-page-header
            title="Activités & Défis"
            subtitle="Toutes les sessions et événements organisés par le BDE : hackathons, ateliers, tournois et rencontres.">
            @auth
                <x-slot name="actions">
                    <x-button href="{{ route('dashboard') }}" variant="secondary" icon="grid">Mon tableau de bord</x-button>
                </x-slot>
            @endauth
        </x-page-header>
    </x-slot>

    <div>
        <x-flash />

        {{-- Filter Bar --}}
        <form method="GET" class="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-card">
            <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 items-end">
                <div class="lg:col-span-2">
                    <label for="q" class="block text-xs font-bold uppercase tracking-wider text-slate-600">Rechercher une activité</label>
                    <x-text-input id="q" name="q" value="{{ $filters['q'] }}" placeholder="Titre, mot-clé, lieu..." class="mt-1.5" />
                </div>
                <div>
                    <label for="type" class="block text-xs font-bold uppercase tracking-wider text-slate-600">Format</label>
                    <x-select-input id="type" name="type" class="mt-1.5">
                        <option value="">Tous les types</option>
                        @foreach ($types as $type)
                            <option value="{{ $type->value }}" @selected($filters['type'] === $type->value)>{{ $type->label() }}</option>
                        @endforeach
                    </x-select-input>
                </div>
                <div>
                    <label for="category" class="block text-xs font-bold uppercase tracking-wider text-slate-600">Catégorie</label>
                    <x-select-input id="category" name="category" class="mt-1.5">
                        <option value="">Toutes les catégories</option>
                        @foreach ($categories as $category)
                            <option value="{{ $category }}" @selected($filters['category'] === $category)>{{ $category }}</option>
                        @endforeach
                    </x-select-input>
                </div>
                <div class="flex items-center gap-3">
                    <label class="inline-flex min-h-11 items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                        <input type="checkbox" name="open" value="1" class="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500" @checked($filters['open'] === '1')>
                        Inscriptions ouvertes
                    </label>
                    <x-button size="lg" class="ms-auto shrink-0">Filtrer</x-button>
                </div>
            </div>
        </form>

        @if ($activities->isEmpty())
            <div class="mt-8 rounded-2xl border border-slate-200/90 bg-white p-12 text-center shadow-card">
                <x-empty-state title="Aucune activité ne correspond à vos filtres" icon="search">
                    Modifiez vos critères de recherche ou réinitialisez les filtres pour découvrir toutes les activités.
                </x-empty-state>
            </div>
        @else
            <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                @foreach ($activities as $activity)
                    <x-activity-card :activity="$activity" :registered="in_array($activity->id, $registeredActivityIds, true)" />
                @endforeach
            </div>
            <div class="mt-8">{{ $activities->links() }}</div>
        @endif
    </div>
</x-app-layout>
