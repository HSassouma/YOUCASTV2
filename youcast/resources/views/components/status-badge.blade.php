@props(['status', 'dot' => true, 'icon' => null])

@php
    $label = is_object($status) && method_exists($status, 'label') ? $status->label() : (string) $status;
    $value = is_object($status) && isset($status->value) ? $status->value : (string) $status;

    // High clarity, modern contrast badges
    $classes = match ($value) {
        'published', 'accepted', 'registered', 'open' => 'bg-emerald-50 text-emerald-700 ring-emerald-200/80',
        'draft', 'pending' => 'bg-amber-50 text-amber-700 ring-amber-200/80',
        'closed' => 'bg-slate-100 text-slate-600 ring-slate-200/80',
        'cancelled', 'rejected', 'archived' => 'bg-rose-50 text-rose-700 ring-rose-200/80',
        default => 'bg-brand-50 text-brand-700 ring-brand-200/80',
    };

    $dotClasses = match ($value) {
        'published', 'accepted', 'registered', 'open' => 'bg-emerald-500 shadow-xs shadow-emerald-400',
        'draft', 'pending' => 'bg-amber-500 shadow-xs shadow-amber-400',
        'closed' => 'bg-slate-400',
        'cancelled', 'rejected', 'archived' => 'bg-rose-500 shadow-xs shadow-rose-400',
        default => 'bg-brand-500 shadow-xs shadow-brand-400',
    };
@endphp

<span {{ $attributes->merge(['class' => 'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset '.$classes]) }}>
    @if ($icon)
        <x-icon :name="$icon" :size="14" />
    @elseif ($dot)
        <span class="h-1.5 w-1.5 rounded-full {{ $dotClasses }}" aria-hidden="true"></span>
    @endif
    {{ $label }}
</span>
