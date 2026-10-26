@props(['activity', 'registered' => false])

@php
    $filled = $activity->active_registrations_count ?? $activity->filledCount();
    $month = $activity->starts_at?->translatedFormat('M');
    $day = $activity->starts_at?->format('d');
    $percentage = ($activity->capacity && $activity->capacity > 0) ? min(100, round(($filled / $activity->capacity) * 100)) : 0;
@endphp

<article class="yc-activity-card group flex flex-col justify-between p-6 bg-white rounded-2xl border border-slate-200/80 shadow-card hover:shadow-cardHover transition-all duration-300">
    <div>
        <div class="relative flex items-start justify-between gap-4">
            <div class="flex items-start gap-3.5">
                @if ($activity->starts_at)
                    <div class="date-tile shrink-0 shadow-xs">
                        <span class="date-tile-day">{{ $day }}</span>
                        <span class="date-tile-month">{{ $month }}</span>
                    </div>
                @else
                    <span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-100">
                        <x-icon name="calendar" :size="20" />
                    </span>
                @endif

                <div class="min-w-0 flex-1 pt-0.5">
                    <span class="inline-flex items-center gap-1.5 rounded-md bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-700">
                        {{ $activity->type->label() }}
                    </span>
                    <h3 class="yc-break-anywhere mt-2 text-lg font-bold leading-snug tracking-tight text-slate-900 group-hover:text-brand-600 transition-colors">
                        <a href="{{ route('activities.show', $activity) }}" class="focus-visible:text-brand-700">
                            {{ $activity->title }}
                        </a>
                    </h3>
                </div>
            </div>
        </div>

        <p class="yc-activity-description mt-4 text-sm leading-relaxed text-slate-600">{{ $activity->description }}</p>

        <dl class="mt-5 space-y-2 border-t border-slate-100 pt-4">
            @if ($activity->location)
                <div class="flex min-w-0 items-center gap-2 text-xs font-medium text-slate-600">
                    <x-icon name="pin" :size="15" class="shrink-0 text-brand-600" />
                    <dt class="sr-only">Lieu</dt>
                    <dd class="min-w-0 truncate">{{ $activity->location }}</dd>
                </div>
            @endif

            <div class="flex min-w-0 items-center gap-2 text-xs font-medium text-slate-600">
                <x-icon name="clock" :size="15" class="shrink-0 text-brand-600" />
                <dt class="sr-only">Date limite d'inscription</dt>
                <dd class="truncate">
                    @if ($activity->registration_deadline)
                        Jusqu'au {{ $activity->registration_deadline->format('d M Y') }}
                    @else
                        Inscription ouverte
                    @endif
                </dd>
            </div>

            <div class="space-y-1">
                <div class="flex min-w-0 items-center justify-between gap-2 text-xs font-medium text-slate-600">
                    <div class="flex items-center gap-2">
                        <x-icon name="ticket" :size="15" class="shrink-0 text-brand-600" />
                        <dt class="sr-only">Places</dt>
                        <dd>
                            @if ($activity->capacity)
                                {{ $filled }} / {{ $activity->capacity }} places
                            @else
                                Places illimitées
                            @endif
                        </dd>
                    </div>
                    @if ($activity->capacity)
                        <span class="text-[0.6875rem] font-bold text-slate-400">{{ $percentage }}%</span>
                    @endif
                </div>
                @if ($activity->capacity)
                    <div class="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                        <div class="h-full rounded-full bg-gradient-to-r from-brand-600 to-electric-600 transition-all duration-300" style="width: {{ $percentage }}%"></div>
                    </div>
                @endif
            </div>

            @if ($activity->usesTeams())
                <div class="flex items-center gap-2 text-xs font-medium text-slate-600">
                    <x-icon name="users" :size="15" class="shrink-0 text-brand-600" />
                    <dt class="sr-only">Taille d'équipe</dt>
                    <dd>Équipe de {{ $activity->min_team_size }} à {{ $activity->max_team_size }} membres</dd>
                </div>
            @endif
        </dl>
    </div>

    <div class="relative mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
        @if ($registered)
            <span class="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200">
                <x-icon name="check-circle" :size="14" />
                Inscrit
            </span>
        @else
            <x-status-badge :status="$activity->status" />
        @endif

        <a href="{{ route('activities.show', $activity) }}" class="inline-flex min-h-9 items-center gap-1.5 rounded-xl bg-slate-50 px-3.5 text-xs font-semibold text-brand-700 ring-1 ring-inset ring-slate-200/80 transition-all duration-200 hover:bg-brand-600 hover:text-white hover:ring-brand-600">
            Découvrir
            <x-icon name="arrow-right" :size="14" class="transition-transform duration-200 group-hover:translate-x-0.5" />
        </a>
    </div>
</article>
