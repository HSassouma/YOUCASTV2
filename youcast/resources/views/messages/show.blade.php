<x-app-layout width="read">
    <x-slot name="title">{{ $conversation->subject }} — YouCast</x-slot>

    <x-slot name="header">
        <x-page-header
            :title="$conversation->subject"
            subtitle="Ouverte le {{ $conversation->created_at->translatedFormat('d M Y') }}"
            backHref="{{ route('messages.index') }}"
            backLabel="Mes messages">
            <x-slot name="badge">
                <x-status-badge :status="$conversation->status" />
            </x-slot>
        </x-page-header>
    </x-slot>

    <div>
        <x-flash />

        <ol class="space-y-4">
            @forelse ($conversation->messages as $message)
                @php $mine = $message->user_id === auth()->id(); @endphp
                <li class="flex flex-col {{ $mine ? 'items-end' : 'items-start' }}">
                    <div class="max-w-[85%] rounded-2xl border p-4 sm:max-w-[75%] shadow-xs {{ $mine ? 'border-brand-600 bg-gradient-to-r from-brand-700 via-brand-600 to-electric-600 text-white shadow-sm shadow-brand-500/20' : 'border-slate-200/90 bg-white text-slate-800' }}">
                        <p class="flex flex-wrap items-center gap-2 text-xs font-semibold {{ $mine ? 'text-brand-100' : 'text-slate-700' }}">
                            <span>{{ $mine ? 'Vous' : ($message->author?->name ?? 'Compte supprimé') }}</span>
                            @unless ($mine)
                                <span class="rounded-full bg-brand-100 px-2 py-0.5 text-[0.625rem] font-bold uppercase tracking-wider text-brand-800">Équipe BDE</span>
                            @endunless
                            <time class="font-normal {{ $mine ? 'text-brand-200' : 'text-slate-400' }}" datetime="{{ $message->created_at->toIso8601String() }}">
                                {{ $message->created_at->translatedFormat('d M à H:i') }}
                            </time>
                        </p>
                        <p class="mt-2 whitespace-pre-line break-words text-sm leading-relaxed {{ $mine ? 'text-white' : 'text-slate-800' }}">
                            {{ $message->body }}
                        </p>
                    </div>
                </li>
            @empty
                <li class="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-8 text-center text-sm text-slate-500">
                    Aucun message dans cette conversation.
                </li>
            @endforelse
        </ol>

        <div class="mt-8">
            @can('reply', $conversation)
                <form method="POST" action="{{ route('messages.replies.store', $conversation) }}" class="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-card">
                    @csrf

                    <x-input-label for="body" value="Votre réponse" required />
                    <x-textarea-input id="body" name="body" rows="4" required maxlength="4000" class="mt-1.5" placeholder="Écrivez votre message ici...">{{ old('body') }}</x-textarea-input>
                    <x-input-error :messages="$errors->get('body')" class="mt-2" />

                    <div class="mt-4 flex items-center justify-between gap-4">
                        <p class="text-xs text-slate-500">Visible uniquement par vous et l'équipe BDE.</p>
                        <x-primary-button icon="send">Envoyer la réponse</x-primary-button>
                    </div>
                </form>
            @else
                <div class="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-center text-xs text-slate-500">
                    Cette conversation est fermée ou archivée.
                </div>
            @endcan
        </div>
    </div>
</x-app-layout>
