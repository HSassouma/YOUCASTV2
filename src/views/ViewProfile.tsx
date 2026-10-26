import React, { useState } from 'react';
import { 
  User as UserIcon, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  Building, 
  GraduationCap,
  Save
} from 'lucide-react';
import { User } from '../types';

interface ViewProfileProps {
  currentUser: User;
  isAdmin: boolean;
}

export const ViewProfile: React.FC<ViewProfileProps> = ({ currentUser, isAdmin }) => {
  const [name, setName] = useState(currentUser.name);
  const [email] = useState(currentUser.email);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200/80 pb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-purple-700">Paramètres du Compte</span>
        <h1 className="mt-1 font-display text-3xl font-extrabold text-slate-900 tracking-tight">
          Mon Profil YouCast
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Gérez vos informations personnelles et vos identifiants d’accès.
        </p>
      </div>

      {savedNotice && (
        <div className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-bold text-emerald-800 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Vos modifications ont été enregistrées avec succès.</span>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-3">
        {/* Profile Card */}
        <div className="sm:col-span-1 rounded-3xl border border-slate-200/90 bg-white p-6 shadow-card space-y-4 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 text-3xl font-black text-white shadow-md shadow-purple-500/20">
            {currentUser.name.charAt(0)}
          </div>
          <div>
            <h2 className="font-bold text-slate-900 text-base">{currentUser.name}</h2>
            <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
          </div>
          <div className="pt-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1 text-xs font-bold text-purple-800 border border-purple-200">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
              {isAdmin ? 'Administrateur BDE' : 'Apprenant YouCode'}
            </span>
          </div>

          <div className="border-t border-slate-100 pt-4 text-left text-xs space-y-2 text-slate-600">
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-slate-400" />
              <span>{currentUser.campus || 'YouCode Maroc'}</span>
            </div>
            {currentUser.promo && (
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-slate-400" />
                <span>{currentUser.promo}</span>
              </div>
            )}
          </div>
        </div>

        {/* Edit Form */}
        <div className="sm:col-span-2 space-y-6">
          <form onSubmit={handleSave} className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-card space-y-4 text-xs">
            <h3 className="font-display text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Informations du compte
            </h3>

            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-700 text-[11px]">
                Nom d'affichage
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-4 focus:ring-purple-500/15 focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-700 text-[11px]">
                Adresse e-mail institutionnelle
              </label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full mt-1.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-500 cursor-not-allowed"
              />
              <p className="mt-1 text-[10px] text-slate-400">L'adresse e-mail est liée à votre authentification YouCode.</p>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-purple-700 transition-all"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Sauvegarder mon profil</span>
              </button>
            </div>
          </form>

          {/* Change Password Form */}
          <form onSubmit={handleSave} className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-card space-y-4 text-xs">
            <h3 className="font-display text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Lock className="w-4 h-4 text-purple-600" />
              <span>Changer le mot de passe</span>
            </h3>

            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-700 text-[11px]">
                Mot de passe actuel
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full mt-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-4 focus:ring-purple-500/15 focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-700 text-[11px]">
                Nouveau mot de passe
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full mt-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-4 focus:ring-purple-500/15 focus:border-purple-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-800 shadow-xs hover:bg-slate-50 transition-all"
              >
                Mettre à jour le mot de passe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
