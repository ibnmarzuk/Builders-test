import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Assignment, Announcement, Submission, Participant, DashboardAnalytics } from '../types';
import { useToast } from '../components/common/Toast';
import { Modal } from '../components/common/Modal';
import { StatCard } from '../components/common/StatCard';
import { EmptyStateGraphic } from '../components/common/Graphics';
import {
  ShieldAlert,
  Users,
  CheckSquare,
  Megaphone,
  FileCode2,
  Plus,
  Trash2,
  Edit3,
  Check,
  X,
  Send,
  Globe,
  BarChart3,
  ExternalLink,
  Github,
  Award,
  Search,
  Pin
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'analytics' | 'assignments' | 'announcements' | 'submissions' | 'participants'>('analytics');
  const [analytics, setAnalytics] = useState<DashboardAnalytics | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');

  // Modals
  const [asgModalOpen, setAsgModalOpen] = useState(false);
  const [editingAsg, setEditingAsg] = useState<Assignment | null>(null);

  const [ancModalOpen, setAncModalOpen] = useState(false);
  const [editingAnc, setEditingAnc] = useState<Announcement | null>(null);

  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedSub, setSelectedSub] = useState<Submission | null>(null);

  const [partModalOpen, setPartModalOpen] = useState(false);
  const [editingPart, setEditingPart] = useState<Participant | null>(null);

  // Form States
  const [asgForm, setAsgForm] = useState({
    title: '',
    description: '',
    dayNumber: 1,
    dueDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    difficulty: 'Medium' as 'Easy' | 'Medium' | 'Hard',
    status: 'Active' as 'Active' | 'Draft' | 'Completed',
    points: 100,
    resources: ''
  });

  const [ancForm, setAncForm] = useState({
    title: '',
    content: '',
    category: 'General' as 'General' | 'Assignment' | 'Event' | 'Urgent' | 'Resource',
    isPinned: false
  });

  const [reviewForm, setReviewForm] = useState({
    status: 'Approved' as 'Approved' | 'Rejected',
    feedback: '',
    pointsAwarded: 100
  });

  const [partForm, setPartForm] = useState({
    name: '',
    email: '',
    telegramUsername: '',
    country: '',
    cohort: 'Cohort 5',
    progress: 0,
    totalPoints: 0
  });

  const fetchAllAdminData = async () => {
    setLoading(true);
    try {
      const [analyticsData, asgData, ancData, subData, partData] = await Promise.all([
        api.getAnalytics(),
        api.getAssignments(),
        api.getAnnouncements(),
        api.getSubmissions(),
        api.getParticipants()
      ]);
      setAnalytics(analyticsData);
      setAssignments(asgData);
      setAnnouncements(ancData);
      setSubmissions(subData);
      setParticipants(partData);
    } catch (err: any) {
      showToast('Error loading admin control panel data', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllAdminData();
  }, []);

  // --- ASSIGNMENT CRUD ---
  const handleOpenAsgModal = (asg?: Assignment) => {
    if (asg) {
      setEditingAsg(asg);
      setAsgForm({
        title: asg.title,
        description: asg.description,
        dayNumber: asg.dayNumber,
        dueDate: asg.dueDate ? new Date(asg.dueDate).toISOString().split('T')[0] : '',
        difficulty: asg.difficulty,
        status: asg.status,
        points: asg.points || 100,
        resources: Array.isArray(asg.resources) ? asg.resources.join(', ') : ''
      });
    } else {
      setEditingAsg(null);
      setAsgForm({
        title: '',
        description: '',
        dayNumber: assignments.length + 1,
        dueDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
        difficulty: 'Medium',
        status: 'Active',
        points: 100,
        resources: ''
      });
    }
    setAsgModalOpen(true);
  };

  const handleSaveAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...asgForm,
        resources: asgForm.resources ? asgForm.resources.split(',').map(s => s.trim()) : []
      };

      if (editingAsg) {
        await api.updateAssignment(editingAsg._id, payload);
        showToast('Assignment updated successfully!', 'success');
      } else {
        await api.createAssignment(payload);
        showToast('New assignment published to cohort!', 'success');
      }
      setAsgModalOpen(false);
      fetchAllAdminData();
    } catch (err: any) {
      showToast(err.message || 'Error saving assignment', 'error');
    }
  };

  const handleDeleteAssignment = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this assignment?')) return;
    try {
      await api.deleteAssignment(id);
      showToast('Assignment deleted.', 'info');
      fetchAllAdminData();
    } catch (err: any) {
      showToast('Error deleting assignment', 'error');
    }
  };

  // --- ANNOUNCEMENT CRUD ---
  const handleOpenAncModal = (anc?: Announcement) => {
    if (anc) {
      setEditingAnc(anc);
      setAncForm({
        title: anc.title,
        content: anc.content,
        category: anc.category,
        isPinned: anc.isPinned || false
      });
    } else {
      setEditingAnc(null);
      setAncForm({
        title: '',
        content: '',
        category: 'General',
        isPinned: false
      });
    }
    setAncModalOpen(true);
  };

  const handleSaveAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingAnc) {
        await api.updateAnnouncement(editingAnc._id, ancForm);
        showToast('Announcement updated!', 'success');
      } else {
        await api.createAnnouncement(ancForm);
        showToast('Announcement broadcasted to cohort!', 'success');
      }
      setAncModalOpen(false);
      fetchAllAdminData();
    } catch (err: any) {
      showToast('Error saving announcement', 'error');
    }
  };

  const handleDeleteAnnouncement = async (id: string) => {
    if (!window.confirm('Delete this announcement?')) return;
    try {
      await api.deleteAnnouncement(id);
      showToast('Announcement removed.', 'info');
      fetchAllAdminData();
    } catch (err: any) {
      showToast('Error deleting announcement', 'error');
    }
  };

  // --- SUBMISSION REVIEWS ---
  const handleOpenReviewModal = (sub: Submission) => {
    setSelectedSub(sub);
    setReviewForm({
      status: 'Approved',
      feedback: 'Great execution! Clean React components and robust API setup.',
      pointsAwarded: 100
    });
    setReviewModalOpen(true);
  };

  const handleSaveReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSub) return;
    try {
      await api.updateSubmission(selectedSub._id, reviewForm);
      showToast(`Submission marked as ${reviewForm.status}!`, 'success');
      setReviewModalOpen(false);
      fetchAllAdminData();
    } catch (err: any) {
      showToast('Error updating review', 'error');
    }
  };

  // --- PARTICIPANTS CRUD ---
  const handleOpenPartModal = (part?: Participant) => {
    if (part) {
      setEditingPart(part);
      setPartForm({
        name: part.name,
        email: part.email,
        telegramUsername: part.telegramUsername,
        country: part.country,
        cohort: part.cohort,
        progress: part.progress,
        totalPoints: part.totalPoints
      });
    } else {
      setEditingPart(null);
      setPartForm({
        name: '',
        email: '',
        telegramUsername: '@username',
        country: 'Nigeria',
        cohort: 'Cohort 5',
        progress: 0,
        totalPoints: 0
      });
    }
    setPartModalOpen(true);
  };

  const handleSaveParticipant = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPart) {
        await api.updateParticipant(editingPart._id, partForm);
        showToast('Participant updated!', 'success');
      } else {
        await api.createParticipant(partForm);
        showToast('New participant added to cohort!', 'success');
      }
      setPartModalOpen(false);
      fetchAllAdminData();
    } catch (err: any) {
      showToast('Error saving participant', 'error');
    }
  };

  const handleDeleteParticipant = async (id: string) => {
    if (!window.confirm('Remove this participant from cohort?')) return;
    try {
      await api.deleteParticipant(id);
      showToast('Participant removed.', 'info');
      fetchAllAdminData();
    } catch (err: any) {
      showToast('Error deleting participant', 'error');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mb-4" />
        <p className="text-sm font-semibold text-slate-400">Loading Admin Control Tower...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-[6px] bg-[#111111] border border-[#2A2A2A] shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151515] text-[#C8A86B] text-xs font-semibold border border-[#2A2A2A]">
            <ShieldAlert className="w-3.5 h-3.5" /> Organizers & Mentor Suite
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#F5F2EE]">Admin Command Center</h1>
          <p className="text-xs sm:text-sm text-[#A3A3A3] font-sans">
            Full management permissions over assignments, announcements, project reviews, and participants.
          </p>
        </div>

        <div className="flex items-center gap-2 font-sans">
          <button
            onClick={() => handleOpenAsgModal()}
            className="px-4 py-2.5 rounded-full bg-[#F5F2EE] hover:bg-white text-[#090909] text-xs font-medium shadow-sm transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> New Assignment
          </button>
          <button
            onClick={() => handleOpenAncModal()}
            className="px-4 py-2.5 rounded-full bg-[#151515] border border-[#2A2A2A] hover:border-[#C8A86B] text-[#F5F2EE] text-xs font-medium transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4 text-[#C8A86B]" /> Post Announcement
          </button>
        </div>
      </div>

      {/* Main Command Center Body with Admin Sidebar Navigation */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Sub-Sidebar for Admin Navigation */}
        <aside className="w-full lg:w-64 shrink-0 space-y-4 sticky top-20">
          {/* Mobile Horizontal Pill Switcher */}
          <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
            {[
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
              { id: 'assignments', label: `Assignments (${assignments.length})`, icon: CheckSquare },
              { id: 'announcements', label: `Announcements (${announcements.length})`, icon: Megaphone },
              { id: 'submissions', label: `Reviews (${submissions.filter(s => s.status === 'Pending').length})`, icon: FileCode2, alert: submissions.filter(s => s.status === 'Pending').length > 0 },
              { id: 'participants', label: `Participants (${participants.length})`, icon: Users },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Desktop Vertical Admin Sidebar */}
          <div className="hidden lg:block p-4 rounded-[6px] bg-[#111111] border border-[#2A2A2A] space-y-4 shadow-xl font-sans">
            <div className="px-2 text-[10px] font-semibold uppercase tracking-wider text-[#A3A3A3] flex items-center justify-between">
              <span>Command Panels</span>
              <span className="w-2 h-2 rounded-full bg-[#C8A86B] animate-pulse" title="System Live" />
            </div>

            <nav className="space-y-1.5">
              {[
                {
                  id: 'analytics',
                  label: 'Analytics & Overview',
                  icon: BarChart3,
                  badge: 'Live',
                  badgeColor: 'bg-[#151515] text-[#C8A86B] border-[#2A2A2A]'
                },
                {
                  id: 'assignments',
                  label: 'Curriculum & Tasks',
                  icon: CheckSquare,
                  count: assignments.length,
                  badgeColor: 'bg-[#151515] text-[#A3A3A3] border-[#2A2A2A]'
                },
                {
                  id: 'announcements',
                  label: 'Announcements Feed',
                  icon: Megaphone,
                  count: announcements.length,
                  badgeColor: 'bg-[#151515] text-[#A3A3A3] border-[#2A2A2A]'
                },
                {
                  id: 'submissions',
                  label: 'Project Review Queue',
                  icon: FileCode2,
                  count: `${submissions.filter(s => s.status === 'Pending').length} Pending`,
                  badgeColor: submissions.filter(s => s.status === 'Pending').length > 0
                    ? 'bg-[#151515] text-[#C8A86B] border-[#2A2A2A] animate-pulse'
                    : 'bg-[#151515] text-[#A3A3A3] border-[#2A2A2A]'
                },
                {
                  id: 'participants',
                  label: 'Builders Directory',
                  icon: Users,
                  count: participants.length,
                  badgeColor: 'bg-[#151515] text-[#A3A3A3] border-[#2A2A2A]'
                },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center justify-between p-3 rounded-[6px] text-xs font-medium transition-all text-left ${
                      isActive
                        ? 'bg-[#F5F2EE] text-[#090909] shadow-sm'
                        : 'text-[#A3A3A3] hover:text-[#F5F2EE] hover:bg-[#151515]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#090909]' : 'text-[#A3A3A3]'}`} />
                      <span className="truncate">{tab.label}</span>
                    </div>

                    {(tab.count !== undefined || tab.badge) && (
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border shrink-0 ${tab.badgeColor}`}>
                        {tab.badge || tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Quick Admin Actions Box */}
            <div className="pt-3 border-t border-[#2A2A2A] space-y-2">
              <div className="px-2 text-[10px] font-semibold uppercase tracking-wider text-[#A3A3A3]">
                Quick Shortcuts
              </div>

              <div className="space-y-1.5">
                <button
                  onClick={() => handleOpenAsgModal()}
                  className="w-full text-left px-3 py-2 rounded-[6px] text-[11px] font-medium text-[#A3A3A3] hover:text-[#F5F2EE] hover:bg-[#151515] transition-colors flex items-center justify-between"
                >
                  <span>+ Create Assignment</span>
                  <Plus className="w-3.5 h-3.5 text-[#C8A86B]" />
                </button>
                <button
                  onClick={() => handleOpenAncModal()}
                  className="w-full text-left px-3 py-2 rounded-[6px] text-[11px] font-medium text-[#A3A3A3] hover:text-[#F5F2EE] hover:bg-[#151515] transition-colors flex items-center justify-between"
                >
                  <span>+ Post Announcement</span>
                  <Plus className="w-3.5 h-3.5 text-[#C8A86B]" />
                </button>
                <button
                  onClick={() => handleOpenPartModal()}
                  className="w-full text-left px-3 py-2 rounded-[6px] text-[11px] font-medium text-[#A3A3A3] hover:text-[#F5F2EE] hover:bg-[#151515] transition-colors flex items-center justify-between"
                >
                  <span>+ Enroll Builder</span>
                  <Plus className="w-3.5 h-3.5 text-emerald-400" />
                </button>
              </div>
            </div>

            {/* Active Cohort Health Indicator */}
            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-1">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Cohort 5 Status</div>
              <div className="text-xs font-extrabold text-emerald-400 flex items-center justify-center gap-1">
                <Check className="w-3.5 h-3.5" /> 100% Operational
              </div>
              <p className="text-[10px] text-slate-500">Active evaluation queue: {submissions.filter(s => s.status === 'Pending').length} pending</p>
            </div>
          </div>
        </aside>

        {/* Right Main Content Area */}
        <div className="flex-1 min-w-0 w-full space-y-6">

      {/* TAB 1: ANALYTICS OVERVIEW */}
      {activeTab === 'analytics' && (
        <div className="space-y-8 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Enrolled Builders"
              value={analytics?.totalParticipants || participants.length}
              subtitle="Across 32 countries"
              icon={Users}
              color="indigo"
            />
            <StatCard
              title="Active Assignments"
              value={analytics?.activeAssignments || assignments.filter(a => a.status === 'Active').length}
              subtitle="Cohort 5 curriculum"
              icon={CheckSquare}
              color="emerald"
            />
            <StatCard
              title="Pending Reviews"
              value={analytics?.pendingSubmissions || submissions.filter(s => s.status === 'Pending').length}
              subtitle="Awaiting mentor feedback"
              icon={FileCode2}
              color="amber"
            />
            <StatCard
              title="Average Progress Rate"
              value={`${analytics?.averageProgress || 86}%`}
              subtitle="Completion metric"
              icon={BarChart3}
              color="cyan"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 font-sans">
            <div className="p-6 rounded-[6px] bg-[#111111] border border-[#2A2A2A] space-y-4">
              <h3 className="text-base font-serif font-bold text-[#F5F2EE] flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#C8A86B]" /> Cohort Country Distribution
              </h3>
              <div className="space-y-3">
                {analytics?.cohortDistribution?.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="text-[#F5F2EE]">{item.country}</span>
                      <span className="text-[#A3A3A3]">{item.count} Builders</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#151515] overflow-hidden">
                      <div
                        className="h-full bg-[#C8A86B] rounded-full"
                        style={{ width: `${Math.min(100, (item.count / (analytics?.totalParticipants || 1)) * 100 * 2.5)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-[6px] bg-[#111111] border border-[#2A2A2A] space-y-4">
              <h3 className="text-base font-serif font-bold text-[#F5F2EE] flex items-center gap-2">
                <Award className="w-5 h-5 text-[#C8A86B]" /> Top Performing Builders
              </h3>
              <div className="space-y-3">
                {participants.slice(0, 5).map((part, idx) => (
                  <div key={part._id} className="p-3 rounded-[6px] bg-[#151515] border border-[#2A2A2A] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-[#C8A86B] w-5">#{idx + 1}</span>
                      <img src={part.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'} alt={part.name} className="w-8 h-8 rounded-full border border-[#2A2A2A]" />
                      <div>
                        <div className="text-xs font-semibold text-[#F5F2EE]">{part.name}</div>
                        <div className="text-[10px] text-[#A3A3A3]">{part.country} • {part.telegramUsername}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-[#C8A86B]">{part.totalPoints} pts</div>
                      <div className="text-[10px] text-[#A3A3A3]">{part.completedAssignments} completed</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ASSIGNMENTS CRUD TABLE */}
      {activeTab === 'assignments' && (
        <div className="space-y-4 animate-fade-in font-sans">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-serif font-bold text-[#F5F2EE]">Cohort Curriculum & Assignments</h3>
            <button
              onClick={() => handleOpenAsgModal()}
              className="px-4 py-2 rounded-full bg-[#F5F2EE] hover:bg-white text-[#090909] text-xs font-medium shadow-sm transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Create Assignment
            </button>
          </div>

          <div className="rounded-[6px] bg-[#111111] border border-[#2A2A2A] overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#F5F2EE]">
                <thead className="bg-[#151515] border-b border-[#2A2A2A] uppercase tracking-wider text-[10px] font-semibold text-[#A3A3A3]">
                  <tr>
                    <th className="p-4">Day</th>
                    <th className="p-4">Title</th>
                    <th className="p-4">Difficulty</th>
                    <th className="p-4">Due Date</th>
                    <th className="p-4">Points</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {assignments.map((asg) => (
                    <tr key={asg._id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-4 font-bold text-indigo-400">Day {asg.dayNumber}</td>
                      <td className="p-4">
                        <div className="font-bold text-white text-sm">{asg.title}</div>
                        <div className="text-[11px] text-slate-400 line-clamp-1">{asg.description}</div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-0.5 rounded-full font-bold border ${
                          asg.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                          asg.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                          'bg-rose-500/10 text-rose-400 border-rose-500/20'
                        }`}>
                          {asg.difficulty}
                        </span>
                      </td>
                      <td className="p-4 text-slate-300">{new Date(asg.dueDate).toLocaleDateString()}</td>
                      <td className="p-4 font-bold text-emerald-400">{asg.points} pts</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          asg.status === 'Active' ? 'bg-indigo-500/20 text-indigo-300' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {asg.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenAsgModal(asg)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:text-indigo-400 text-slate-400 transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteAssignment(asg._id)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:text-rose-400 text-slate-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ANNOUNCEMENTS CRUD */}
      {activeTab === 'announcements' && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Community Announcements</h3>
            <button
              onClick={() => handleOpenAncModal()}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Post Announcement
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {announcements.map((anc) => (
              <div key={anc._id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      {anc.category}
                    </span>
                    {anc.isPinned && (
                      <span className="text-[10px] font-bold text-amber-400 flex items-center gap-1">
                        <Pin className="w-3 h-3 fill-amber-400" /> Pinned
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleOpenAncModal(anc)} className="text-slate-400 hover:text-indigo-400 p-1">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDeleteAnnouncement(anc._id)} className="text-slate-400 hover:text-rose-400 p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h4 className="text-base font-bold text-white">{anc.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{anc.content}</p>

                <div className="text-[10px] text-slate-500 pt-2 border-t border-slate-800">
                  Posted by {anc.authorName} on {new Date(anc.date).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SUBMISSION REVIEW QUEUE */}
      {activeTab === 'submissions' && (
        <div className="space-y-4 animate-fade-in">
          <h3 className="text-lg font-bold text-white">Project Review Queue</h3>

          <div className="space-y-4">
            {submissions.map((sub) => (
              <div key={sub._id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-3">
                    <img src={sub.submittedBy?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'} alt={sub.submittedBy?.name} className="w-10 h-10 rounded-full border border-indigo-500/20 object-cover" />
                    <div>
                      <div className="font-bold text-white text-sm">{sub.projectName}</div>
                      <div className="text-xs text-slate-400">By {sub.submittedBy?.name} ({sub.submittedBy?.country}) • {sub.assignmentTitle}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                      sub.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      sub.status === 'Rejected' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                      'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {sub.status}
                    </span>

                    <button
                      onClick={() => handleOpenReviewModal(sub)}
                      className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-all"
                    >
                      Review & Grade
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{sub.description}</p>

                <div className="flex items-center gap-4 text-xs">
                  <a href={sub.githubRepo} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-indigo-400 hover:underline">
                    <Github className="w-4 h-4" /> Repository
                  </a>
                  <a href={sub.liveDemo} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-cyan-400 hover:underline">
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: PARTICIPANTS MANAGEMENT */}
      {activeTab === 'participants' && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Cohort Participants Directory</h3>
            <button
              onClick={() => handleOpenPartModal()}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add Participant
            </button>
          </div>

          <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 border-b border-slate-800 uppercase tracking-wider text-[10px] font-extrabold text-slate-400">
                  <tr>
                    <th className="p-4">Participant</th>
                    <th className="p-4">Telegram</th>
                    <th className="p-4">Country</th>
                    <th className="p-4">Cohort</th>
                    <th className="p-4">Progress</th>
                    <th className="p-4">Points</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {participants.map((p) => (
                    <tr key={p._id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img src={p.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'} alt={p.name} className="w-8 h-8 rounded-full border border-indigo-500/20 object-cover" />
                          <div>
                            <div className="font-bold text-white text-xs">{p.name}</div>
                            <div className="text-[10px] text-slate-400">{p.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-mono text-indigo-400">{p.telegramUsername}</td>
                      <td className="p-4 text-slate-300">{p.country}</td>
                      <td className="p-4 text-slate-400">{p.cohort}</td>
                      <td className="p-4">
                        <div className="w-24 h-2 rounded-full bg-slate-950 overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${p.progress}%` }} />
                        </div>
                        <span className="text-[10px] text-slate-400">{p.progress}%</span>
                      </td>
                      <td className="p-4 font-bold text-emerald-400">{p.totalPoints} pts</td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => handleOpenPartModal(p)} className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-indigo-400">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDeleteParticipant(p._id)} className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-rose-400">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

        </div>
      </div>

      {/* MODAL: ASSIGNMENT EDITOR */}
      <Modal isOpen={asgModalOpen} onClose={() => setAsgModalOpen(false)} title={editingAsg ? 'Edit Assignment' : 'Create New Assignment'}>
        <form onSubmit={handleSaveAssignment} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Day Number *</label>
              <input type="number" required value={asgForm.dayNumber} onChange={(e) => setAsgForm({ ...asgForm, dayNumber: Number(e.target.value) })} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Difficulty *</label>
              <select value={asgForm.difficulty} onChange={(e) => setAsgForm({ ...asgForm, difficulty: e.target.value as any })} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm">
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Title *</label>
            <input type="text" required value={asgForm.title} onChange={(e) => setAsgForm({ ...asgForm, title: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm" />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Description *</label>
            <textarea required rows={3} value={asgForm.description} onChange={(e) => setAsgForm({ ...asgForm, description: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Due Date *</label>
              <input type="date" required value={asgForm.dueDate} onChange={(e) => setAsgForm({ ...asgForm, dueDate: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Points Reward</label>
              <input type="number" value={asgForm.points} onChange={(e) => setAsgForm({ ...asgForm, points: Number(e.target.value) })} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Resources (Comma-separated URLs)</label>
            <input type="text" value={asgForm.resources} onChange={(e) => setAsgForm({ ...asgForm, resources: e.target.value })} placeholder="https://react.dev, https://expressjs.com" className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm" />
          </div>

          <div className="pt-3 flex justify-end gap-3">
            <button type="button" onClick={() => setAsgModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold">Cancel</button>
            <button type="submit" className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold">Save Assignment</button>
          </div>
        </form>
      </Modal>

      {/* MODAL: ANNOUNCEMENT EDITOR */}
      <Modal isOpen={ancModalOpen} onClose={() => setAncModalOpen(false)} title={editingAnc ? 'Edit Announcement' : 'Post Announcement'}>
        <form onSubmit={handleSaveAnnouncement} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Category</label>
            <select value={ancForm.category} onChange={(e) => setAncForm({ ...ancForm, category: e.target.value as any })} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm">
              <option value="General">General</option>
              <option value="Assignment">Assignment</option>
              <option value="Event">Event</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Title *</label>
            <input type="text" required value={ancForm.title} onChange={(e) => setAncForm({ ...ancForm, title: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm" />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Content *</label>
            <textarea required rows={4} value={ancForm.content} onChange={(e) => setAncForm({ ...ancForm, content: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm" />
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="pinned" checked={ancForm.isPinned} onChange={(e) => setAncForm({ ...ancForm, isPinned: e.target.checked })} className="rounded bg-slate-950 border-slate-800" />
            <label htmlFor="pinned" className="text-xs text-slate-300">Pin to top of cohort feed</label>
          </div>

          <div className="pt-3 flex justify-end gap-3">
            <button type="button" onClick={() => setAncModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold">Cancel</button>
            <button type="submit" className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold">Broadcast</button>
          </div>
        </form>
      </Modal>

      {/* MODAL: SUBMISSION REVIEW */}
      <Modal isOpen={reviewModalOpen} onClose={() => setReviewModalOpen(false)} title="Review Builder Submission">
        <form onSubmit={handleSaveReview} className="space-y-4">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
            <div className="font-bold text-white">{selectedSub?.projectName}</div>
            <div className="text-slate-400">By {selectedSub?.submittedBy?.name}</div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Review Status</label>
            <select value={reviewForm.status} onChange={(e) => setReviewForm({ ...reviewForm, status: e.target.value as any })} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm">
              <option value="Approved">Approve Submission</option>
              <option value="Rejected">Reject / Request Changes</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Award Points</label>
            <input type="number" value={reviewForm.pointsAwarded} onChange={(e) => setReviewForm({ ...reviewForm, pointsAwarded: Number(e.target.value) })} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm" />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Mentor Feedback</label>
            <textarea rows={3} value={reviewForm.feedback} onChange={(e) => setReviewForm({ ...reviewForm, feedback: e.target.value })} placeholder="Provide constructive code feedback..." className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm" />
          </div>

          <div className="pt-3 flex justify-end gap-3">
            <button type="button" onClick={() => setReviewModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold">Cancel</button>
            <button type="submit" className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold">Save Grade</button>
          </div>
        </form>
      </Modal>

      {/* MODAL: PARTICIPANT EDITOR */}
      <Modal isOpen={partModalOpen} onClose={() => setPartModalOpen(false)} title={editingPart ? 'Edit Participant' : 'Add Participant'}>
        <form onSubmit={handleSaveParticipant} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Full Name *</label>
            <input type="text" required value={partForm.name} onChange={(e) => setPartForm({ ...partForm, name: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm" />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Email *</label>
            <input type="email" required value={partForm.email} onChange={(e) => setPartForm({ ...partForm, email: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Telegram Handle *</label>
              <input type="text" required value={partForm.telegramUsername} onChange={(e) => setPartForm({ ...partForm, telegramUsername: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Country *</label>
              <input type="text" required value={partForm.country} onChange={(e) => setPartForm({ ...partForm, country: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm" />
            </div>
          </div>

          <div className="pt-3 flex justify-end gap-3">
            <button type="button" onClick={() => setPartModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold">Cancel</button>
            <button type="submit" className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold">Save Participant</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
