@props(['icon' => null])

{{-- Modern clean secondary action with soft border and subtle hover --}}
<button {{ $attributes->merge(['type' => 'button', 'class' => 'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-xs transition-all duration-150 hover:border-brand-300 hover:bg-brand-50/60 hover:text-brand-900 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400 disabled:cursor-not-allowed disabled:opacity-50']) }}>
    @if ($icon)<x-icon :name="$icon" :size="17" />@endif
    {{ $slot }}
</button>
