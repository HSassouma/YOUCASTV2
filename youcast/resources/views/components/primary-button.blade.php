@props(['icon' => null])

{{-- Modern violet/indigo brand submit action with smooth hover & focus --}}
<button {{ $attributes->merge(['type' => 'submit', 'class' => 'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-700 via-brand-600 to-electric-600 px-5 text-sm font-semibold text-white shadow-sm shadow-brand-500/20 transition-all duration-150 hover:shadow-md hover:shadow-brand-500/30 hover:brightness-105 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:cursor-not-allowed disabled:opacity-50']) }}>
    @if ($icon)<x-icon :name="$icon" :size="17" />@endif
    {{ $slot }}
</button>
