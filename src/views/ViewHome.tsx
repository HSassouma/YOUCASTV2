import React from 'react';
import { 
  ArrowRight, 
  Users, 
  Lightbulb, 
  MessageSquare, 
  Sparkles, 
  Trophy, 
  Flame, 
  Calendar,
  CheckCircle2,
  Code
} from 'lucide-react';
import { Activity } from '../types';
import { ActivityCard } from '../components/ActivityCard';

interface ViewHomeProps {
  activities: Activity[];
  onSelectActivity: (activity: Activity) => void;
  onNavigate: (tab: string) => void;
  isGuest: boolean;
}

export const ViewHome: React.FC<ViewHomeProps> = ({
  activities,
  onSelectActivity,
  onNavigate,
  isGuest,
}) => {
  const featuredActivities = activities.filter(a => a.status === 'published').slice(0, 3);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-20">
        {/* Ambient Gradient Background Glows */}
        <div className="pointer-events-none absolute -left-20 top-0 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" aria-hidden="true"></div>
        <div className="pointer-events-none absolute -right-20 top-20 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" aria-hidden="true"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
            <div className="max-w-2xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-200/90 bg-purple-50/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-purple-800 shadow-xs">
                <span className="flex h-2 w-2 rounded-full bg-purple-600 animate-pulse"></span>
                Le BDE YouCode · En Mouvement
              </div>

              {/* Main Headline */}
              <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                On apprend <span className="bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 bg-clip-text text-transparent">en faisant.</span>
                <span className="block text-slate-950">On avance ensemble.</span>
              </h1>

              <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-slate-600">
                Challenges, hackathons 48h, tournois et ateliers du BDE&nbsp;: trouve ta prochaine activité,
                forme ton équipe avec un code d'invitation et propulse tes idées sur le campus.
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3.5">
                {isGuest ? (
                  <>
                    <button
                      onClick={() => onNavigate('register')}
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 px-6 text-sm font-bold text-white shadow-md shadow-purple-500/20 hover:shadow-lg hover:shadow-purple-500/35 hover:brightness-105 transition-all duration-200"
                    >
                      <span>Rejoindre YouCast</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onNavigate('login')}
                      className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-bold text-slate-800 shadow-xs hover:border-purple-300 hover:bg-purple-50/50 transition-all duration-200"
                    >
                      J’ai déjà un compte
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => onNavigate('dashboard')}
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 px-6 text-sm font-bold text-white shadow-md shadow-purple-500/20 hover:shadow-lg hover:shadow-purple-500/35 hover:brightness-105 transition-all duration-200"
                    >
                      <span>Accéder à mon espace</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onNavigate('activities')}
                      className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-bold text-slate-800 shadow-xs hover:border-purple-300 hover:bg-purple-50/50 transition-all duration-200"
                    >
                      Découvrir les activités
                    </button>
                  </>
                )}
              </div>

              {/* Value props */}
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-slate-200/80 pt-6 text-xs font-semibold text-slate-600">
                <span className="inline-flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-purple-700">
                    <Users className="w-3.5 h-3.5" />
                  </span>
                  Apprendre entre pairs
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-purple-700">
                    <Lightbulb className="w-3.5 h-3.5" />
                  </span>
                  Faire grandir les idées
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-purple-700">
                    <MessageSquare className="w-3.5 h-3.5" />
                  </span>
                  Échange direct BDE
                </span>
              </div>
            </div>

            {/* Showcase Card: Le Cycle YouCode */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 p-8 sm:p-10 text-white shadow-2xl border border-purple-900/40">
              <div className="pointer-events-none absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-purple-600/20 blur-3xl"></div>

              <div className="relative flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-purple-300">Le Cycle YouCast</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Parcours d’un événement campus</p>
                </div>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-sm font-black text-white shadow-md shadow-purple-500/40">
                  YC
                </span>
              </div>

              <ol className="relative mt-3 space-y-4">
                <li className="grid grid-cols-[3rem_1fr] gap-4 py-4 border-b border-white/10">
                  <span className="font-display text-2xl font-black text-purple-400">01</span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">Une idée prend forme</h3>
                    <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                      Chaque apprenant peut soumettre un défi ou une compétition pour animer la promo.
                    </p>
                  </div>
                </li>

                <li className="grid grid-cols-[3rem_1fr] gap-4 py-4 border-b border-white/10">
                  <span className="font-display text-2xl font-black text-purple-400">02</span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">On construit à plusieurs</h3>
                    <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                      Formation d'équipe avec code d'invitation unique, validation en un clic.
                    </p>
                  </div>
                </li>

                <li className="grid grid-cols-[3rem_1fr] gap-4 py-4">
                  <span className="font-display text-2xl font-black text-purple-400">03</span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">Le savoir circule</h3>
                    <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                      Retours d'expérience, démos, récompenses et esprit d'entraide YouCode.
                    </p>
                  </div>
                </li>
              </ol>

              <div className="relative mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-xs">
                <span className="font-semibold text-purple-300">Pensé pour les apprenants.</span>
                <span className="text-slate-400">Porté par le BDE.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Activities Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-700">
              <Flame className="w-4 h-4 text-purple-600" />
              <span>À la une sur le campus</span>
            </div>
            <h2 className="mt-1.5 font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Prochaines sessions ouvertes
            </h2>
          </div>
          <button
            onClick={() => onNavigate('activities')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 hover:text-purple-900 group"
          >
            <span>Voir tout le catalogue ({activities.length})</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredActivities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onSelect={onSelectActivity}
            />
          ))}
        </div>
      </section>

      {/* 3 Pillars Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16 items-start">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-700">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-600"></span>
              L’esprit YouCode
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
              La meilleure façon d’apprendre, c’est de faire.
            </h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
              YouCode met l’apprenant au centre de la pédagogie par projet, valorise les compétences concrètes et transforme l’entraide en moteur d’excellence.
              YouCast donne vie à cette dynamique en digitalisant les activités associatives, sportives et techniques du BDE.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-7 shadow-card hover:shadow-cardHover transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-700 font-display text-xl font-bold">
              01
            </div>
            <h3 className="mt-5 font-display text-xl font-bold text-slate-900">Proposer</h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              Une idée de hackathon, tournoi esport ou atelier technique peut être soumise au BDE en moins d’une minute.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/90 bg-white p-7 shadow-card hover:shadow-cardHover transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-700 font-display text-xl font-bold">
              02
            </div>
            <h3 className="mt-5 font-display text-xl font-bold text-slate-900">Participer</h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              Inscriptions individuelles ou création d’équipe avec code d'invitation sécurisé pour défier d'autres promos.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/90 bg-white p-7 shadow-card hover:shadow-cardHover transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-700 font-display text-xl font-bold">
              03
            </div>
            <h3 className="mt-5 font-display text-xl font-bold text-slate-900">Partager</h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              Messagerie privée directe avec les délégués BDE pour un suivi réactif de chaque initiative.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-purple-950 to-indigo-950 px-8 py-14 sm:px-12 sm:py-16 text-white shadow-2xl border border-purple-900/40">
          <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-purple-600/20 blur-3xl"></div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-purple-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-purple-300">
                À toi de jouer
              </span>
              <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl text-white tracking-tight">
                La prochaine idée peut venir de toi.
              </h2>
              <p className="mt-2.5 text-sm text-slate-300 leading-relaxed">
                Connecte-toi à YouCast pour suivre les inscriptions, proposer un challenge et bâtir les événements de ton campus.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {isGuest ? (
                <button
                  onClick={() => onNavigate('register')}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-7 text-sm font-bold text-slate-950 shadow-md hover:bg-slate-100 transition-all active:scale-[0.98]"
                >
                  <span>Créer mon compte</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => onNavigate('ideas')}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-7 text-sm font-bold text-slate-950 shadow-md hover:bg-slate-100 transition-all active:scale-[0.98]"
                >
                  <Lightbulb className="w-4 h-4 text-purple-600" />
                  <span>Proposer une idée</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
