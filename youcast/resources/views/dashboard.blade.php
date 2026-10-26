<x-app-layout>
    <x-slot name="title">{{ $isAdmin ? 'Tableau de bord BDE' : 'Mon tableau de bord' }} — YouCast</x-slot>

    <x-slot name="header">
        <x-page-header
            :title="$isAdmin ? 'Tableau de bord BDE' : 'Bonjour '.auth()->user()->name"
            :subtitle="$isAdmin
                ? 'Suivez les activités publiées, les inscriptions et les idées en attente de modération.'
                : 'Retrouvez vos inscriptions, vos idées et les prochaines sessions ouvertes.'">
            @unless ($isAdmin)
                <x-slot name="actions">
                    <x-button href="{{ route('activities.index') }}" icon="calendar">Découvrir les activités</x-button>
                </x-slot>
            @endunless
        </x-page-header>
    </x-slot>

    <div>
        <x-flash />

        @if ($isAdmin)
            {{-- Modern Key Figures Grid --}}
            <section aria-labelledby="stats-title" class="mb-8">
                <h2 id="stats-title" class="sr-only">Chiffres clés</h2>
                <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    @foreach ([
                        ['calendar', 'Activités publiées', $stats['published'], 'actives au catalogue', 'from-brand-500/15 to-brand-500/5', 'text-brand-700'],
                        ['flag', 'Brouillons', $stats['drafts'], 'en attente de parution', 'from-amber-500/15 to-amber-500/5', 'text-amber-700'],
                        ['users', 'Inscriptions', $stats['registrations'], 'étudiants inscrits', 'from-emerald-500/15 to-emerald-500/5', 'text-emerald-700'],
                        ['bulb', 'Idées à modérer', $stats['pending_ideas'], 'propositions en attente', 'from-purple-500/15 to-purple-500/5', 'text-purple-700'],
                        ['message', 'Messages non lus', $unreadMessages, 'questions du campus', 'from-blue-500/15 to-blue-500/5', 'text-blue-700'],
                    ] as [$icon, $label, $value, $hint, $bgGradient, $iconColor])
                        <div class="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-card hover:shadow-cardHover transition-all duration-200">
                            <div class="flex items-start justify-between gap-3">
                                <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br {{ $bgGradient }} {{ $iconColor }}">
                                    <x-icon :name="$icon" :size="20" />
                                </span>
                                <p class="font-display text-3xl font-extrabold tracking-tight text-slate-900">{{ $value }}</p>
                            </div>
                            <p class="mt-3.5 text-xs font-bold uppercase tracking-wider text-slate-600">{{ $label }}</p>
                            <p class="mt-0.5 text-xs text-slate-500">{{ $hint }}</p>
                        </div>
                    @endforeach
                </div>
            </section>

            <div class="grid gap-6 lg:grid-cols-2">
                <section class="panel overflow-hidden">
                    <header class="panel-header bg-slate-50/50">
                        <div class="flex items-center gap-2">
                            <span class="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                                <x-icon name="calendar" :size="15" />
                            </span>
                            <h2 class="text-sm font-bold text-slate-900">Dernières activités</h2>
                        </div>
                        <a href="{{ route('admin.activities.index') }}" class="text-xs font-bold text-brand-700 hover:text-brand-900 transition-colors">Gérer les activités →</a>
                    </header>
                    <ul class="divide-y divide-slate-100">
                        @forelse ($recentActivities as $activity)
                            <li class="flex items-center justify-between gap-4 px-6 py-4 hover:bg-slate-50/60 transition-colors">
                                <div class="min-w-0">
                                    <a href="{{ route('admin.activities.show', $activity) }}" class="block truncate text-sm font-bold text-slate-900 hover:text-brand-700 transition-colors">
                                        {{ $activity->title }}
                                    </a>
                                    <p class="mt-0.5 text-xs text-slate-500">{{ $activity->type->label() }}</p>
                                </div>
                                <x-status-badge :status="$activity->status" />
                            </li>
                        @empty
                            <li class="px-6 py-8 text-center text-sm text-slate-500">Aucune activité pour le moment.</li>
                        @endforelse
                    </ul>
                </section>

                <section class="panel overflow-hidden">
                    <header class="panel-header bg-slate-50/50">
                        <div class="flex items-center gap-2">
                            <span class="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                                <x-icon name="flag" :size="15" />
                            </span>
                            <h2 class="text-sm font-bold text-slate-900">Idées à modérer</h2>
                        </div>
                        <a href="{{ route('admin.ideas.index') }}" class="text-xs font-bold text-brand-700 hover:text-brand-900 transition-colors">Toutes les idées →</a>
                    </header>
                    <ul class="divide-y divide-slate-100">
                        @forelse ($pendingIdeas as $idea)
                            <li class="px-6 py-4 hover:bg-slate-50/60 transition-colors">
                                <a href="{{ route('admin.ideas.show', $idea) }}" class="block truncate text-sm font-bold text-slate-900 hover:text-brand-700 transition-colors">
                                    {{ $idea->title }}
                                </a>
                                <p class="mt-0.5 text-xs text-slate-500">Proposée par {{ $idea->author?->name ?? 'Compte supprimé' }}</p>
                            </li>
                        @empty
                            <li class="px-6 py-8 text-center text-sm text-slate-500">Aucune idée en attente de modération.</li>
                        @endforelse
                    </ul>
                </section>
            </div>
        @else
            {{-- Student Dashboard --}}
            <div class="grid gap-6 lg:grid-cols-12">
                <div class="space-y-6 lg:col-span-8">
                    <section class="panel overflow-hidden">
                        <header class="panel-header bg-slate-50/50">
                            <div class="flex items-center gap-2">
                                <span class="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                                    <x-icon name="check-circle" :size="15" />
                                </span>
                                <h2 class="text-sm font-bold text-slate-900">Mes inscriptions</h2>
                            </div>
                            <a href="{{ route('activities.index') }}" class="text-xs font-bold text-brand-700 hover:text-brand-900 transition-colors">+ S'inscrire à une activité</a>
                        </header>
                        <ul class="divide-y divide-slate-100">
                            @forelse ($registrations as $registration)
                                <li class="flex items-center justify-between gap-4 px-6 py-4 hover:bg-slate-50/60 transition-colors">
                                    <div class="min-w-0">
                                        <a href="{{ route('activities.show', $registration->activity) }}" class="block truncate text-sm font-bold text-slate-900 hover:text-brand-700 transition-colors">
                                            {{ $registration->activity->title }}
                                        </a>
                                        <p class="mt-0.5 text-xs text-slate-500">{{ $registration->activity->type->label() }}</p>
                                    </div>
                                    <x-status-badge :status="$registration->status" />
                                </li>
                            @empty
                                <li class="px-6 py-10 text-center">
                                    <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                                        <x-icon name="calendar" :size="22" />
                                    </div>
                                    <p class="mt-3 text-sm font-semibold text-slate-800">Vous n'avez pas encore d'inscription active.</p>
                                    <p class="mt-1 text-xs text-slate-500">Parcourez le catalogue pour rejoindre un atelier ou un hackathon.</p>
                                    <div class="mt-4">
                                        <x-button href="{{ route('activities.index') }}" size="sm">Voir les activités ouvertes</x-button>
                                    </div>
                                </li>
                            @endforelse
                        </ul>
                    </section>

                    <section>
                        <div class="flex items-center justify-between mb-4">
                            <h2 class="font-display text-lg font-bold text-slate-900">Prochaines sessions ouvertes</h2>
                            <a href="{{ route('activities.index') }}" class="text-xs font-bold text-brand-700 hover:text-brand-900">Catalogue complet →</a>
                        </div>
                        <div class="grid gap-5 sm:grid-cols-2">
                            @forelse ($openActivities as $activity)
                                <x-activity-card :activity="$activity" />
                            @empty
                                <span class="sm:col-span-2">
                                    <x-empty-state title="Aucune session ouverte" icon="calendar">
                                        Revenez bientôt : le BDE publie de nouvelles sessions régulièrement.
                                    </x-empty-state>
                                </span>
                            @endforelse
                        </div>
                    </section>
                </div>

                <div class="space-y-6 lg:col-span-4">
                    <section class="panel overflow-hidden">
                        <header class="panel-header bg-slate-50/50">
                            <div class="flex items-center gap-2">
                                <span class="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                                    <x-icon name="bulb" :size="15" />
                                </span>
                                <h2 class="text-sm font-bold text-slate-900">Mes propositions d'idées</h2>
                            </div>
                            <a href="{{ route('ideas.create') }}" class="text-xs font-bold text-brand-700 hover:text-brand-900">+ Proposer</a>
                        </header>
                        <ul class="divide-y divide-slate-100">
                            @forelse ($ideas as $idea)
                                <li class="flex items-center justify-between gap-3 px-6 py-4 hover:bg-slate-50/60 transition-colors">
                                    <span class="min-w-0 truncate text-sm font-semibold text-slate-800">{{ $idea->title }}</span>
                                    <x-status-badge :status="$idea->status" />
                                </li>
                            @empty
                                <li class="px-6 py-8 text-center text-xs text-slate-500">
                                    Aucune idée envoyée. Une envie de défi ? Partage-la avec le BDE !
                                </li>
                            @endforelse
                        </ul>
                    </section>

                    {{-- Help & BDE Direct Message Banner --}}
                    <section class="rounded-2xl border border-brand-200/80 bg-gradient-to-br from-brand-900 via-night-900 to-brand-950 p-6 text-white shadow-card">
                        <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-brand-300 ring-1 ring-white/20">
                            <x-icon name="message" :size="20" />
                        </span>
                        <h2 class="mt-4 font-display text-base font-bold text-white">Une question ou suggestion ?</h2>
                        <p class="mt-1.5 text-xs leading-relaxed text-slate-300">
                            Échange en privé avec l’équipe du BDE YouCode pour toute question sur les activités ou les inscriptions.
                        </p>
                        <div class="mt-5">
                            <a href="{{ route('messages.create') }}" class="inline-flex min-h-10 items-center justify-center gap-2 w-full rounded-xl bg-white px-4 text-xs font-bold text-slate-950 shadow-sm transition hover:bg-slate-100">
                                <x-icon name="plus" :size="14" />
                                Écrire au BDE
                            </a>
                        </div>
                    </section>
                </div>
            </div>
        @endif
    </div>
</x-app-layout>
