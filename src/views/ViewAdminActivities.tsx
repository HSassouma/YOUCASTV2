import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle,
  X,
  Calendar,
  MapPin,
  Ticket
} from 'lucide-react';
import { Activity } from '../types';
import { StatusBadge } from '../components/StatusBadge';

interface ViewAdminActivitiesProps {
  activities: Activity[];
  onSelectActivity: (activity: Activity) => void;
  onCreateActivity: (newAct: Partial<Activity>) => void;
  onUpdateStatus: (id: string, status: 'published' | 'draft' | 'closed') => void;
}

export const ViewAdminActivities: React.FC<ViewAdminActivitiesProps> = ({
  activities,
  onSelectActivity,
  onCreateActivity,
  onUpdateStatus,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [modalOpen, setModalOpen] = useState(false);

  // New activity form state
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<'hackathon' | 'workshop' | 'tournament' | 'meetup'>('hackathon');
  const [newCategory, setNewCategory] = useState('Web & Cloud');
  const [newDescription, setNewDescription] = useState('');
  const [newLocation, setNewLocation] = useState('Campus YouCode Safi');
  const [newCapacity, setNewCapacity] = useState('50');
  const [newUsesTeams, setNewUsesTeams] = useState(true);

  const filtered = activities.filter((act) => {
    const matchesSearch =
      act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.category.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (selectedStatus !== 'all' && act.status !== selectedStatus) return false;
    return true;
  });

  const handleSubmitNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onCreateActivity({
      title: newTitle,
      type: newType,
      typeLabel: newType === 'hackathon' ? 'Hackathon' : newType === 'workshop' ? 'Atelier' : newType === 'tournament' ? 'Tournoi' : 'Rencontre',
      category: newCategory,
      description: newDescription || 'Session organisée par le BDE YouCode.',
      location: newLocation,
      capacity: parseInt(newCapacity, 10) || 40,
      registeredCount: 0,
      startsAt: '25 Nov 2026',
      endsAt: '26 Nov 2026',
      registrationDeadline: '22 Nov 2026',
      status: 'draft',
      usesTeams: newUsesTeams,
      minTeamSize: newUsesTeams ? 2 : undefined,
      maxTeamSize: newUsesTeams ? 5 : undefined,
    });

    setModalOpen(false);
    setNewTitle('');
    setNewDescription('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">Gestion Administrative</span>
          <h1 className="mt-1 font-display text-3xl font-extrabold text-slate-900 tracking-tight">
            Toutes les Activités du BDE
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Créez des sessions, passez les brouillons en publication officielle et contrôlez la jauge des inscrits.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:brightness-105 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Nouvelle activité</span>
        </button>
      </div>

      {/* Filter Card */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-card">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 items-end">
          <div className="lg:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">Rechercher</label>
            <div className="relative mt-1.5">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Titre, catégorie..."
                className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">Statut</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full mt-1.5 rounded-xl border border-slate-200 px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">Tous les statuts</option>
              <option value="published">Publiée</option>
              <option value="draft">Brouillon</option>
              <option value="closed">Clôturée</option>
            </select>
          </div>

          <div className="text-right pb-1">
            <span className="text-xs font-semibold text-slate-500">
              {filtered.length} résultat{filtered.length > 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Activities Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 text-left text-xs">
            <thead className="bg-slate-50/80 font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th scope="col" className="px-6 py-4">Titre de l'activité</th>
                <th scope="col" className="px-6 py-4">Format</th>
                <th scope="col" className="px-6 py-4">Statut & Action</th>
                <th scope="col" className="px-6 py-4">Inscriptions</th>
                <th scope="col" className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((act) => {
                const percentage = Math.min(100, Math.round((act.registeredCount / act.capacity) * 100));
                return (
                  <tr key={act.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <p 
                        onClick={() => onSelectActivity(act)}
                        className="font-bold text-slate-900 hover:text-purple-600 cursor-pointer text-sm"
                      >
                        {act.title}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{act.location} · {act.startsAt}</p>
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      <span className="inline-flex rounded-md bg-purple-50 px-2.5 py-1 text-[11px] font-bold text-purple-800">
                        {act.typeLabel}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <StatusBadge status={act.status} />
                        {act.status === 'draft' ? (
                          <button
                            onClick={() => onUpdateStatus(act.id, 'published')}
                            className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 hover:bg-emerald-100"
                          >
                            Publier
                          </button>
                        ) : act.status === 'published' ? (
                          <button
                            onClick={() => onUpdateStatus(act.id, 'closed')}
                            className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 hover:bg-slate-200"
                          >
                            Clôturer
                          </button>
                        ) : (
                          <button
                            onClick={() => onUpdateStatus(act.id, 'published')}
                            className="rounded bg-purple-50 px-2 py-0.5 text-[10px] font-bold text-purple-700 hover:bg-purple-100"
                          >
                            Rouvrir
                          </button>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700">
                          <span>{act.registeredCount} / {act.capacity}</span>
                          <span className="text-slate-400">{percentage}%</span>
                        </div>
                        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-100">
                          <div 
                            className="h-full rounded-full bg-gradient-to-r from-purple-600 to-indigo-600" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => onSelectActivity(act)}
                        className="inline-flex items-center gap-1 rounded-lg bg-purple-50 px-3 py-1.5 text-xs font-bold text-purple-700 hover:bg-purple-600 hover:text-white transition-all"
                      >
                        <span>Gérer</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Create Activity */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-2xl space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-display text-lg font-bold text-slate-900">
                  Créer une nouvelle activité BDE
                </h3>
                <p className="text-xs text-slate-500">Ajout immédiat au catalogue YouCast</p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitNew} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-800 uppercase tracking-wider text-[11px]">Titre</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="ex. Hackathon Data & IA"
                  className="w-full mt-1 rounded-xl border border-slate-200 px-3.5 py-2 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 uppercase tracking-wider text-[11px]">Format</label>
                  <select
                    value={newType}
                    onChange={(e: any) => setNewType(e.target.value)}
                    className="w-full mt-1 rounded-xl border border-slate-200 px-3 py-2 text-xs"
                  >
                    <option value="hackathon">Hackathon</option>
                    <option value="workshop">Atelier</option>
                    <option value="tournament">Tournoi</option>
                    <option value="meetup">Rencontre</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-800 uppercase tracking-wider text-[11px]">Capacité (places)</label>
                  <input
                    type="number"
                    value={newCapacity}
                    onChange={(e) => setNewCapacity(e.target.value)}
                    className="w-full mt-1 rounded-xl border border-slate-200 px-3.5 py-2 text-xs"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-800 uppercase tracking-wider text-[11px]">Lieu</label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full mt-1 rounded-xl border border-slate-200 px-3.5 py-2 text-xs"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 uppercase tracking-wider text-[11px]">Description</label>
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  rows={3}
                  placeholder="Objectif, prérequis, matériel à apporter..."
                  className="w-full mt-1 rounded-xl border border-slate-200 p-3 text-xs"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="usesTeams"
                  checked={newUsesTeams}
                  onChange={(e) => setNewUsesTeams(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-purple-600"
                />
                <label htmlFor="usesTeams" className="font-semibold text-slate-700">Participation en équipe (avec code d'invitation)</label>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-purple-700 to-indigo-600 px-5 py-2 font-bold text-white shadow-sm hover:brightness-105"
                >
                  Enregistrer l'activité
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
