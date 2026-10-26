import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Plus, 
  Clock, 
  CheckCircle2, 
  User, 
  ShieldCheck, 
  Search,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { Conversation, MessageItem } from '../types';

interface ViewMessagesProps {
  conversations: Conversation[];
  onSendMessage: (conversationId: string, text: string) => void;
  onCreateConversation: (subject: string, initialMessage: string) => void;
}

export const ViewMessages: React.FC<ViewMessagesProps> = ({
  conversations,
  onSendMessage,
  onCreateConversation,
}) => {
  const [selectedId, setSelectedId] = useState<string>(conversations[0]?.id || '');
  const [replyText, setReplyText] = useState('');
  const [newModalOpen, setNewModalOpen] = useState(false);
  const [newSubject, setNewSubject] = useState('');
  const [newBody, setNewBody] = useState('');

  const activeConversation = conversations.find((c) => c.id === selectedId) || conversations[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeConversation) return;
    onSendMessage(activeConversation.id, replyText);
    setReplyText('');
  };

  const handleCreateNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.trim() || !newBody.trim()) return;
    onCreateConversation(newSubject, newBody);
    setNewModalOpen(false);
    setNewSubject('');
    setNewBody('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-700">
            <MessageSquare className="w-4 h-4 text-purple-600" />
            <span>Messagerie Interne YouCast</span>
          </div>
          <h1 className="mt-1 font-display text-3xl font-extrabold text-slate-900 tracking-tight">
            Échanges Privés BDE
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Discutez en toute confidentialité avec l'équipe du Bureau Des Étudiants YouCode.
          </p>
        </div>

        <button
          onClick={() => setNewModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:brightness-105 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Nouvelle conversation</span>
        </button>
      </div>

      {/* Main Inbox Box */}
      <div className="grid gap-6 lg:grid-cols-12 min-h-[560px] items-stretch">
        {/* Left Side: Conversation List (4 cols) */}
        <div className="lg:col-span-5 rounded-3xl border border-slate-200/90 bg-white shadow-card overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Discussions ouvertes ({conversations.length})
            </p>
          </div>

          <div className="divide-y divide-slate-100 overflow-y-auto flex-1">
            {conversations.map((conv) => {
              const isSelected = conv.id === activeConversation?.id;
              const lastMsg = conv.messages[conv.messages.length - 1];
              return (
                <button
                  key={conv.id}
                  onClick={() => setSelectedId(conv.id)}
                  className={`w-full text-left p-4.5 transition-colors block ${
                    isSelected ? 'bg-purple-50/80 border-l-4 border-purple-600' : 'hover:bg-slate-50/70'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xs font-bold text-slate-900 line-clamp-1">
                      {conv.subject}
                    </h3>
                    {conv.unreadCount > 0 && (
                      <span className="rounded-full bg-purple-600 px-1.5 py-0.5 text-[10px] font-bold text-white shrink-0">
                        {conv.unreadCount} non lu
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-slate-500 line-clamp-1">
                    {lastMsg?.body || 'Discussion sans message'}
                  </p>
                  <p className="mt-2 text-[10px] text-slate-400 font-medium">
                    {conv.lastMessageAt}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Chat Thread (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl border border-slate-200/90 bg-white shadow-card overflow-hidden flex flex-col">
          {activeConversation ? (
            <>
              {/* Chat Thread Header */}
              <div className="p-4.5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-slate-900 line-clamp-1">
                    {activeConversation.subject}
                  </h2>
                  <p className="text-[11px] text-slate-500">
                    Statut : <span className="font-semibold text-emerald-600">Conversation ouverte avec le BDE</span>
                  </p>
                </div>
              </div>

              {/* Chat Messages Body */}
              <div className="p-5 flex-1 overflow-y-auto space-y-4 bg-slate-50/30">
                {activeConversation.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.isMine ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-4 shadow-xs text-xs ${
                        msg.isMine
                          ? 'bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 text-white shadow-sm shadow-purple-500/20'
                          : 'bg-white border border-slate-200 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1.5 text-[11px]">
                        <span className={`font-bold ${msg.isMine ? 'text-purple-100' : 'text-purple-900'}`}>
                          {msg.isMine ? 'Vous' : msg.senderName}
                        </span>
                        {!msg.isMine && (
                          <span className="rounded bg-purple-100 px-1.5 py-0.2 text-[9px] font-black text-purple-800">
                            BDE
                          </span>
                        )}
                        <span className={`text-[10px] ${msg.isMine ? 'text-purple-200' : 'text-slate-400'}`}>
                          {msg.timestamp}
                        </span>
                      </div>
                      <p className="leading-relaxed whitespace-pre-line">{msg.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSend} className="p-4 border-t border-slate-100 bg-white flex items-center gap-3">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Écrivez votre réponse ici..."
                  className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-4 focus:ring-purple-500/15 focus:border-purple-500 transition-all"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-purple-700 transition-all flex items-center gap-1.5 shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Envoyer</span>
                </button>
              </form>
            </>
          ) : (
            <div className="p-12 text-center text-xs text-slate-400 m-auto">
              Sélectionnez une discussion à gauche pour voir les messages.
            </div>
          )}
        </div>
      </div>

      {/* Modal: New Conversation */}
      {newModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-2xl space-y-4 animate-in zoom-in-95">
            <h3 className="font-display text-lg font-bold text-slate-900">
              Nouveau message pour le BDE
            </h3>
            <p className="text-xs text-slate-500">
              Posez votre question sur les événements, les inscriptions ou les équipes.
            </p>

            <form onSubmit={handleCreateNew} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase text-[11px] text-slate-700">Objet du message *</label>
                <input
                  type="text"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="ex. Renseignement Hackathon Safi"
                  className="w-full mt-1.5 rounded-xl border border-slate-200 px-3.5 py-2 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-[11px] text-slate-700">Votre message *</label>
                <textarea
                  value={newBody}
                  onChange={(e) => setNewBody(e.target.value)}
                  rows={4}
                  placeholder="Expliquez votre demande clairement..."
                  className="w-full mt-1.5 rounded-xl border border-slate-200 p-3 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setNewModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-purple-600 px-5 py-2 font-bold text-white shadow-xs hover:bg-purple-700"
                >
                  Envoyer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
