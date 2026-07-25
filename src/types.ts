export type Role = 'admin' | 'participant';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: Role;
  telegramUsername?: string;
  country?: string;
  cohort?: string;
  progress?: number;
  avatarUrl?: string;
  bio?: string;
  professionalLink?: string;
  createdAt?: string;
}

export interface Assignment {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  resources: string[];
  status: 'Active' | 'Draft' | 'Completed';
  dayNumber: number;
  points: number;
  createdAt?: string;
}

export interface Announcement {
  _id: string;
  title: string;
  content: string;
  date: string;
  category: 'General' | 'Assignment' | 'Event' | 'Urgent' | 'Resource';
  authorName?: string;
  isPinned?: boolean;
}

export interface Submission {
  _id: string;
  projectName: string;
  description: string;
  githubRepo: string;
  liveDemo: string;
  screenshot?: string;
  submittedBy: {
    _id: string;
    name: string;
    email: string;
    avatarUrl?: string;
    telegramUsername?: string;
    country?: string;
  };
  assignmentId?: string | { _id: string; title: string };
  assignmentTitle?: string;
  submissionDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  feedback?: string;
  pointsAwarded?: number;
}

export interface Participant {
  _id: string;
  name: string;
  email: string;
  telegramUsername: string;
  country: string;
  cohort: string;
  progress: number; // percentage 0-100
  completedAssignments: number;
  totalPoints: number;
  avatarUrl?: string;
  joinedDate?: string;
}

export interface DashboardAnalytics {
  totalParticipants: number;
  activeAssignments: number;
  totalSubmissions: number;
  pendingSubmissions: number;
  totalAnnouncements: number;
  averageProgress: number;
  countriesCount: number;
  submissionsByDay: { day: string; count: number }[];
  cohortDistribution: { country: string; count: number }[];
}

export interface AuthResponse {
  token: string;
  user: User;
  message?: string;
}
