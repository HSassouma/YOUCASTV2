<x-app-layout>
    <x-slot name="title">Gestion des activités — YouCast Admin</x-slot>

    <x-slot name="header">
        <x-page-header
            title="Gestion des activités"
            subtitle="Créez, publiez, modifiez et suivez les inscriptions aux sessions du BDE.">
            <x-slot name="actions">
                <x-button href="{{ route('admin.activities.create') }}" icon="plus">Nouvelle activité</x-button>
            </x-slot>
        </x-page-header>
    </x-slot>

    <div>
        <x-flash />

        {{-- Filter Card --}}
        <form method="GET" class="rounded-2xl border border-slate-200/90 bg-white mb-6 p-5 sm:p-6 shadow-card">
            <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 items-end">
                <div class="lg:col-span-2">
                    <label for="q" class="block text-xs font-bold uppercase tracking-wider text-slate-600">Rechercher</label>
                    <x-text-input id="q" name="q" value="{{ $filters['q'] }}" placeholder="Titre, catégorie ou mot-clé..." class="mt-1.5" />
                </div>
                <div>
                    <label for="status" class="block text-xs font-bold uppercase tracking-wider text-slate-600">Statut</label>
                    <x-select-input id="status" name="status" class="mt-1.5">
                        <option value="">Tous les statuts</option>
                        @foreach ($statuses as $status)
                            <option value="{{ $status->value }}" @selected($filters['status'] === $status->value)>{{ $status->label() }}</option>
                        @endforeach
                    </x-select-input>
                </div>
                <div>
                    <x-button size="lg" class="w-full justify-center">Filtrer les sessions</x-button>
                </div>
            </div>
        </form>

        @if ($activities->isEmpty())
            <div class="rounded-2xl border border-slate-200/90 bg-white p-12 text-center shadow-card">
                <x-empty-state title="Aucune activité trouvée" icon="calendar" actionHref="{{ route('admin.activities.create') }}" actionLabel="Créer une activité">
                    Les sessions publiées ou en brouillon par le BDE apparaîtront ici.
                </x-empty-state>
            </div>
        @else
            <div class="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-card">
                <div class="overflow-x-auto">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th scope="col">Titre de l'activité</th>
                                <th scope="col">Format</th>
                                <th scope="col">Statut</th>
                                <th scope="col">Taux d'inscriptions</th>
                                <th scope="col" class="text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($activities as $activity)
                                <tr class="hover:bg-slate-50/80 transition-colors">
                                    <td class="font-bold text-slate-900">
                                        <a href="{{ route('admin.activities.show', $activity) }}" class="hover:text-brand-600 transition-colors">
                                            {{ $activity->title }}
                                        </a>
                                    </td>
                                    <td class="text-slate-600">
                                        <span class="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
                                            {{ $activity->type->label() }}
                                        </span>
                                    </td>
                                    <td><x-status-badge :status="$activity->status" /></td>
                                    <td class="text-slate-700 font-medium">
                                        <div class="flex items-center gap-2">
                                            <span>{{ $activity->active_registrations_count }}{{ $activity->capacity ? ' / '.$activity->capacity : ' inscrits' }}</span>
                                            @if ($activity->capacity && $activity->capacity > 0)
                                                @php $p = min(100, round(($activity->active_registrations_count / $activity->capacity) * 100)); @endphp
                                                <div class="h-1.5 w-16 overflow-hidden rounded-full bg-slate-100">
                                                    <div class="h-full rounded-full bg-brand-600" style="width: {{ $p }}%"></div>
                                                </div>
                                            @endif
                                        </div>
                                    </td>
                                    <td class="text-right">
                                        <a href="{{ route('admin.activities.show', $activity) }}" class="inline-flex items-center gap-1.5 rounded-lg bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-700 transition hover:bg-brand-600 hover:text-white">
                                            Gérer
                                            <x-icon name="chevron-right" :size="13" />
                                        </a>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="mt-8">{{ $activities->links() }}</div>
        @endif
    </div>
</x-app-layout>
