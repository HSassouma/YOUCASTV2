import React from 'react';
import { 
  Compass, 
  Calendar, 
  LayoutDashboard, 
  Lightbulb, 
  MessageSquare, 
  Settings, 
  ShieldCheck, 
  Code2, 
  User as UserIcon, 
  LogOut, 
  ChevronDown, 
  Menu, 
  X,
  Sparkles
} from 'lucide-react';
import { UserRole, User } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  role: UserRole;
  setRole: (role: UserRole) => void;
  currentUser: User;
  unreadCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  role,
  setRole,
  currentUser,
  unreadCount,
}) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const isAdmin = role === 'admin';
  const isGuest = role === 'guest';

  const navItemClass = (tab: string) =>
    `relative inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold transition-all duration-150 ${
      currentTab === tab
        ? 'bg-purple-100/80 text-purple-900 shadow-xs ring-1 ring-purple-200/60'
        : 'text-slate-600 hover:bg-purple-50 hover:text-purple-700'
    }`;

  return (
    <>
      {/* Role & Preview Switcher Bar */}
      <div className="bg-slate-950 text-white text-xs py-2 px-4 border-b border-purple-900/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-purple-200">YouCast Live Refonte UI/UX</span>
            <span className="hidden sm:inline text-slate-400">· Dépôt Laravel YouCode BDE</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-[11px] hidden md:inline">Simuler un profil :</span>
            <div className="inline-flex rounded-lg bg-slate-900 p-0.5 border border-purple-900/50">
              <button
                onClick={() => { setRole('student'); if (currentTab.startsWith('admin-')) setCurrentTab('dashboard'); }}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                  role === 'student' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                Étudiant
              </button>
              <button
                onClick={() => setRole('admin')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                  role === 'admin' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                BDE (Admin)
              </button>
              <button
                onClick={() => setRole('guest')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                  role === 'guest' ? 'bg-slate-700 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                Visiteur
              </button>
            </div>

            <button
              onClick={() => setCurrentTab('inspector')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-bold transition-all ${
                currentTab === 'inspector' 
                  ? 'bg-amber-400 text-slate-950 shadow-sm' 
                  : 'bg-purple-950/80 text-purple-300 hover:bg-purple-900 border border-purple-800/60'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Fichiers modifiés</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Brand Logo */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentTab('home')}
                className="group flex items-center gap-2.5 transition-transform hover:scale-[1.02]"
              >
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-950 via-slate-900 to-indigo-950 p-2 shadow-sm ring-1 ring-purple-900/30">
                  <svg viewBox="0 0 48 48" fill="none" className="h-6 w-6" role="img">
                    <rect x="18" y="8" width="12" height="23" rx="6" fill="#8B5CF6" />
                    <path d="M8 21v6M12 17v14M36 17v14M40 21v6" stroke="#8291FF" strokeWidth="2.2" strokeLinecap="round" />
                    <circle cx="30.5" cy="14.5" r="4" fill="#F8F7FF" />
                    <path d="m29.7 12.7 2.5 1.8-2.5 1.8v-3.6Z" fill="#6854D9" />
                    <path d="M14 22v1a10 10 0 0 0 20 0v-1M24 33v4M19 38h10" stroke="#F8F7FF" strokeWidth="2.2" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="font-display text-xl font-black tracking-tight text-slate-900 group-hover:text-purple-600 transition-colors">
                      YouCast
                    </span>
                    <span className="inline-flex rounded-full bg-purple-100 px-1.5 py-0.2 text-[10px] font-black text-purple-700 tracking-wider">
                      BDE
                    </span>
                  </div>
                  <p className="text-[10px] font-medium text-slate-400 hidden sm:block">Campus YouCode</p>
                </div>
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1">
              <button onClick={() => setCurrentTab('home')} className={navItemClass('home')}>
                <Compass className="w-4 h-4 text-purple-600" />
                <span>Accueil</span>
              </button>

              <button onClick={() => setCurrentTab('activities')} className={navItemClass('activities')}>
                <Calendar className="w-4 h-4 text-purple-600" />
                <span>Activités</span>
              </button>

              {!isGuest && (
                <>
                  <button onClick={() => setCurrentTab('dashboard')} className={navItemClass('dashboard')}>
                    <LayoutDashboard className="w-4 h-4 text-purple-600" />
                    <span>Tableau de bord</span>
                  </button>

                  <button onClick={() => setCurrentTab('ideas')} className={navItemClass('ideas')}>
                    <Lightbulb className="w-4 h-4 text-purple-600" />
                    <span>Boîte à Idées</span>
                  </button>

                  {isAdmin && (
                    <>
                      <div className="h-5 w-px bg-slate-200 mx-1"></div>
                      <button onClick={() => setCurrentTab('admin-activities')} className={navItemClass('admin-activities')}>
                        <Settings className="w-4 h-4 text-indigo-600" />
                        <span>Gestion BDE</span>
                      </button>
                    </>
                  )}

                  <button onClick={() => setCurrentTab('messages')} className={navItemClass('messages')}>
                    <MessageSquare className="w-4 h-4 text-purple-600" />
                    <span>Messages</span>
                    {unreadCount > 0 && (
                      <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-1.5 text-[10px] font-bold text-white shadow-xs">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                </>
              )}
            </div>

            {/* Account / Action Area */}
            <div className="flex items-center gap-3">
              {isGuest ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentTab('login')}
                    className="rounded-xl px-3.5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                  >
                    Se connecter
                  </button>
                  <button
                    onClick={() => setCurrentTab('register')}
                    className="inline-flex min-h-10 items-center justify-center rounded-xl bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 px-4 text-sm font-bold text-white shadow-sm shadow-purple-500/20 hover:shadow-md hover:shadow-purple-500/30 hover:brightness-105 transition-all"
                  >
                    Créer un compte
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2.5 rounded-xl p-1.5 hover:bg-purple-50/60 transition-colors"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-indigo-700 text-sm font-bold text-white shadow-xs">
                      {currentUser.name.charAt(0)}
                    </div>
                    <div className="hidden sm:block text-left">
                      <p className="text-xs font-bold text-slate-900 max-w-[120px] truncate">{currentUser.name}</p>
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-purple-700">
                        {isAdmin ? 'Responsable BDE' : 'Apprenant'}
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </button>

                  {/* Dropdown menu */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-200/90 bg-white p-2 shadow-xl z-50 animate-in fade-in zoom-in-95">
                      <div className="border-b border-slate-100 px-3 py-2.5 bg-slate-50/70 rounded-xl mb-1">
                        <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                        <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                        <p className="mt-1.5 inline-flex items-center gap-1 rounded-md bg-purple-100 px-2 py-0.5 text-[10px] font-bold text-purple-800">
                          <ShieldCheck className="w-3 h-3" />
                          {isAdmin ? 'Administrateur BDE' : 'Étudiant YouCode'}
                        </p>
                      </div>

                      <button
                        onClick={() => { setCurrentTab('profile'); setDropdownOpen(false); }}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-purple-50 hover:text-purple-900"
                      >
                        <UserIcon className="w-4 h-4 text-purple-600" />
                        Mon profil
                      </button>

                      <button
                        onClick={() => { setCurrentTab('messages'); setDropdownOpen(false); }}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-purple-50 hover:text-purple-900"
                      >
                        <MessageSquare className="w-4 h-4 text-purple-600" />
                        Boîte de réception
                      </button>

                      <div className="my-1 border-t border-slate-100"></div>

                      <button
                        onClick={() => { setRole('guest'); setCurrentTab('home'); setDropdownOpen(false); }}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50"
                      >
                        <LogOut className="w-4 h-4" />
                        Se déconnecter
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md px-4 py-4 space-y-1">
            <button
              onClick={() => { setCurrentTab('home'); setMobileOpen(false); }}
              className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-purple-50"
            >
              <Compass className="w-4 h-4 text-purple-600" />
              Accueil
            </button>
            <button
              onClick={() => { setCurrentTab('activities'); setMobileOpen(false); }}
              className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-purple-50"
            >
              <Calendar className="w-4 h-4 text-purple-600" />
              Activités
            </button>
            {!isGuest && (
              <>
                <button
                  onClick={() => { setCurrentTab('dashboard'); setMobileOpen(false); }}
                  className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-purple-50"
                >
                  <LayoutDashboard className="w-4 h-4 text-purple-600" />
                  Tableau de bord
                </button>
                <button
                  onClick={() => { setCurrentTab('ideas'); setMobileOpen(false); }}
                  className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-purple-50"
                >
                  <Lightbulb className="w-4 h-4 text-purple-600" />
                  Boîte à Idées
                </button>
                {isAdmin && (
                  <button
                    onClick={() => { setCurrentTab('admin-activities'); setMobileOpen(false); }}
                    className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-purple-50"
                  >
                    <Settings className="w-4 h-4 text-indigo-600" />
                    Gestion des activités
                  </button>
                )}
                <button
                  onClick={() => { setCurrentTab('messages'); setMobileOpen(false); }}
                  className="flex w-full items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-purple-50"
                >
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-4 h-4 text-purple-600" />
                    Messages
                  </div>
                  {unreadCount > 0 && (
                    <span className="rounded-full bg-purple-600 px-2 py-0.5 text-xs text-white">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </>
            )}
            <button
              onClick={() => { setCurrentTab('inspector'); setMobileOpen(false); }}
              className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-amber-700 bg-amber-50"
            >
              <Code2 className="w-4 h-4 text-amber-600" />
              Voir les fichiers Laravel modifiés
            </button>
          </div>
        )}
      </nav>
    </>
  );
};
