<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        @include('layouts.partials.head')
    </head>
    <body class="min-h-dvh bg-page font-sans text-slate-900 antialiased selection:bg-brand-200 selection:text-brand-900">
        <a href="#main" class="skip-link">Aller au contenu principal</a>
        <div class="grid min-h-dvh lg:grid-cols-[minmax(0,1.1fr)_minmax(30rem,.9fr)]">
            <aside class="relative hidden overflow-hidden bg-gradient-to-br from-brand-950 via-night-900 to-brand-900 px-12 py-12 text-white lg:flex lg:flex-col lg:justify-between xl:px-20 xl:py-16">
                {{-- Ambient glow orbs --}}
                <div class="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-brand-600/20 blur-3xl" aria-hidden="true"></div>
                <div class="pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-electric-600/15 blur-3xl" aria-hidden="true"></div>

                <div class="relative">
                    <a href="{{ route('home') }}" class="group inline-flex items-center gap-3 transition-transform duration-200 hover:scale-[1.02]" aria-label="Accueil YouCast">
                        <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 p-2 ring-1 ring-white/20 backdrop-blur-sm">
                            <x-application-logo class="h-8 w-8 text-white" />
                        </div>
                        <span class="font-display text-2xl font-black tracking-tight text-white">YouCast</span>
                    </a>
                </div>

                <div class="relative max-w-xl py-12">
                    <div class="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-300 backdrop-blur-sm">
                        <span class="h-2 w-2 rounded-full bg-brand-400 shadow-xs shadow-brand-300"></span>
                        BDE YouCode · Plateforme Étudiante
                    </div>

                    <h1 class="mt-8 font-display text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl xl:text-6xl text-white">
                        L’énergie du campus, <span class="bg-gradient-to-r from-brand-300 via-purple-200 to-blue-300 bg-clip-text text-transparent">au même endroit.</span>
                    </h1>

                    <p class="mt-6 max-w-md text-base leading-relaxed text-slate-300">
                        Challenges techniques, hackathons, tournois et ateliers&nbsp;: rejoins une équipe et fais partie des événements qui font vibrer YouCode.
                    </p>

                    <div class="mt-10 grid max-w-lg grid-cols-3 gap-3 border-y border-white/10 py-5">
                        <div class="border-r border-white/10 pe-3">
                            <p class="text-xs font-medium text-slate-400">Défis</p>
                            <p class="mt-1 font-display text-lg font-bold text-white">Créatifs</p>
                        </div>
                        <div class="border-r border-white/10 px-3">
                            <p class="text-xs font-medium text-slate-400">Équipes</p>
                            <p class="mt-1 font-display text-lg font-bold text-white">Soudées</p>
                        </div>
                        <div class="ps-3">
                            <p class="text-xs font-medium text-slate-400">Idées</p>
                            <p class="mt-1 font-display text-lg font-bold text-white">Propulsées</p>
                        </div>
                    </div>
                </div>

                <div class="relative flex items-center justify-between text-xs text-slate-400">
                    <p>YouCast · Conçu pour les apprenants YouCode</p>
                    <span class="inline-flex items-center gap-1.5 text-brand-300">
                        <span class="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                        Campus actif
                    </span>
                </div>
            </aside>

            <div class="flex min-h-dvh flex-col items-center justify-center px-4 py-12 sm:px-8 lg:px-12">
                <div class="app-page-enter w-full max-w-md">
                    <a href="{{ route('home') }}" class="mb-8 flex items-center justify-center gap-3 text-brand-900 lg:hidden" aria-label="Accueil YouCast">
                        <x-application-logo class="h-11 w-11" />
                        <span class="font-display text-2xl font-black tracking-tight">YouCast</span>
                    </a>

                    <main id="main" class="overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-7 sm:p-9 shadow-card">
                        {{ $slot }}
                    </main>

                    <p class="mt-6 text-center text-xs text-slate-500">
                        BDE YouCode · Plateforme officielle des activités et compétitions étudiantes
                    </p>
                </div>
            </div>
        </div>
    </body>
</html>
