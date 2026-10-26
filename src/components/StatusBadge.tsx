import React from 'react';

interface StatusBadgeProps {
  status: string;
  label?: string;
  icon?: React.ReactNode;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label, icon }) => {
  let style = 'bg-purple-50 text-purple-700 ring-purple-200/80';
  let dotColor = 'bg-purple-500 shadow-xs shadow-purple-400';
  let defaultLabel = label || status;

  switch (status) {
    case 'published':
    case 'accepted':
    case 'registered':
    case 'open':
      style = 'bg-emerald-50 text-emerald-700 ring-emerald-200/80';
      dotColor = 'bg-emerald-500 shadow-xs shadow-emerald-400';
      defaultLabel = label || (status === 'published' ? 'Publiée' : status === 'accepted' ? 'Acceptée' : status === 'registered' ? 'Inscrit' : 'Ouvert');
      break;

    case 'draft':
    case 'pending':
      style = 'bg-amber-50 text-amber-700 ring-amber-200/80';
      dotColor = 'bg-amber-500 shadow-xs shadow-amber-400';
      defaultLabel = label || (status === 'draft' ? 'Brouillon' : 'En attente');
      break;

    case 'closed':
      style = 'bg-slate-100 text-slate-600 ring-slate-200/80';
      dotColor = 'bg-slate-400';
      defaultLabel = label || 'Clôturée';
      break;

    case 'rejected':
    case 'cancelled':
    case 'archived':
      style = 'bg-rose-50 text-rose-700 ring-rose-200/80';
      dotColor = 'bg-rose-500 shadow-xs shadow-rose-400';
      defaultLabel = label || (status === 'rejected' ? 'Refusée' : 'Annulée');
      break;
  }

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${style}`}>
      {icon ? (
        icon
      ) : (
        <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`} aria-hidden="true"></span>
      )}
      {defaultLabel}
    </span>
  );
};
