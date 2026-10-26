export type UserRole = 'student' | 'admin' | 'guest';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  promo?: string;
  campus?: string;
}

export type ActivityType = 'hackathon' | 'workshop' | 'tournament' | 'meetup';
export type ActivityStatus = 'published' | 'draft' | 'closed';

export interface Activity {
  id: string;
  title: string;
  type: ActivityType;
  typeLabel: string;
  category: string;
  description: string;
  location: string;
  startsAt: string;
  endsAt: string;
  registrationDeadline: string;
  capacity: number;
  registeredCount: number;
  status: ActivityStatus;
  usesTeams: boolean;
  minTeamSize?: number;
  maxTeamSize?: number;
  isRegistered?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'leader' | 'member';
}

export interface Team {
  id: string;
  activityId: string;
  name: string;
  joinCode: string;
  members: TeamMember[];
  isRegistered: boolean;
}

export type IdeaStatus = 'pending' | 'accepted' | 'rejected';

export interface Idea {
  id: string;
  title: string;
  category: string;
  description: string;
  authorName: string;
  createdAt: string;
  status: IdeaStatus;
  adminFeedback?: string;
}

export interface MessageItem {
  id: string;
  senderName: string;
  senderRole: 'student' | 'admin';
  body: string;
  timestamp: string;
  isMine: boolean;
}

export interface Conversation {
  id: string;
  subject: string;
  status: 'open' | 'closed';
  lastMessageAt: string;
  unreadCount: number;
  messages: MessageItem[];
}
