import axios from 'axios';
import { User, Assignment, Announcement, Submission, Participant, DashboardAnalytics, AuthResponse } from '../types';

const API = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('bb_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const api = {
  // Auth
  register: (data: any) => API.post<AuthResponse>('/auth/register', data).then(res => res.data),
  login: (data: any) => API.post<AuthResponse>('/auth/login', data).then(res => res.data),
  getMe: () => API.get<{ user: User }>('/auth/me').then(res => res.data),
  updateProfile: (data: Partial<User>) => API.put<{ message: string; user: User }>('/auth/profile', data).then(res => res.data),

  // Assignments
  getAssignments: () => API.get<Assignment[]>('/assignments').then(res => res.data),
  createAssignment: (data: Partial<Assignment>) => API.post<Assignment>('/assignments', data).then(res => res.data),
  updateAssignment: (id: string, data: Partial<Assignment>) => API.put<Assignment>(`/assignments/${id}`, data).then(res => res.data),
  deleteAssignment: (id: string) => API.delete<{ message: string }>(`/assignments/${id}`).then(res => res.data),

  // Announcements
  getAnnouncements: () => API.get<Announcement[]>('/announcements').then(res => res.data),
  createAnnouncement: (data: Partial<Announcement>) => API.post<Announcement>('/announcements', data).then(res => res.data),
  updateAnnouncement: (id: string, data: Partial<Announcement>) => API.put<Announcement>(`/announcements/${id}`, data).then(res => res.data),
  deleteAnnouncement: (id: string) => API.delete<{ message: string }>(`/announcements/${id}`).then(res => res.data),

  // Submissions
  getSubmissions: (mineOnly = false) => API.get<Submission[]>(`/submissions${mineOnly ? '?mine=true' : ''}`).then(res => res.data),
  createSubmission: (data: Partial<Submission>) => API.post<Submission>('/submissions', data).then(res => res.data),
  updateSubmission: (id: string, data: Partial<Submission>) => API.put<Submission>(`/submissions/${id}`, data).then(res => res.data),
  deleteSubmission: (id: string) => API.delete<{ message: string }>(`/submissions/${id}`).then(res => res.data),

  // Participants
  getParticipants: () => API.get<Participant[]>('/participants').then(res => res.data),
  createParticipant: (data: Partial<Participant>) => API.post<Participant>('/participants', data).then(res => res.data),
  updateParticipant: (id: string, data: Partial<Participant>) => API.put<Participant>(`/participants/${id}`, data).then(res => res.data),
  deleteParticipant: (id: string) => API.delete<{ message: string }>(`/participants/${id}`).then(res => res.data),

  // Analytics
  getAnalytics: () => API.get<DashboardAnalytics>('/analytics').then(res => res.data),
};
