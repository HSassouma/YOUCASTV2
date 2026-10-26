@props(['variant' => 'primary', 'size' => 'md', 'href' => null, 'icon' => null])

@php
    /**
     * The unified YouCast button component.
     * Modernized with refined rounded-xl borders, subtle shadows, accessible focus rings,
     * and smooth hover translations.
     */
    $base = 'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

    $sizes = [
        'sm' => 'min-h-9 px-3 text-xs',
        'md' => 'min-h-10 px-4 text-sm',
        'lg' => 'min-h-11 px-5 text-sm',
        'xl' => 'min-h-12 px-6 text-base font-bold',
    ];

    $variants = [
        'primary' => 'bg-gradient-to-r from-brand-700 via-brand-600 to-electric-600 text-white shadow-sm shadow-brand-500/20 hover:shadow-md hover:shadow-brand-500/30 hover:brightness-105 focus-visible:outline-brand-600',
        'secondary' => 'border border-slate-200 bg-white text-slate-700 shadow-xs hover:border-brand-300 hover:bg-brand-50/60 hover:text-brand-900 focus-visible:outline-slate-400',
        'quiet' => 'text-brand-700 hover:bg-brand-50 hover:text-brand-900 focus-visible:outline-brand-600',
        'danger' => 'bg-danger-600 text-white shadow-sm shadow-danger-500/20 hover:bg-danger-700 hover:shadow-danger-500/30 focus-visible:outline-danger-500',
        'danger-soft' => 'border border-danger-200 bg-danger-50/70 text-danger-700 hover:bg-danger-100/80 focus-visible:outline-danger-500',
        'success' => 'bg-success-600 text-white shadow-sm shadow-success-500/20 hover:bg-success-700 focus-visible:outline-success-600',
        'dark' => 'bg-night-900 text-white shadow-sm hover:bg-night-950 focus-visible:outline-night-700',
    ];

    $classes = trim($base.' '.($sizes[$size] ?? $sizes['md']).' '.($variants[$variant] ?? $variants['primary']));
    $iconSize = $size === 'xl' ? 18 : 16;
@endphp

@if ($href)
    <a href="{{ $href }}" {{ $attributes->merge(['class' => $classes]) }}>
        @if ($icon)<x-icon :name="$icon" :size="$iconSize" />@endif
        {{ $slot }}
    </a>
@else
    <button type="submit" {{ $attributes->merge(['class' => $classes]) }}>
        @if ($icon)<x-icon :name="$icon" :size="$iconSize" />@endif
        {{ $slot }}
    </button>
@endif
