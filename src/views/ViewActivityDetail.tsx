import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Clock, 
  Ticket, 
  Users, 
  CheckCircle2, 
  Copy, 
  ShieldCheck, 
  AlertCircle,
  UserPlus,
  Trash2,
  Share2
} from 'lucide-react';
import { Activity, User } from '../types';
import { StatusBadge } from '../components/StatusBadge';

interface ViewActivityDetailProps {
  activity: Activity;
  onBack: () => void;
  currentUser: User;
  isGuest: boolean;
  onToggleRegister: (activityId: string) => void;
  onNavigate: (tab: string) => void;
}

export const ViewActivityDetail: React.FC<ViewActivityDetailProps> = ({
  activity,
  onBack,
  currentUser,
  isGuest,
  onToggleRegister,
  onNavigate,
}) => {
  // Team simulation state
  const [teamCreated, setTeamCreated] = useState(activity.usesTeams && activity.isRegistered);
  const [teamName, setTeamName] = useState('DevForces YouCode');
  const [joinCode] = useState('YC-ALPHA-92');
  const [copied, setCopied] = useState(false);
  const [inputJoinCode, setInputJoinCode] = useState('');
  const [teamMembers, setTeamMembers] = useState([
    { name: currentUser.name, email: currentUser.email, role: 'Leader' },
    { name: 'Amine Chraibi', email: 'a.chraibi@youcode.ma', role: 'Membre' },
    { name: 'Oumaima Tazi', email: 'o.tazi@youcode.ma', role: 'Membre' },
  ]);
  const [feedbackNotice, setFeedbackNotice] = useState<string | null>(null);

  const percentage = Math.min(100, Math.round((activity.registeredCount / activity.capacity) * 100));

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(joinCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim()) return;
    setTeamCreated(true);
    onToggleRegister(activity.id);
    setFeedbackNotice(`Votre équipe "${teamName}" a été créée avec succès ! Partagez le code d'invitation avec vos camarades.`);
  };

  const handleJoinWithCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputJoinCode.trim()) return;
    setTeamCreated(true);
    onToggleRegister(activity.id);
    setFeedbackNotice(`Vous avez rejoint l'équipe avec succès !`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-purple-700 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Retour aux activités</span>
      </button>

      {/* Flash Notice */}
      {feedbackNotice && (
        <div className="flex items-start justify-between gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/90 p-4 text-xs font-semibold text-emerald-800 shadow-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{feedbackNotice}</span>
          </div>
          <button onClick={() => setFeedbackNotice(null)} className="text-emerald-700 hover:text-emerald-950 font-bold">
            ✕
          </button>
        </div>
      )}

      {/* Main Header Card */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-card relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="rounded-lg bg-purple-100 px-2.5 py-0.5 text-xs font-bold text-purple-800">
                {activity.typeLabel}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                Catégorie : {activity.category}
              </span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {activity.title}
            </h1>

            <p className="text-xs text-slate-500">
              Proposé par l’équipe d'animation du BDE YouCode
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            {activity.isRegistered ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-700 ring-1 ring-inset ring-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Vous êtes inscrit
              </span>
            ) : (
              <StatusBadge status={activity.status} />
            )}
          </div>
        </div>
      </div>

      {/* Two Column Layout: Info on Left, Registration on Right */}
      <div className="grid gap-8 lg:grid-cols-12 items-start">
        {/* Left Column: Details */}
        <div className="space-y-6 lg:col-span-7">
          {/* Presentation Panel */}
          <section className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-card">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Présentation de la session</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 whitespace-pre-line">
              {activity.description}
            </p>
          </section>

          {/* Practical Info Panel */}
          <section className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-card">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Informations Pratiques</h2>

            <dl className="mt-4 grid gap-5 sm:grid-cols-2 text-xs text-slate-600">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-700 border border-purple-100">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <dt className="font-bold text-slate-900 text-xs">Dates de l'événement</dt>
                  <dd className="mt-0.5 text-slate-600">
                    Du {activity.startsAt} au {activity.endsAt}
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-700 border border-purple-100">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <dt className="font-bold text-slate-900 text-xs">Lieu de déroulement</dt>
                  <dd className="mt-0.5 text-slate-600">{activity.location}</dd>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-700 border border-purple-100">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <dt className="font-bold text-slate-900 text-xs">Clôture des inscriptions</dt>
                  <dd className="mt-0.5 text-slate-600">{activity.registrationDeadline}</dd>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-700 border border-purple-100">
                  <Ticket className="w-4 h-4" />
                </div>
                <div>
                  <dt className="font-bold text-slate-900 text-xs">Capacité d'accueil</dt>
                  <dd className="mt-0.5 text-slate-600">
                    {activity.registeredCount} / {activity.capacity} places occupées ({percentage}%)
                  </dd>
                </div>
              </div>

              {activity.usesTeams && (
                <div className="flex items-start gap-3 sm:col-span-2 border-t border-slate-100 pt-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-100">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <dt className="font-bold text-slate-900 text-xs">Format en Équipe</dt>
                    <dd className="mt-0.5 text-slate-600 leading-relaxed">
                      Équipe requise de {activity.minTeamSize} à {activity.maxTeamSize} apprenants YouCode.
                      Le créateur de l'équipe partage son code d'invitation avec ses coéquipiers, puis soumet la composition finale.
                    </dd>
                  </div>
                </div>
              )}
            </dl>
          </section>
        </div>

        {/* Right Column: Interactive Registration Card */}
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-card space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="font-display text-lg font-bold text-slate-900">
                Participation & Inscription
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {activity.usesTeams ? 'Participation collective sous format équipe' : 'Inscription individuelle nominative'}
              </p>
            </div>

            {isGuest ? (
              <div className="rounded-2xl bg-purple-50/70 border border-purple-100 p-5 text-center space-y-3">
                <AlertCircle className="w-7 h-7 text-purple-600 mx-auto" />
                <h3 className="text-sm font-bold text-slate-900">Compte étudiant requis</h3>
                <p className="text-xs text-slate-600">
                  Connectez-vous avec votre adresse YouCode pour réserver votre place à cette activité.
                </p>
                <button
                  onClick={() => onNavigate('login')}
                  className="w-full rounded-xl bg-purple-600 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-purple-700 transition-all"
                >
                  Se connecter à YouCast
                </button>
              </div>
            ) : !activity.usesTeams ? (
              /* Solo Registration Workflow */
              <div className="space-y-4">
                <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200 text-xs text-slate-600 space-y-2">
                  <p className="font-bold text-slate-900">Format individuel</p>
                  <p>Votre place sera réservée immédiatement au nom de <strong className="text-purple-700">{currentUser.name}</strong>.</p>
                </div>

                {activity.isRegistered ? (
                  <div className="space-y-3">
                    <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3.5 flex items-center gap-2.5 text-xs font-semibold text-emerald-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Vous êtes officiellement inscrit à cette session.</span>
                    </div>
                    <button
                      onClick={() => onToggleRegister(activity.id)}
                      className="w-full rounded-xl border border-rose-200 bg-rose-50/60 py-2.5 text-xs font-bold text-rose-700 hover:bg-rose-100 transition-all"
                    >
                      Annuler mon inscription
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => onToggleRegister(activity.id)}
                    className="w-full rounded-xl bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 py-3 text-sm font-bold text-white shadow-md shadow-purple-500/20 hover:shadow-lg hover:shadow-purple-500/35 hover:brightness-105 active:scale-[0.98] transition-all"
                  >
                    Confirmer mon inscription individuelle
                  </button>
                )}
              </div>
            ) : (
              /* Team Registration Workflow */
              <div className="space-y-5">
                {teamCreated ? (
                  /* Team Enrolled View */
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-purple-200 bg-purple-50/70 p-4.5 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-wider text-purple-700">Votre Équipe</p>
                          <p className="text-base font-extrabold text-slate-900">{teamName}</p>
                        </div>
                        <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
                          Inscrite
                        </span>
                      </div>

                      {/* Code Share */}
                      <div className="rounded-xl bg-white border border-purple-200/90 p-3 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 font-medium">Code d'invitation :</span>
                          <p className="font-mono text-sm font-black text-purple-900 tracking-wider">{joinCode}</p>
                        </div>
                        <button
                          onClick={handleCopyCode}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-purple-100 px-2.5 py-1.5 text-xs font-bold text-purple-800 hover:bg-purple-200 transition-colors"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>{copied ? 'Copié !' : 'Copier'}</span>
                        </button>
                      </div>

                      {/* Team Member List */}
                      <div className="space-y-2 pt-2">
                        <p className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                          Membres ({teamMembers.length}/{activity.maxTeamSize})
                        </p>
                        <div className="space-y-1.5">
                          {teamMembers.map((member, i) => (
                            <div key={i} className="flex items-center justify-between text-xs bg-white rounded-lg px-3 py-1.5 border border-slate-100">
                              <span className="font-semibold text-slate-800">{member.name}</span>
                              <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                                {member.role}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setTeamCreated(false);
                        onToggleRegister(activity.id);
                        setFeedbackNotice('Votre équipe a été dissoute.');
                      }}
                      className="w-full text-center text-xs font-semibold text-rose-600 hover:text-rose-800 py-1"
                    >
                      Dissoudre ou quitter cette équipe
                    </button>
                  </div>
                ) : (
                  /* Create or Join Team */
                  <div className="space-y-5">
                    {/* Option 1: Create Team */}
                    <form onSubmit={handleCreateTeam} className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-purple-600" />
                        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">1. Créer une nouvelle équipe</h3>
                      </div>
                      <input
                        type="text"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        placeholder="Nom de votre équipe (ex. ByteBenders)"
                        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                      <button
                        type="submit"
                        className="w-full rounded-xl bg-purple-600 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-purple-700 transition-all"
                      >
                        Créer et obtenir le code d'invitation
                      </button>
                    </form>

                    {/* Option 2: Join with Code */}
                    <form onSubmit={handleJoinWithCode} className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <UserPlus className="w-4 h-4 text-indigo-600" />
                        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">2. Rejoindre une équipe existante</h3>
                      </div>
                      <input
                        type="text"
                        value={inputJoinCode}
                        onChange={(e) => setInputJoinCode(e.target.value)}
                        placeholder="Code à 8 caractères (ex. YC-ALPHA-92)"
                        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-mono font-bold text-slate-900 uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <button
                        type="submit"
                        className="w-full rounded-xl bg-indigo-600 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 transition-all"
                      >
                        Valider et rejoindre l'équipe
                      </button>
                    </form>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
