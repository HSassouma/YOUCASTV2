import React from 'react';
import { 
  CheckCircle2, 
  Calendar, 
  Lightbulb, 
  MessageSquare, 
  ArrowRight, 
  Clock, 
  MapPin,
  Plus
} from 'lucide-react';
import { Activity, Idea, User } from '../types';
import { ActivityCard } from '../components/ActivityCard';
import { StatusBadge } from '../components/StatusBadge';

interface ViewDashboardStudentProps {
  currentUser: User;
  activities: Activity[];
  ideas: Idea[];
  onSelectActivity: (activity: Activity) => void;
  onNavigate: (tab: string) => void;
}

export const ViewDashboardStudent: React.FC<ViewDashboardStudentProps> = ({
  currentUser,
  activities,
  ideas,
  onSelectActivity,
  onNavigate,
}) => {
  const registeredActivities = activities.filter((a) => a.isRegistered);
  const openActivities = activities.filter((a) => a.status === 'published' && !a.isRegistered).slice(0, 2);
  const myIdeas = ideas.filter((i) => i.authorName === currentUser.name || i.authorName === 'Yassine Bennani');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
            <span>Espace Apprenant · {currentUser.campus}</span>
          </div>
          <h1 className="mt-1 font-display text-3xl font-extrabold text-slate-900 tracking-tight">
            Bonjour, {currentUser.name} 👋
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Retrouvez vos inscriptions actives, vos idées soumises et les prochaines sessions à ne pas manquer.
          </p>
        </div>

        <div>
          <button
            onClick={() => onNavigate('activities')}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:brightness-105 transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span>Découvrir les activités</span>
          </button>
        </div>
      </div>

      {/* Main Grid: 8 cols left, 4 cols right */}
      <div className="grid gap-8 lg:grid-cols-12 items-start">
        {/* Left column: Registrations + Recommended sessions */}
        <div className="space-y-8 lg:col-span-8">
          {/* Section: Mes inscriptions */}
          <section className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-card">
            <header className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-6 py-4">
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <CheckCircle2 className="w-4 h-4" />
                </span>
                <h2 className="text-sm font-bold text-slate-900">Mes Inscriptions Actives</h2>
              </div>
              <span className="rounded-full bg-purple-50 px-2.5 py-0.5 text-xs font-bold text-purple-700">
                {registeredActivities.length} session{registeredActivities.length > 1 ? 's' : ''}
              </span>
            </header>

            {registeredActivities.length === 0 ? (
              <div className="p-8 text-center">
                <Calendar className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="mt-3 text-sm font-bold text-slate-800">Vous n'avez pas encore d'inscription active.</p>
                <p className="mt-1 text-xs text-slate-500">Parcourez le catalogue pour rejoindre un atelier ou un hackathon.</p>
                <button
                  onClick={() => onNavigate('activities')}
                  className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-purple-700"
                >
                  Voir les activités ouvertes
                </button>
              </div>
            ) : (
              <ul className="divide-y divide-slate-100">
                {registeredActivities.map((act) => (
                  <li key={act.id} className="p-5 sm:px-6 hover:bg-slate-50/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-purple-100 px-2 py-0.5 text-[10px] font-bold text-purple-800">
                          {act.typeLabel}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">
                          {act.startsAt}
                        </span>
                      </div>
                      <h3 
                        onClick={() => onSelectActivity(act)}
                        className="text-sm font-bold text-slate-900 hover:text-purple-600 cursor-pointer transition-colors"
                      >
                        {act.title}
                      </h3>
                      <p className="text-xs text-slate-500 flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{act.location}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 ring-1 ring-inset ring-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Validé
                      </span>
                      <button
                        onClick={() => onSelectActivity(act)}
                        className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-purple-100 hover:text-purple-900 transition-colors"
                      >
                        Gérer
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Section: Prochaines sessions ouvertes */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-slate-900">
                Sessions recommandées pour vous
              </h2>
              <button
                onClick={() => onNavigate('activities')}
                className="text-xs font-bold text-purple-700 hover:text-purple-900"
              >
                Catalogue complet →
              </button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {openActivities.map((act) => (
                <ActivityCard
                  key={act.id}
                  activity={act}
                  onSelect={onSelectActivity}
                />
              ))}
            </div>
          </section>
        </div>

        {/* Right column: Ideas & BDE Contact Banner */}
        <div className="space-y-6 lg:col-span-4">
          {/* Section: Mes Idées */}
          <section className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-card">
            <header className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-5 py-4">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
                  <Lightbulb className="w-4 h-4" />
                </span>
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Mes Idées Soumises</h2>
              </div>
              <button
                onClick={() => onNavigate('ideas')}
                className="text-xs font-bold text-purple-700 hover:text-purple-900"
              >
                + Proposer
              </button>
            </header>

            <ul className="divide-y divide-slate-100">
              {myIdeas.map((idea) => (
                <li key={idea.id} className="p-4 hover:bg-slate-50/70 transition-colors space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs font-bold text-slate-900 leading-snug">{idea.title}</p>
                    <StatusBadge status={idea.status} />
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {idea.category} · Envoyée le {idea.createdAt}
                  </p>
                  {idea.adminFeedback && (
                    <div className="rounded-lg bg-purple-50 p-2 text-[11px] text-purple-900 border border-purple-100">
                      <strong>BDE :</strong> {idea.adminFeedback}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </section>

          {/* Quick Contact BDE Banner */}
          <section className="rounded-2xl border border-purple-900/20 bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 p-6 text-white shadow-xl relative overflow-hidden">
            <div className="pointer-events-none absolute -right-6 -bottom-6 h-32 w-32 rounded-full bg-purple-600/30 blur-2xl"></div>

            <div className="relative z-10 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20 text-purple-300">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="font-display text-base font-bold text-white">
                Une question pour le BDE ?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Besoin d'aide pour inscrire une équipe ou envie de proposer un partenariat pour votre promo ? Échangez directement en privé avec les délégués.
              </p>
              <button
                onClick={() => onNavigate('messages')}
                className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-white py-2.5 text-xs font-bold text-slate-950 shadow-sm hover:bg-slate-100 transition-all active:scale-[0.98]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Ouvrir une conversation</span>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
