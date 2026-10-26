<x-site-layout>
    <x-slot name="title">YouCast — La vie du BDE YouCode, côté pratique</x-slot>

    {{-- Hero Section --}}
    <section class="yc-home-hero relative overflow-hidden">
        <div class="pointer-events-none absolute -left-24 top-0 h-96 w-96 rounded-full bg-brand-500/10 blur-3xl"></div>
        <div class="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-electric-500/10 blur-3xl"></div>

        <div class="mx-auto max-w-content px-4 pb-20 pt-16 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8 lg:pb-28 lg:pt-24">
            <div class="grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
                <div class="max-w-2xl">
                    <div class="yc-enter inline-flex items-center gap-2.5 rounded-full border border-brand-200 bg-brand-50/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-800 shadow-xs" style="--yc-delay:.04s">
                        <span class="flex h-2 w-2 rounded-full bg-brand-600 animate-pulse"></span>
                        Plateforme officielle BDE YouCode
                    </div>

                    <h1 class="yc-enter mt-6 font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl" style="--yc-delay:.1s">
                        On apprend <span class="bg-gradient-to-r from-brand-600 via-brand-700 to-electric-600 bg-clip-text text-transparent">en faisant.</span>
                        <span class="block text-night-900">On avance ensemble.</span>
                    </h1>

                    <p class="yc-enter mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg" style="--yc-delay:.18s">
                        Challenges, hackathons, tournois et ateliers du BDE&nbsp;: découvre les activités à venir,
                        forme ton équipe avec un code d'invitation et propulse tes idées sur le campus.
                    </p>

                    <div class="yc-enter mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center" style="--yc-delay:.26s">
                        @guest
                            <a href="{{ route('register') }}" class="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-700 via-brand-600 to-electric-600 px-6 text-sm font-bold text-white shadow-md shadow-brand-500/20 transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/35 hover:brightness-105 active:scale-[0.98]">
                                Rejoindre YouCast
                                <x-icon name="arrow-right" :size="17" />
                            </a>
                            <a href="{{ route('login') }}" class="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-800 shadow-xs transition-all duration-200 hover:border-brand-300 hover:bg-brand-50/60 active:scale-[0.98]">
                                J’ai déjà un compte
                            </a>
                        @else
                            <a href="{{ route('dashboard') }}" class="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-700 via-brand-600 to-electric-600 px-6 text-sm font-bold text-white shadow-md shadow-brand-500/20 transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/35 hover:brightness-105 active:scale-[0.98]">
                                Accéder à mon espace
                                <x-icon name="arrow-right" :size="17" />
                            </a>
                            <a href="{{ route('about') }}" class="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-800 shadow-xs transition-all duration-200 hover:border-brand-300 hover:bg-brand-50/60 active:scale-[0.98]">
                                Découvrir YouCast
                            </a>
                        @endguest
                    </div>

                    <div class="yc-enter mt-9 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-slate-200/80 pt-6 text-xs font-semibold text-slate-600" style="--yc-delay:.34s">
                        <span class="inline-flex items-center gap-2">
                            <span class="flex h-5 w-5 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                                <x-icon name="users" :size="13" />
                            </span>
                            Apprendre entre pairs
                        </span>
                        <span class="inline-flex items-center gap-2">
                            <span class="flex h-5 w-5 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                                <x-icon name="bulb" :size="13" />
                            </span>
                            Faire grandir les idées
                        </span>
                        <span class="inline-flex items-center gap-2">
                            <span class="flex h-5 w-5 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                                <x-icon name="message" :size="13" />
                            </span>
                            Échanges directs BDE
                        </span>
                    </div>
                </div>

                {{-- Visual Showcase Card --}}
                <div class="yc-home-art yc-enter relative overflow-hidden rounded-3xl p-8 sm:p-10 shadow-raised" style="--yc-delay:.2s">
                    <div class="relative flex items-center justify-between gap-4 border-b border-white/10 pb-6">
                        <div>
                            <p class="text-xs font-bold uppercase tracking-wider text-brand-300">Le Cycle YouCast</p>
                            <p class="text-xs text-slate-400 mt-0.5">Parcours d’un événement campus</p>
                        </div>
                        <span class="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-electric-600 text-sm font-bold text-white shadow-sm shadow-brand-500/30">
                            YC
                        </span>
                    </div>

                    <ol class="relative mt-3 space-y-2">
                        <li class="yc-home-step grid grid-cols-[3rem_1fr] gap-4 py-5">
                            <span class="yc-home-step-number pt-0.5 font-display text-2xl font-black text-brand-400">01</span>
                            <div>
                                <h2 class="font-display text-lg font-bold text-white sm:text-xl">Une idée prend forme</h2>
                                <p class="mt-1 text-xs leading-relaxed text-slate-300">Chacun propose un challenge ou une activité pour animer la communauté.</p>
                            </div>
                        </li>
                        <li class="yc-home-step grid grid-cols-[3rem_1fr] gap-4 py-5">
                            <span class="yc-home-step-number pt-0.5 font-display text-2xl font-black text-brand-400">02</span>
                            <div>
                                <h2 class="font-display text-lg font-bold text-white sm:text-xl">On construit à plusieurs</h2>
                                <p class="mt-1 text-xs leading-relaxed text-slate-300">Inscriptions solo ou équipes avec code d'invitation pour collaborer sans friction.</p>
                            </div>
                        </li>
                        <li class="yc-home-step grid grid-cols-[3rem_1fr] gap-4 py-5">
                            <span class="yc-home-step-number pt-0.5 font-display text-2xl font-black text-brand-400">03</span>
                            <div>
                                <h2 class="font-display text-lg font-bold text-white sm:text-xl">Le savoir circule</h2>
                                <p class="mt-1 text-xs leading-relaxed text-slate-300">Retours d'expérience, classements, partage et esprit d'entraide YouCode.</p>
                            </div>
                        </li>
                    </ol>

                    <div class="relative mt-4 flex items-center justify-between border-t border-white/10 pt-5 text-xs">
                        <span class="font-semibold text-brand-300">Pensé pour les apprenants.</span>
                        <span class="text-slate-400">Porté par le BDE.</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- Value Pillars Section --}}
    <section class="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div class="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-16 items-start">
            <div>
                <span class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-700">
                    <span class="h-1.5 w-1.5 rounded-full bg-brand-600"></span>
                    L’esprit YouCode
                </span>
                <h2 class="mt-3 font-display text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
                    La meilleure façon d’apprendre, c’est de faire.
                </h2>
            </div>
            <div>
                <p class="text-base leading-relaxed text-slate-600 sm:text-lg">
                    YouCode met la personne au centre, encourage les projets concrets et fait de l’entraide une force.
                    YouCast prolonge cet esprit dans la vie associative du BDE&nbsp;: proposer, participer et réaliser ensemble dans un environnement moderne et stimulant.
                </p>
                <a href="{{ route('about') }}" class="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-700 hover:text-brand-900 transition-colors group">
                    <span>En savoir plus sur la plateforme</span>
                    <x-icon name="arrow-right" :size="16" class="transition-transform group-hover:translate-x-1 text-brand-600" />
                </a>
            </div>
        </div>

        <div class="mt-16 grid gap-6 sm:grid-cols-3">
            <article class="rounded-2xl border border-slate-200/90 bg-white p-7 shadow-card hover:shadow-cardHover transition-all duration-200">
                <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700 font-display text-xl font-bold">
                    01
                </div>
                <h3 class="mt-5 font-display text-xl font-bold text-slate-900">Proposer</h3>
                <p class="mt-2 text-sm leading-relaxed text-slate-600">Une idée de défi, hackathon ou atelier peut devenir le prochain grand rendez-vous du campus YouCode.</p>
            </article>

            <article class="rounded-2xl border border-slate-200/90 bg-white p-7 shadow-card hover:shadow-cardHover transition-all duration-200">
                <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700 font-display text-xl font-bold">
                    02
                </div>
                <h3 class="mt-5 font-display text-xl font-bold text-slate-900">Participer</h3>
                <p class="mt-2 text-sm leading-relaxed text-slate-600">Inscris-toi en un clic aux événements actifs, rejoins une équipe et mesure tes compétences.</p>
            </article>

            <article class="rounded-2xl border border-slate-200/90 bg-white p-7 shadow-card hover:shadow-cardHover transition-all duration-200">
                <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700 font-display text-xl font-bold">
                    03
                </div>
                <h3 class="mt-5 font-display text-xl font-bold text-slate-900">Partager</h3>
                <p class="mt-2 text-sm leading-relaxed text-slate-600">Collabore avec d'autres promos, partage tes connaissances et contacte directement l'équipe BDE.</p>
            </article>
        </div>
    </section>

    {{-- Bottom CTA Banner --}}
    <section class="bg-gradient-to-r from-brand-950 via-night-900 to-brand-900 text-white relative overflow-hidden">
        <div class="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-brand-600/20 blur-3xl"></div>
        <div class="mx-auto flex max-w-content flex-col gap-6 px-4 py-14 sm:px-6 sm:py-16 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div class="max-w-2xl">
                <span class="inline-flex items-center gap-2 rounded-full bg-brand-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-300">
                    À toi de jouer
                </span>
                <h2 class="mt-3 font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl text-white">
                    La prochaine idée peut venir de toi.
                </h2>
                <p class="mt-2.5 max-w-xl text-sm leading-relaxed text-slate-300">
                    Rejoins YouCast dès aujourd'hui pour consulter le calendrier, t'inscrire aux défis et former ton équipe.
                </p>
            </div>
            <div class="shrink-0">
                @guest
                    <a href="{{ route('register') }}" class="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-7 text-sm font-bold text-brand-950 shadow-md transition-all duration-200 hover:bg-slate-100 hover:shadow-lg active:scale-[0.98]">
                        Créer mon compte
                        <x-icon name="arrow-right" :size="17" />
                    </a>
                @else
                    <a href="{{ route('dashboard') }}" class="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-7 text-sm font-bold text-brand-950 shadow-md transition-all duration-200 hover:bg-slate-100 hover:shadow-lg active:scale-[0.98]">
                        Accéder à mon espace
                        <x-icon name="arrow-right" :size="17" />
                    </a>
                @endguest
            </div>
        </div>
    </section>
</x-site-layout>
