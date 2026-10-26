@props(['disabled' => false])

<input @disabled($disabled) {{ $attributes->merge(['class' => 'block min-h-11 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-base text-slate-900 shadow-xs transition-all duration-150 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/15 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400']) }}>
