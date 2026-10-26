@props(['icon' => null])

{{-- Modern danger action with controlled shadow and crimson hover --}}
<button {{ $attributes->merge(['type' => 'submit', 'class' => 'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-danger-600 px-5 text-sm font-semibold text-white shadow-sm shadow-danger-500/20 transition-all duration-150 hover:bg-danger-700 hover:shadow-danger-500/30 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-danger-500 disabled:cursor-not-allowed disabled:opacity-50']) }}>
    @if ($icon)<x-icon :name="$icon" :size="17" />@endif
    {{ $slot }}
</button>
