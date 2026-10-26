/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UserRole, Activity, Idea, Conversation } from './types';
import { 
  CURRENT_STUDENT, 
  CURRENT_ADMIN, 
  INITIAL_ACTIVITIES, 
  INITIAL_IDEAS, 
  INITIAL_CONVERSATIONS 
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ViewHome } from './views/ViewHome';
import { ViewActivities } from './views/ViewActivities';
import { ViewActivityDetail } from './views/ViewActivityDetail';
import { ViewDashboardStudent } from './views/ViewDashboardStudent';
import { ViewDashboardAdmin } from './views/ViewDashboardAdmin';
import { ViewAdminActivities } from './views/ViewAdminActivities';
import { ViewIdeas } from './views/ViewIdeas';
import { ViewMessages } from './views/ViewMessages';
import { ViewAuth } from './views/ViewAuth';
import { ViewProfile } from './views/ViewProfile';
import { ViewCodeInspector } from './views/ViewCodeInspector';

export default function App() {
  const [role, setRole] = useState<UserRole>('student');
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  // Core application data state
  const [activities, setActivities] = useState<Activity[]>(INITIAL_ACTIVITIES);
  const [ideas, setIdeas] = useState<Idea[]>(INITIAL_IDEAS);
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);

  const currentUser = role === 'admin' ? CURRENT_ADMIN : CURRENT_STUDENT;
  const isGuest = role === 'guest';
  const unreadMessagesCount = conversations.reduce((acc, c) => acc + c.unreadCount, 0);

  // Handle registration toggle
  const handleToggleRegister = (activityId: string) => {
    setActivities((prev) =>
      prev.map((act) => {
        if (act.id === activityId) {
          const nextRegistered = !act.isRegistered;
          return {
            ...act,
            isRegistered: nextRegistered,
            registeredCount: nextRegistered ? act.registeredCount + 1 : Math.max(0, act.registeredCount - 1),
          };
        }
        return act;
      })
    );

    if (selectedActivity && selectedActivity.id === activityId) {
      setSelectedActivity((prev) =>
        prev
          ? {
              ...prev,
              isRegistered: !prev.isRegistered,
              registeredCount: !prev.isRegistered ? prev.registeredCount + 1 : Math.max(0, prev.registeredCount - 1),
            }
          : null
      );
    }
  };

  // Handle select activity to view detail
  const handleSelectActivity = (activity: Activity) => {
    setSelectedActivity(activity);
    setCurrentTab('activity-detail');
  };

  // Handle admin create activity
  const handleCreateActivity = (newAct: Partial<Activity>) => {
    const act: Activity = {
      id: `act-${Date.now()}`,
      title: newAct.title || 'Nouvelle activité',
      type: newAct.type || 'hackathon',
      typeLabel: newAct.typeLabel || 'Hackathon',
      category: newAct.category || 'Général',
      description: newAct.description || '',
      location: newAct.location || 'Campus YouCode',
      startsAt: newAct.startsAt || '01 Déc 2026',
      endsAt: newAct.endsAt || '02 Déc 2026',
      registrationDeadline: newAct.registrationDeadline || '28 Nov 2026',
      capacity: newAct.capacity || 50,
      registeredCount: 0,
      status: 'draft',
      usesTeams: !!newAct.usesTeams,
      minTeamSize: newAct.minTeamSize,
      maxTeamSize: newAct.maxTeamSize,
      isRegistered: false,
    };
    setActivities((prev) => [act, ...prev]);
  };

  // Handle admin update activity status
  const handleUpdateStatus = (id: string, status: 'published' | 'draft' | 'closed') => {
    setActivities((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
  };

  // Handle submit idea
  const handleAddIdea = (newIdea: Omit<Idea, 'id' | 'createdAt' | 'status'>) => {
    const idea: Idea = {
      ...newIdea,
      id: `idea-${Date.now()}`,
      createdAt: "Aujourd'hui",
      status: 'pending',
    };
    setIdeas((prev) => [idea, ...prev]);
  };

  // Handle moderate idea
  const handleModerateIdea = (id: string, status: 'accepted' | 'rejected', feedback?: string) => {
    setIdeas((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status, adminFeedback: feedback } : i))
    );
  };

  // Handle send message with automatic BDE response
  const handleSendMessage = (conversationId: string, text: string) => {
    const userMsg = {
      id: `msg-${Date.now()}`,
      senderName: currentUser.name,
      senderRole: (role === 'admin' ? 'admin' : 'student') as 'student' | 'admin',
      body: text,
      timestamp: "À l'instant",
      isMine: true,
    };

    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            lastMessageAt: "À l'instant",
            messages: [...conv.messages, userMsg],
          };
        }
        return conv;
      })
    );

    // If student sent, simulate prompt friendly BDE reply
    if (role !== 'admin') {
      setTimeout(() => {
        const replyMsg = {
          id: `msg-bde-${Date.now()}`,
          senderName: 'Responsable BDE',
          senderRole: 'admin' as const,
          body: 'Merci pour ton message ! L’équipe du BDE a bien pris note de ta demande. Nous te revenons très rapidement avec tous les détails.',
          timestamp: "À l'instant",
          isMine: false,
        };

        setConversations((prev) =>
          prev.map((conv) => {
            if (conv.id === conversationId) {
              return {
                ...conv,
                lastMessageAt: "À l'instant",
                unreadCount: conv.unreadCount + 1,
                messages: [...conv.messages, replyMsg],
              };
            }
            return conv;
          })
        );
      }, 1200);
    }
  };

  // Handle create conversation
  const handleCreateConversation = (subject: string, initialMessage: string) => {
    const newConv: Conversation = {
      id: `conv-${Date.now()}`,
      subject,
      status: 'open',
      lastMessageAt: "À l'instant",
      unreadCount: 0,
      messages: [
        {
          id: `msg-${Date.now()}`,
          senderName: currentUser.name,
          senderRole: (role === 'admin' ? 'admin' : 'student') as 'student' | 'admin',
          body: initialMessage,
          timestamp: "À l'instant",
          isMine: true,
        },
      ],
    };
    setConversations((prev) => [newConv, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FE] text-slate-900 font-sans antialiased selection:bg-purple-200 selection:text-purple-900">
      {/* Sticky Header with navigation & role simulator */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        role={role}
        setRole={setRole}
        currentUser={currentUser}
        unreadCount={unreadMessagesCount}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <ViewHome
            activities={activities}
            onSelectActivity={handleSelectActivity}
            onNavigate={setCurrentTab}
            isGuest={isGuest}
          />
        )}

        {currentTab === 'activities' && (
          <ViewActivities
            activities={activities}
            onSelectActivity={handleSelectActivity}
          />
        )}

        {currentTab === 'activity-detail' && selectedActivity && (
          <ViewActivityDetail
            activity={selectedActivity}
            onBack={() => setCurrentTab('activities')}
            currentUser={currentUser}
            isGuest={isGuest}
            onToggleRegister={handleToggleRegister}
            onNavigate={setCurrentTab}
          />
        )}

        {currentTab === 'dashboard' && (
          role === 'admin' ? (
            <ViewDashboardAdmin
              activities={activities}
              ideas={ideas}
              unreadMessagesCount={unreadMessagesCount}
              onSelectActivity={handleSelectActivity}
              onNavigate={setCurrentTab}
            />
          ) : (
            <ViewDashboardStudent
              currentUser={currentUser}
              activities={activities}
              ideas={ideas}
              onSelectActivity={handleSelectActivity}
              onNavigate={setCurrentTab}
            />
          )
        )}

        {currentTab === 'admin-activities' && (
          <ViewAdminActivities
            activities={activities}
            onSelectActivity={handleSelectActivity}
            onCreateActivity={handleCreateActivity}
            onUpdateStatus={handleUpdateStatus}
          />
        )}

        {currentTab === 'ideas' && (
          <ViewIdeas
            ideas={ideas}
            currentUser={currentUser}
            isAdmin={role === 'admin'}
            onAddIdea={handleAddIdea}
            onModerateIdea={handleModerateIdea}
          />
        )}

        {currentTab === 'messages' && (
          <ViewMessages
            conversations={conversations}
            onSendMessage={handleSendMessage}
            onCreateConversation={handleCreateConversation}
          />
        )}

        {(currentTab === 'login' || currentTab === 'register') && (
          <ViewAuth
            initialMode={currentTab as 'login' | 'register'}
            onSuccess={(newRole) => {
              setRole(newRole);
              setCurrentTab('dashboard');
            }}
            onNavigateHome={() => setCurrentTab('home')}
          />
        )}

        {currentTab === 'profile' && (
          <ViewProfile
            currentUser={currentUser}
            isAdmin={role === 'admin'}
          />
        )}

        {currentTab === 'inspector' && (
          <ViewCodeInspector />
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={setCurrentTab} />
    </div>
  );
}
