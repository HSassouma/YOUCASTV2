<x-guest-layout>
    <x-slot name="title">Créer un compte — YouCast</x-slot>

    <div>
        <div class="flex items-center gap-2">
            <span class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                <x-icon name="plus" :size="17" />
            </span>
            <span class="text-xs font-bold uppercase tracking-wider text-brand-700">Inscription Étudiante</span>
        </div>

        <h1 class="mt-4 font-display text-2xl font-extrabold tracking-tight text-slate-900">Rejoindre la communauté YouCast</h1>
        <p class="mt-1.5 text-xs text-slate-500">Créez votre profil pour participer aux hackathons, tournois et défis.</p>

        <form method="POST" action="{{ route('register') }}" class="mt-6 space-y-4">
            @csrf

            <div>
                <x-input-label for="name" value="Nom complet" required />
                <x-text-input id="name" name="name" type="text" :value="old('name')" required autofocus autocomplete="name" class="mt-1.5" placeholder="ex. Yassine Bennani" />
                <x-input-error :messages="$errors->get('name')" class="mt-2" />
            </div>

            <div>
                <x-input-label for="email" value="Adresse e-mail YouCode" required />
                <x-text-input id="email" name="email" type="email" :value="old('email')" required autocomplete="username" class="mt-1.5" placeholder="etudiant@youcode.ma" />
                <x-input-error :messages="$errors->get('email')" class="mt-2" />
            </div>

            <div>
                <x-input-label for="password" value="Mot de passe" required />
                <x-text-input id="password" name="password" type="password" required autocomplete="new-password" class="mt-1.5" placeholder="••••••••" />
                <p class="mt-1 text-[0.6875rem] text-slate-400">Minimum 8 caractères sécurisés.</p>
                <x-input-error :messages="$errors->get('password')" class="mt-2" />
            </div>

            <div>
                <x-input-label for="password_confirmation" value="Confirmation du mot de passe" required />
                <x-text-input id="password_confirmation" name="password_confirmation" type="password" required autocomplete="new-password" class="mt-1.5" placeholder="••••••••" />
                <x-input-error :messages="$errors->get('password_confirmation')" class="mt-2" />
            </div>

            <div class="pt-2">
                <x-primary-button class="w-full justify-center">Créer mon compte YouCast</x-primary-button>
            </div>
        </form>

        <p class="mt-8 border-t border-slate-100 pt-6 text-center text-xs text-slate-500">
            Vous avez déjà un compte ?
            <a href="{{ route('login') }}" class="font-bold text-brand-700 hover:text-brand-900 hover:underline">Se connecter directement</a>
        </p>
    </div>
</x-guest-layout>
