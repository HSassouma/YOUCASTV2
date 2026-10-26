import React from 'react';
import { Github, Heart, ShieldCheck, ExternalLink, Calendar, Lightbulb, MessageSquare } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-slate-200/80 bg-white text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-950 to-indigo-950 p-2 text-white">
                <svg viewBox="0 0 48 48" fill="none" className="h-5 w-5" role="img">
                  <rect x="18" y="8" width="12" height="23" rx="6" fill="#8B5CF6" />
                  <path d="M8 21v6M12 17v14M36 17v14M40 21v6" stroke="#8291FF" strokeWidth="2.2" strokeLinecap="round" />
                  <circle cx="30.5" cy="14.5" r="4" fill="#F8F7FF" />
                  <path d="m29.7 12.7 2.5 1.8-2.5 1.8v-3.6Z" fill="#6854D9" />
                </svg>
              </div>
              <span className="font-display text-lg font-black tracking-tight text-slate-900">YouCast</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              La plateforme collaborative et communautaire du BDE YouCode pour tous les événements, défis et compétitions étudiantes.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-2.5">
            <p className="font-bold uppercase tracking-wider text-slate-900 text-[11px]">Navigation YouCast</p>
            <ul className="space-y-2 text-slate-500">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-purple-700 transition-colors">
                  Accueil & Présentation
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('activities')} className="hover:text-purple-700 transition-colors">
                  Catalogue des Activités
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ideas')} className="hover:text-purple-700 transition-colors">
                  Boîte à Idées & Défis
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('messages')} className="hover:text-purple-700 transition-colors">
                  Contacter le BDE en privé
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Campus YouCode */}
          <div className="space-y-2.5">
            <p className="font-bold uppercase tracking-wider text-slate-900 text-[11px]">Campus & Esprit</p>
            <p className="text-slate-500 leading-relaxed">
              Développé pour les apprenants des campus YouCode Safi et Youssoufia.
            </p>
            <div className="pt-1 flex items-center gap-2 text-purple-700 font-semibold">
              <ShieldCheck className="w-4 h-4 text-purple-600" />
              <span>Pédagogie active & entraide</span>
            </div>
          </div>

          {/* Col 4: GitHub Repo */}
          <div className="space-y-2.5">
            <p className="font-bold uppercase tracking-wider text-slate-900 text-[11px]">Projet Open-Source</p>
            <p className="text-slate-500 leading-relaxed">
              Dépôt original Laravel avec Blade, Alpine.js et Tailwind CSS.
            </p>
            <a
              href="https://github.com/HSassouma/YouCast"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-800 hover:bg-purple-50 hover:text-purple-900 hover:border-purple-200 transition-all"
            >
              <Github className="w-4 h-4" />
              <span>Dépôt GitHub YouCast</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <p>© 2026 YouCast · Bureau Des Étudiants YouCode. Tous droits réservés.</p>
          <p className="flex items-center gap-1">
            Refonte visuelle conçue avec excellence et passion
          </p>
        </div>
      </div>
    </footer>
  );
};
