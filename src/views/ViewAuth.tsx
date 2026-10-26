import React, { useState } from 'react';
import { 
  Lock, 
  UserPlus, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { UserRole } from '../types';

interface ViewAuthProps {
  initialMode?: 'login' | 'register';
  onSuccess: (role: UserRole) => void;
  onNavigateHome: () => void;
}

export const ViewAuth: React.FC<ViewAuthProps> = ({
  initialMode = 'login',
  onSuccess,
  onNavigateHome,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [email, setEmail] = useState('y.bennani@youcode.ma');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('Yassine Bennani');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('admin') || email.includes('bde')) {
      onSuccess('admin');
    } else {
      onSuccess('student');
    }
  };

  return (
    <div className="min-h-[85vh] grid lg:grid-cols-[1.1fr_.9fr] rounded-3xl overflow-hidden border border-slate-200/90 shadow-2xl max-w-6xl mx-auto my-6 bg-white">
      {/* Left Brand Showcase Column */}
      <aside className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 p-12 text-white border-r border-purple-900/40">
        {/* Ambient Blur Orbs */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl"></div>
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl"></div>

        <div className="relative z-10 flex items-center justify-between">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-3 group text-left"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 p-2 ring-1 ring-white/20 backdrop-blur-sm group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 48 48" fill="none" className="h-6 w-6" role="img">
                <rect x="18" y="8" width="12" height="23" rx="6" fill="#8B5CF6" />
                <path d="M8 21v6M12 17v14M36 17v14M40 21v6" stroke="#8291FF" strokeWidth="2.2" strokeLinecap="round" />
                <circle cx="30.5" cy="14.5" r="4" fill="#F8F7FF" />
                <path d="m29.7 12.7 2.5 1.8-2.5 1.8v-3.6Z" fill="#6854D9" />
                <path d="M14 22v1a10 10 0 0 0 20 0v-1M24 33v4M19 38h10" stroke="#F8F7FF" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <span className="font-display text-2xl font-black tracking-tight text-white">YouCast</span>
              <p className="text-[10px] text-purple-300 font-semibold tracking-wider uppercase">BDE YouCode</p>
            </div>
          </button>
        </div>

        <div className="relative z-10 max-w-md py-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-purple-300 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-purple-400"></span>
            Espace Membres YouCode
          </div>

          <h2 className="mt-8 font-display text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl text-white">
            L’énergie du campus, <span className="bg-gradient-to-r from-purple-300 via-indigo-200 to-blue-300 bg-clip-text text-transparent">au même endroit.</span>
          </h2>

          <p className="mt-6 text-sm leading-relaxed text-slate-300">
            Rejoignez vos pairs sur les défis techniques, proposez vos idées et inscrivez vos équipes sans complication.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-3 border-y border-white/10 py-5 text-xs">
            <div className="border-r border-white/10 pe-3">
              <p className="text-slate-400">Défis</p>
              <p className="font-display text-lg font-bold text-white mt-0.5">Créatifs</p>
            </div>
            <div className="border-r border-white/10 px-3">
              <p className="text-slate-400">Équipes</p>
              <p className="font-display text-lg font-bold text-white mt-0.5">Soudées</p>
            </div>
            <div className="ps-3">
              <p className="text-slate-400">Idées</p>
              <p className="font-display text-lg font-bold text-white mt-0.5">Propulsées</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between text-xs text-slate-400">
          <p>YouCast · Conçu pour les apprenants YouCode</p>
          <span className="inline-flex items-center gap-1.5 text-purple-300 font-semibold">
            <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
            Campus actif
          </span>
        </div>
      </aside>

      {/* Right Form Column */}
      <div className="p-8 sm:p-12 flex flex-col justify-center max-w-md mx-auto w-full">
        <div className="mb-6 flex items-center justify-between">
          <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200">
            <button
              onClick={() => setMode('login')}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
                mode === 'login' ? 'bg-white text-purple-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Connexion
            </button>
            <button
              onClick={() => setMode('register')}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
                mode === 'register' ? 'bg-white text-purple-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Créer un compte
            </button>
          </div>

          <button
            onClick={onNavigateHome}
            className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Accueil</span>
          </button>
        </div>

        {mode === 'login' ? (
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-700">
                <Lock className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700">Connexion Sécurisée</span>
            </div>

            <h1 className="mt-4 font-display text-2xl font-extrabold text-slate-900 tracking-tight">
              Bon retour sur YouCast
            </h1>
            <p className="mt-1 text-xs text-slate-500">
              Retrouvez vos activités, équipes et conversations avec le BDE.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 text-[11px]">
                  Adresse e-mail YouCode
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nom@youcode.ma"
                  className="w-full mt-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-4 focus:ring-purple-500/15 focus:border-purple-500 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 text-[11px]">
                  Mot de passe
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full mt-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-4 focus:ring-purple-500/15 focus:border-purple-500 transition-all"
                  required
                />
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                  <input type="checkbox" defaultChecked className="rounded border-slate-300 text-purple-600 focus:ring-purple-500" />
                  <span>Se souvenir de moi</span>
                </label>
                <a href="#forgot" onClick={(e) => e.preventDefault()} className="font-semibold text-purple-700 hover:underline">
                  Mot de passe oublié ?
                </a>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 py-3 text-xs font-bold text-white shadow-md shadow-purple-500/20 hover:shadow-lg hover:shadow-purple-500/35 hover:brightness-105 active:scale-[0.98] transition-all"
                >
                  Se connecter à YouCast
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-700">
                <UserPlus className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700">Inscription Étudiante</span>
            </div>

            <h1 className="mt-4 font-display text-2xl font-extrabold text-slate-900 tracking-tight">
              Rejoindre YouCast
            </h1>
            <p className="mt-1 text-xs text-slate-500">
              Créez votre compte pour participer aux hackathons et tournois du BDE.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 text-[11px]">
                  Nom complet
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ex. Yassine Bennani"
                  className="w-full mt-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-4 focus:ring-purple-500/15 focus:border-purple-500 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 text-[11px]">
                  Adresse e-mail YouCode
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="etudiant@youcode.ma"
                  className="w-full mt-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-4 focus:ring-purple-500/15 focus:border-purple-500 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 text-[11px]">
                  Mot de passe
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full mt-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-4 focus:ring-purple-500/15 focus:border-purple-500 transition-all"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 py-3 text-xs font-bold text-white shadow-md shadow-purple-500/20 hover:shadow-lg hover:shadow-purple-500/35 hover:brightness-105 active:scale-[0.98] transition-all"
                >
                  Créer mon compte YouCast
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Quick test credentials hint */}
        <div className="mt-8 rounded-xl bg-slate-50 border border-slate-200/80 p-3 text-[11px] text-slate-500">
          <p className="font-bold text-slate-700">Identifiants de démonstration :</p>
          <div className="mt-1 flex items-center justify-between">
            <span>Étudiant : <code className="text-purple-700">y.bennani@youcode.ma</code></span>
            <span>BDE Admin : <code className="text-indigo-700">bde@youcode.ma</code></span>
          </div>
        </div>
      </div>
    </div>
  );
};
