@props(['disabled' => false])

<textarea @disabled($disabled) {{ $attributes->merge(['class' => 'block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-xs transition-all duration-150 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/15 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400']) }}>{{ $slot }}</textarea>
