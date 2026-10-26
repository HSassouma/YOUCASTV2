import React from 'react';
import { 
  Calendar, 
  Flag, 
  Users, 
  Lightbulb, 
  MessageSquare, 
  Plus, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Activity, Idea } from '../types';
import { StatusBadge } from '../components/StatusBadge';

interface ViewDashboardAdminProps {
  activities: Activity[];
  ideas: Idea[];
  unreadMessagesCount: number;
  onSelectActivity: (activity: Activity) => void;
  onNavigate: (tab: string) => void;
}

export const ViewDashboardAdmin: React.FC<ViewDashboardAdminProps> = ({
  activities,
  ideas,
  unreadMessagesCount,
  onSelectActivity,
  onNavigate,
}) => {
  const publishedCount = activities.filter((a) => a.status === 'published').length;
  const draftCount = activities.filter((a) => a.status === 'draft').length;
  const totalRegistrations = activities.reduce((acc, curr) => acc + curr.registeredCount, 0);
  const pendingIdeas = ideas.filter((i) => i.status === 'pending');

  const stats = [
    {
      icon: Calendar,
      label: 'Activités publiées',
      value: publishedCount,
      hint: 'visibles au catalogue',
      gradient: 'from-purple-500/15 to-purple-500/5',
      iconColor: 'text-purple-700',
    },
    {
      icon: Flag,
      label: 'Brouillons BDE',
      value: draftCount,
      hint: 'en cours de préparation',
      gradient: 'from-amber-500/15 to-amber-500/5',
      iconColor: 'text-amber-700',
    },
    {
      icon: Users,
      label: 'Inscriptions actives',
      value: totalRegistrations,
      hint: 'places réservées',
      gradient: 'from-emerald-500/15 to-emerald-500/5',
      iconColor: 'text-emerald-700',
    },
    {
      icon: Lightbulb,
      label: 'Idées à modérer',
      value: pendingIdeas.length,
      hint: 'propositions étudiants',
      gradient: 'from-indigo-500/15 to-indigo-500/5',
      iconColor: 'text-indigo-700',
    },
    {
      icon: MessageSquare,
      label: 'Messages non lus',
      value: unreadMessagesCount,
      hint: 'questions du campus',
      gradient: 'from-blue-500/15 to-blue-500/5',
      iconColor: 'text-blue-700',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-700">
            <span className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
            <span>Espace Administration · BDE YouCode</span>
          </div>
          <h1 className="mt-1 font-display text-3xl font-extrabold text-slate-900 tracking-tight">
            Supervision & Gestion des Activités
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Pilotez les compétitions, modérez les propositions étudiantes et répondez aux messages de la communauté.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigate('admin-activities')}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:brightness-105 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Créer une activité</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {stats.map((st, i) => {
          const Icon = st.icon;
          return (
            <div
              key={i}
              className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-card hover:shadow-cardHover transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <span className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${st.gradient} ${st.iconColor}`}>
                  <Icon className="w-5 h-5" />
                </span>
                <p className="font-display text-3xl font-extrabold tracking-tight text-slate-900">
                  {st.value}
                </p>
              </div>
              <p className="mt-3.5 text-xs font-bold uppercase tracking-wider text-slate-600">
                {st.label}
              </p>
              <p className="mt-0.5 text-xs text-slate-400">{st.hint}</p>
            </div>
          );
        })}
      </section>

      {/* Two Columns: Recent Activities & Pending Ideas */}
      <div className="grid gap-8 lg:grid-cols-2 items-start">
        {/* Panel 1: Recent Activities */}
        <section className="rounded-2xl border border-slate-200/90 bg-white shadow-card overflow-hidden">
          <header className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-6 py-4">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
                <Calendar className="w-4 h-4" />
              </span>
              <h2 className="text-sm font-bold text-slate-900">Activités Récentes</h2>
            </div>
            <button
              onClick={() => onNavigate('admin-activities')}
              className="text-xs font-bold text-purple-700 hover:text-purple-900"
            >
              Gestion complète →
            </button>
          </header>

          <ul className="divide-y divide-slate-100">
            {activities.slice(0, 5).map((act) => (
              <li key={act.id} className="p-4 sm:px-6 hover:bg-slate-50/70 transition-colors flex items-center justify-between gap-4">
                <div className="min-w-0 space-y-0.5">
                  <p 
                    onClick={() => onSelectActivity(act)}
                    className="text-sm font-bold text-slate-900 hover:text-purple-600 cursor-pointer truncate"
                  >
                    {act.title}
                  </p>
                  <p className="text-xs text-slate-500">
                    {act.typeLabel} · {act.registeredCount}/{act.capacity} participants
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <StatusBadge status={act.status} />
                  <button
                    onClick={() => onSelectActivity(act)}
                    className="p-1 rounded-lg text-slate-400 hover:text-purple-700 hover:bg-purple-50 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Panel 2: Ideas Awaiting Moderation */}
        <section className="rounded-2xl border border-slate-200/90 bg-white shadow-card overflow-hidden">
          <header className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-6 py-4">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700">
                <Lightbulb className="w-4 h-4" />
              </span>
              <h2 className="text-sm font-bold text-slate-900">Idées en attente de modération</h2>
            </div>
            <button
              onClick={() => onNavigate('ideas')}
              className="text-xs font-bold text-indigo-700 hover:text-indigo-900"
            >
              Modérer tout ({pendingIdeas.length}) →
            </button>
          </header>

          <ul className="divide-y divide-slate-100">
            {pendingIdeas.length === 0 ? (
              <li className="p-8 text-center text-xs text-slate-400">
                Aucune idée en attente de modération.
              </li>
            ) : (
              pendingIdeas.map((idea) => (
                <li key={idea.id} className="p-4 sm:px-6 hover:bg-slate-50/70 transition-colors space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-slate-900">{idea.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Par <strong>{idea.authorName}</strong> · {idea.category}
                      </p>
                    </div>
                    <StatusBadge status={idea.status} />
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {idea.description}
                  </p>
                  <div className="pt-1 flex items-center justify-end gap-2">
                    <button
                      onClick={() => onNavigate('ideas')}
                      className="rounded-lg bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 hover:bg-indigo-600 hover:text-white transition-all"
                    >
                      Examiner la proposition
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </section>
      </div>
    </div>
  );
};
