import React from 'react';
import { Calendar, MapPin, Clock, Ticket, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Activity } from '../types';
import { StatusBadge } from './StatusBadge';

interface ActivityCardProps {
  activity: Activity;
  onSelect: (activity: Activity) => void;
  onToggleRegister?: (activityId: string) => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  onSelect,
}) => {
  const percentage = Math.min(100, Math.round((activity.registeredCount / activity.capacity) * 100));
  
  // Extract date tokens
  const dateParts = activity.startsAt.split(' ');
  const day = dateParts[0] || '14';
  const month = dateParts[1] || 'Nov';

  return (
    <article className="group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-card hover:shadow-cardHover hover:border-purple-300 transition-all duration-300 relative overflow-hidden">
      {/* Top subtle highlight indicator */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500 transform origin-left group-hover:scale-x-100 transition-transform duration-300"></div>

      <div>
        {/* Header: Date Tile + Title */}
        <div className="flex items-start gap-4">
          <div className="flex shrink-0 flex-col items-center justify-center rounded-xl bg-gradient-to-br from-purple-100 to-indigo-100 border border-purple-200/80 px-3.5 py-2 text-purple-950 shadow-xs">
            <span className="font-display text-xl font-black leading-none">{day}</span>
            <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-purple-700">{month}</span>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex rounded-md bg-purple-50 px-2 py-0.5 text-xs font-bold text-purple-700">
                {activity.typeLabel}
              </span>
              <span className="text-[11px] text-slate-400 font-medium truncate">
                {activity.category}
              </span>
            </div>

            <h3 
              onClick={() => onSelect(activity)}
              className="mt-2 text-base font-bold text-slate-900 group-hover:text-purple-600 transition-colors line-clamp-2 cursor-pointer"
            >
              {activity.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="mt-3.5 text-xs leading-relaxed text-slate-600 line-clamp-2">
          {activity.description}
        </p>

        {/* Meta items */}
        <div className="mt-4 space-y-2 border-t border-slate-100 pt-3.5 text-xs text-slate-600">
          <div className="flex items-center gap-2 truncate">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-purple-600" />
            <span className="truncate">{activity.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 shrink-0 text-purple-600" />
            <span>Fin inscriptions : {activity.registrationDeadline}</span>
          </div>

          {/* Capacity Progress Bar */}
          <div className="space-y-1 pt-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1.5 text-slate-600">
                <Ticket className="w-3.5 h-3.5 text-purple-600" />
                {activity.registeredCount} / {activity.capacity} inscrits
              </span>
              <span className="font-bold text-purple-700">{percentage}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-500" 
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>

          {activity.usesTeams && (
            <div className="flex items-center gap-2 pt-0.5 text-slate-500">
              <Users className="w-3.5 h-3.5 text-purple-600" />
              <span>Format Équipe ({activity.minTeamSize} à {activity.maxTeamSize} pers.)</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
        {activity.isRegistered ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 ring-1 ring-inset ring-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Inscrit
          </span>
        ) : (
          <StatusBadge status={activity.status} />
        )}

        <button
          onClick={() => onSelect(activity)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-slate-50 px-3.5 py-1.5 text-xs font-bold text-purple-700 ring-1 ring-inset ring-slate-200 hover:bg-purple-600 hover:text-white hover:ring-purple-600 transition-all duration-200 group/btn"
        >
          <span>Détails & Inscription</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
        </button>
      </div>
    </article>
  );
};
