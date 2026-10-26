import React, { useState, useMemo } from 'react';
import { Search, Filter, Calendar, Sparkles, CheckCircle2, X } from 'lucide-react';
import { Activity } from '../types';
import { ActivityCard } from '../components/ActivityCard';

interface ViewActivitiesProps {
  activities: Activity[];
  onSelectActivity: (activity: Activity) => void;
}

export const ViewActivities: React.FC<ViewActivitiesProps> = ({
  activities,
  onSelectActivity,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [onlyOpen, setOnlyOpen] = useState(false);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    activities.forEach((a) => set.add(a.category));
    return Array.from(set);
  }, [activities]);

  // Filtered activities
  const filteredActivities = useMemo(() => {
    return activities.filter((act) => {
      // Search
      const matchesSearch =
        act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        act.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        act.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        act.category.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      // Type
      if (selectedType !== 'all' && act.type !== selectedType) {
        return false;
      }

      // Category
      if (selectedCategory !== 'all' && act.category !== selectedCategory) {
        return false;
      }

      // Open only
      if (onlyOpen && act.status !== 'published') {
        return false;
      }

      return true;
    });
  }, [activities, searchQuery, selectedType, selectedCategory, onlyOpen]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-700">
            <Calendar className="w-3.5 h-3.5 text-purple-600" />
            <span>Catalogue YouCast</span>
          </div>
          <h1 className="mt-1 font-display text-3xl font-extrabold text-slate-900 tracking-tight">
            Activités & Défis Étudiants
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Explorez les hackathons, ateliers, tournois et sessions organisés par le BDE YouCode.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-xl bg-purple-50 border border-purple-200/80 px-3.5 py-1.5 text-xs font-bold text-purple-800">
            {filteredActivities.length} activité{filteredActivities.length > 1 ? 's' : ''} trouvée{filteredActivities.length > 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Modern Filter Card */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-card space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 items-end">
          {/* Search Input */}
          <div className="lg:col-span-2">
            <label htmlFor="search" className="block text-xs font-bold uppercase tracking-wider text-slate-600">
              Rechercher par mot-clé
            </label>
            <div className="relative mt-1.5">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                id="search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Titre, techno, lieu, hackathon..."
                className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/15 focus:outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Type Select */}
          <div>
            <label htmlFor="type" className="block text-xs font-bold uppercase tracking-wider text-slate-600">
              Format d'activité
            </label>
            <select
              id="type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full mt-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/15 focus:outline-none transition-all"
            >
              <option value="all">Tous les formats</option>
              <option value="hackathon">Hackathon</option>
              <option value="workshop">Atelier / Workshop</option>
              <option value="tournament">Tournoi / CTF</option>
              <option value="meetup">Meetup & Échange</option>
            </select>
          </div>

          {/* Category Select */}
          <div>
            <label htmlFor="category" className="block text-xs font-bold uppercase tracking-wider text-slate-600">
              Catégorie thématique
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full mt-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/15 focus:outline-none transition-all"
            >
              <option value="all">Toutes les catégories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Toggle Inscriptions ouvertes */}
          <div className="flex items-center pb-2">
            <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyOpen}
                onChange={(e) => setOnlyOpen(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
              />
              <span>Inscriptions ouvertes</span>
            </label>
          </div>
        </div>

        {/* Quick pill filters */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
          <span className="text-[11px] font-bold text-slate-400 mr-1">Filtres rapides :</span>
          {[
            { label: 'Tous', value: 'all' },
            { label: 'Hackathons 48h', value: 'hackathon' },
            { label: 'Ateliers Pratiques', value: 'workshop' },
            { label: 'Compétitions & CTF', value: 'tournament' },
          ].map((pill) => (
            <button
              key={pill.value}
              onClick={() => setSelectedType(pill.value)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedType === pill.value
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-purple-50 hover:text-purple-700'
              }`}
            >
              {pill.label}
            </button>
          ))}

          {(searchQuery || selectedType !== 'all' || selectedCategory !== 'all' || onlyOpen) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedType('all');
                setSelectedCategory('all');
                setOnlyOpen(false);
              }}
              className="ml-auto text-xs font-semibold text-rose-600 hover:text-rose-800"
            >
              Réinitialiser les filtres
            </button>
          )}
        </div>
      </div>

      {/* Activities Grid */}
      {filteredActivities.length === 0 ? (
        <div className="rounded-2xl border border-slate-200/90 bg-white p-12 text-center shadow-card">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="mt-4 font-display text-lg font-bold text-slate-900">
            Aucune activité ne correspond à vos filtres
          </h3>
          <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
            Essayez de modifier votre recherche ou de désélectionner certains filtres pour voir d'autres sessions.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedType('all');
              setSelectedCategory('all');
              setOnlyOpen(false);
            }}
            className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-purple-700"
          >
            Réinitialiser les critères
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredActivities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onSelect={onSelectActivity}
            />
          ))}
        </div>
      )}
    </div>
  );
};
