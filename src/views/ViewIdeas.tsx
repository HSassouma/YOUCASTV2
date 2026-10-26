import React, { useState } from 'react';
import { 
  Lightbulb, 
  Send, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Idea, User } from '../types';
import { StatusBadge } from '../components/StatusBadge';

interface ViewIdeasProps {
  ideas: Idea[];
  currentUser: User;
  isAdmin: boolean;
  onAddIdea: (newIdea: Omit<Idea, 'id' | 'createdAt' | 'status'>) => void;
  onModerateIdea: (id: string, status: 'accepted' | 'rejected', feedback?: string) => void;
}

export const ViewIdeas: React.FC<ViewIdeasProps> = ({
  ideas,
  currentUser,
  isAdmin,
  onAddIdea,
  onModerateIdea,
}) => {
  const [activeTab, setActiveTab] = useState<'submit' | 'list' | 'moderation'>(isAdmin ? 'moderation' : 'submit');
  
  // Submit state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Hackathon Technique');
  const [description, setDescription] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  // Moderation state
  const [feedbackNotes, setFeedbackNotes] = useState<Record<string, string>>({});

  const handleFeedbackChange = (id: string, text: string) => {
    setFeedbackNotes((prev) => ({ ...prev, [id]: text }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    onAddIdea({
      title,
      category,
      description,
      authorName: currentUser.name,
    });

    setTitle('');
    setDescription('');
    setSubmittedMessage(true);
    setTimeout(() => setSubmittedMessage(false), 4000);
  };

  const myIdeas = ideas.filter((i) => i.authorName === currentUser.name || i.authorName === 'Yassine Bennani');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-700">
            <Lightbulb className="w-4 h-4 text-purple-600" />
            <span>Boîte à Idées YouCast</span>
          </div>
          <h1 className="mt-1 font-display text-3xl font-extrabold text-slate-900 tracking-tight">
            Proposez & Modérez les Défis
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Chaque grande activité commence par une idée d’apprenant. Soumettez votre projet au BDE YouCode !
          </p>
        </div>

        {/* Tab switchers */}
        <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200/80">
          <button
            onClick={() => setActiveTab('submit')}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
              activeTab === 'submit' ? 'bg-white text-purple-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Proposer une idée
          </button>
          <button
            onClick={() => setActiveTab('list')}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
              activeTab === 'list' ? 'bg-white text-purple-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Mes propositions ({myIdeas.length})
          </button>
          {isAdmin && (
            <button
              onClick={() => setActiveTab('moderation')}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
                activeTab === 'moderation' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Modération BDE ({ideas.filter(i => i.status === 'pending').length})
            </button>
          )}
        </div>
      </div>

      {/* Flash message */}
      {submittedMessage && (
        <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-semibold text-emerald-800 shadow-xs animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Votre proposition a été transmise au BDE avec succès ! Elle apparaîtra dans vos idées dès examen.</span>
        </div>
      )}

      {/* Tab 1: Submit Form */}
      {activeTab === 'submit' && (
        <div className="max-w-2xl mx-auto rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-card space-y-6">
          <div className="space-y-1">
            <h2 className="font-display text-xl font-bold text-slate-900">
              Formulaire de Proposition de Challenge
            </h2>
            <p className="text-xs text-slate-500">
              Détaillez le concept, la durée estimée et les technologies visées pour votre défi ou atelier.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-700 text-[11px]">
                Titre de l'idée / Défi *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="ex. Speed Coding Challenge : Refactoring Extrême en 2h"
                className="w-full mt-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-4 focus:ring-purple-500/15 focus:border-purple-500 transition-all"
                required
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-700 text-[11px]">
                Catégorie thématique *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full mt-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-4 focus:ring-purple-500/15 focus:border-purple-500 transition-all"
              >
                <option value="Hackathon Technique">Hackathon Technique</option>
                <option value="Compétition Rapide">Compétition Rapide & Code Golf</option>
                <option value="Atelier Pratique & Peer-Learning">Atelier Pratique & Peer-Learning</option>
                <option value="Cybersécurité & CTF">Cybersécurité & CTF</option>
                <option value="Détente, Esport & Cohésion">Détente, Esport & Cohésion</option>
              </select>
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-700 text-[11px]">
                Description détaillée du projet *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                placeholder="Expliquez en quelques lignes les règles, le public visé (1ère année, 2ème année, tous), et l'intérêt pour la communauté YouCode..."
                className="w-full mt-1.5 rounded-xl border border-slate-200 p-4 text-xs text-slate-900 focus:outline-none focus:ring-4 focus:ring-purple-500/15 focus:border-purple-500 transition-all"
                required
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 py-3 text-xs font-bold text-white shadow-md shadow-purple-500/20 hover:shadow-lg hover:shadow-purple-500/35 hover:brightness-105 active:scale-[0.98] transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Envoyer ma proposition au BDE</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 2: My Proposals List */}
      {activeTab === 'list' && (
        <div className="space-y-4">
          {myIdeas.length === 0 ? (
            <div className="rounded-2xl border border-slate-200/90 bg-white p-12 text-center shadow-card">
              <Lightbulb className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="mt-3 font-display text-base font-bold text-slate-900">Aucune idée proposée pour l'instant</h3>
              <p className="mt-1 text-xs text-slate-500">
                Vous avez un projet en tête ? Cliquez sur l'onglet "Proposer une idée" pour le soumettre.
              </p>
              <button
                onClick={() => setActiveTab('submit')}
                className="mt-4 rounded-xl bg-purple-600 px-4 py-2 text-xs font-bold text-white shadow-xs"
              >
                Proposer un défi
              </button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {myIdeas.map((idea) => (
                <div key={idea.id} className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-card space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <span className="rounded-md bg-purple-50 px-2 py-0.5 text-[10px] font-bold text-purple-700">
                      {idea.category}
                    </span>
                    <StatusBadge status={idea.status} />
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm leading-snug">{idea.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">{idea.description}</p>

                  <div className="border-t border-slate-100 pt-3 text-[11px] text-slate-400">
                    Envoyée le {idea.createdAt}
                  </div>

                  {idea.adminFeedback && (
                    <div className="rounded-xl bg-purple-50 p-3 text-xs text-purple-900 border border-purple-100">
                      <p className="font-bold text-purple-950 flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-purple-700" />
                        Retour officiel du BDE :
                      </p>
                      <p className="mt-1 text-[11px] leading-relaxed">{idea.adminFeedback}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Admin Moderation */}
      {activeTab === 'moderation' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Toutes les propositions étudiantes ({ideas.length})
            </span>
          </div>

          <div className="space-y-4">
            {ideas.map((idea) => (
              <div
                key={idea.id}
                className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-card space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-purple-100 px-2.5 py-0.5 text-[11px] font-bold text-purple-800">
                        {idea.category}
                      </span>
                      <span className="text-xs text-slate-400">
                        Proposée par <strong>{idea.authorName}</strong> · le {idea.createdAt}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{idea.title}</h3>
                  </div>

                  <StatusBadge status={idea.status} />
                </div>

                <p className="text-xs leading-relaxed text-slate-700 bg-slate-50/60 p-4 rounded-xl border border-slate-100 whitespace-pre-line">
                  {idea.description}
                </p>

                {idea.adminFeedback && (
                  <div className="rounded-xl bg-purple-50/80 p-3 text-xs text-purple-900 border border-purple-200">
                    <span className="font-bold">Motif / Commentaire BDE :</span> {idea.adminFeedback}
                  </div>
                )}

                {/* Moderation Action Buttons (if pending) */}
                {idea.status === 'pending' && (
                  <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <input
                      type="text"
                      placeholder="Commentaire ou motif pour l'étudiant..."
                      value={feedbackNotes[idea.id] || ''}
                      onChange={(e) => handleFeedbackChange(idea.id, e.target.value)}
                      className="flex-1 rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => onModerateIdea(idea.id, 'accepted', feedbackNotes[idea.id] || 'Idée approuvée ! Création de la session au catalogue.')}
                        className="inline-flex items-center gap-1 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 transition-all"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Accepter & Programmer</span>
                      </button>
                      <button
                        onClick={() => onModerateIdea(idea.id, 'rejected', feedbackNotes[idea.id] || 'Non retenu pour cette période.')}
                        className="inline-flex items-center gap-1 rounded-xl bg-rose-50 border border-rose-200 px-3.5 py-2 text-xs font-bold text-rose-700 hover:bg-rose-100 transition-all"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Refuser</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
