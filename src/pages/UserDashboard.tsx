import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Assignment, Announcement, Submission, Participant } from '../types';
import { useToast } from '../components/common/Toast';
import { Modal } from '../components/common/Modal';
import { UserProfileModal } from '../components/profile/UserProfileModal';
import { StatCard } from '../components/common/StatCard';
import { EmptyStateGraphic } from '../components/common/Graphics';
import {
  Flame,
  Trophy,
  CheckSquare,
  Clock,
  ExternalLink,
  Github,
  Send,
  Sparkles,
  User as UserIcon,
  Megaphone,
  Plus,
  AlertCircle,
  FileCode2,
  Calendar,
  ChevronRight,
  Globe,
  Award
} from 'lucide-react';

export const UserDashboard: React.FC<{ setActiveTab: (tab: string) => void }> = ({ setActiveTab }) => {
  const { user, updateUserInState } = useAuth();
  const { showToast } = useToast();

  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal States
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  // Submission Form State
  const [subForm, setSubForm] = useState({
    projectName: '',
    description: '',
    githubRepo: '',
    liveDemo: '',
    screenshot: ''
  });
  const [submitting, setSubmitting] = useState(false);

  // Profile Form State
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    telegramUsername: user?.telegramUsername || '',
    country: user?.country || '',
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [asgData, ancData, subData, partData] = await Promise.all([
        api.getAssignments(),
        api.getAnnouncements(),
        api.getSubmissions(true),
        api.getParticipants()
      ]);
      setAssignments(asgData);
      setAnnouncements(ancData);
      setSubmissions(subData);
      setParticipants(partData);
    } catch (err: any) {
      showToast('Error loading dashboard data', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const todayAssignment = assignments.find(a => a.status === 'Active') || assignments[0];

  const handleOpenSubmitModal = (asg: Assignment) => {
    setSelectedAssignment(asg);
    setSubForm({
      projectName: `${asg.title} Solution`,
      description: '',
      githubRepo: 'https://github.com/myusername/my-project',
      liveDemo: 'https://my-app.run.app',
      screenshot: ''
    });
    setSubmitModalOpen(true);
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subForm.projectName || !subForm.description || !subForm.githubRepo || !subForm.liveDemo) {
      showToast('Please fill in all required project fields.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      await api.createSubmission({
        ...subForm,
        assignmentId: selectedAssignment?._id,
        assignmentTitle: selectedAssignment?.title
      });
      showToast('Project submitted successfully! Pending mentor review.', 'success');
      setSubmitModalOpen(false);
      fetchData();
    } catch (err: any) {
      showToast(err.message || 'Error submitting project.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (user?._id) {
        updateUserInState(profileForm);
        showToast('Profile updated successfully!', 'success');
        setProfileModalOpen(false);
      }
    } catch (err: any) {
      showToast('Error updating profile', 'error');
    }
  };

  const myUserParticipant = participants.find(p => p.email === user?.email);
  const myRank = participants.findIndex(p => p.email === user?.email) + 1;

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mb-4" />
        <p className="text-sm font-semibold text-slate-400">Loading Builders Build Hub Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Banner & Profile Card */}
      <div className="p-6 sm:p-8 rounded-[6px] bg-[#111111] border border-[#2A2A2A] shadow-xl space-y-5 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 z-10 relative">
          <div className="flex items-start gap-4">
            <img
              src={
                user?.avatarUrl ||
                'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
              }
              alt={user?.name}
              className="w-14 h-14 rounded-full border-2 border-[#C8A86B] object-cover shrink-0 shadow-sm"
            />
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#151515] text-[#C8A86B] border border-[#2A2A2A] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#C8A86B]" /> Builder Dashboard
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#F5F2EE]">
                Welcome Back, {user?.name || 'Builder'}!
              </h1>
              <p className="text-xs text-[#A3A3A3] font-sans">
                Cohort 5 • Day {todayAssignment?.dayNumber || 1} Active • {user?.country || 'Global'}
                {user?.telegramUsername ? ` • ${user.telegramUsername}` : ''}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 font-sans shrink-0">
            <button
              onClick={() => setProfileModalOpen(true)}
              className="px-4 py-2.5 rounded-full bg-[#151515] border border-[#2A2A2A] hover:border-[#C8A86B] text-[#F5F2EE] text-xs font-medium transition-all flex items-center gap-2"
            >
              <UserIcon className="w-4 h-4 text-[#C8A86B]" /> Edit Bio & Link
            </button>
            {todayAssignment && (
              <button
                onClick={() => handleOpenSubmitModal(todayAssignment)}
                className="px-5 py-2.5 rounded-full bg-[#F5F2EE] hover:bg-white text-[#090909] text-xs font-medium shadow-sm transition-all flex items-center gap-2"
              >
                <Send className="w-4 h-4" /> Submit Today's Project
              </button>
            )}
          </div>
        </div>

        {/* Bio & Professional Link Row */}
        {(user?.bio || user?.professionalLink) && (
          <div className="pt-4 border-t border-[#2A2A2A] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-sans">
            {user.bio ? (
              <p className="text-[#A3A3A3] italic max-w-2xl leading-relaxed">
                "{user.bio}"
              </p>
            ) : <div />}
            {user.professionalLink && (
              <a
                href={user.professionalLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[6px] bg-[#151515] border border-[#2A2A2A] text-[#C8A86B] hover:text-[#F5F2EE] hover:border-[#C8A86B] transition-colors shrink-0"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Professional Portfolio</span>
              </a>
            )}
          </div>
        )}
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Current Streak"
          value="5 Days"
          subtitle="Assignments submitted on time"
          icon={Flame}
          color="amber"
          trend="Top 10%"
        />
        <StatCard
          title="Completed Projects"
          value={submissions.filter(s => s.status === 'Approved').length}
          subtitle={`Out of ${assignments.length} assignments`}
          icon={CheckSquare}
          color="emerald"
        />
        <StatCard
          title="Cohort Rank"
          value={myRank > 0 ? `#${myRank}` : '#4'}
          subtitle={`Of ${participants.length} global builders`}
          icon={Trophy}
          color="indigo"
        />
        <StatCard
          title="Earned Points"
          value={myUserParticipant?.totalPoints || 350}
          subtitle="Mentor score rewards"
          icon={Award}
          color="cyan"
        />
      </div>

      {/* Main Grid: Today's Assignment & Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Today's Assignment & Submissions */}
        <div className="lg:col-span-2 space-y-8">
          {/* Today's Assignment Card */}
          {todayAssignment && (
            <div className="p-6 rounded-[6px] bg-[#111111] border border-[#2A2A2A] shadow-2xl relative overflow-hidden space-y-5">
              <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-4 font-sans">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#151515] text-[#C8A86B] border border-[#2A2A2A]">
                    Day {todayAssignment.dayNumber} Assignment
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-[#151515] text-[#A3A3A3] border border-[#2A2A2A]">
                    {todayAssignment.difficulty}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#C8A86B] font-semibold bg-[#151515] px-3 py-1 rounded border border-[#2A2A2A]">
                  <Clock className="w-3.5 h-3.5" /> Due in 18 Hours
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-serif font-bold text-[#F5F2EE]">{todayAssignment.title}</h2>
                <p className="text-sm text-[#A3A3A3] leading-relaxed font-sans">{todayAssignment.description}</p>
              </div>

              {/* Resource Links */}
              {todayAssignment.resources && todayAssignment.resources.length > 0 && (
                <div className="space-y-2 pt-2 font-sans">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#C8A86B]">Learning Resources</div>
                  <div className="flex flex-wrap gap-2">
                    {todayAssignment.resources.map((res, i) => (
                      <a
                        key={i}
                        href={res}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-[#151515] border border-[#2A2A2A] text-xs font-medium text-[#A3A3A3] hover:text-[#F5F2EE] hover:border-[#C8A86B] transition-colors"
                      >
                        <ExternalLink className="w-3 h-3 text-[#C8A86B]" />
                        Resource #{i + 1}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2 flex items-center justify-between border-t border-[#2A2A2A] font-sans">
                <div className="text-xs text-[#A3A3A3] font-semibold">
                  Reward: <span className="text-[#C8A86B]">{todayAssignment.points} Points</span>
                </div>
                <button
                  onClick={() => handleOpenSubmitModal(todayAssignment)}
                  className="px-5 py-2.5 rounded-full bg-[#F5F2EE] hover:bg-white text-[#090909] text-xs font-medium shadow-sm transition-all flex items-center gap-2"
                >
                  <Send className="w-4 h-4" /> Submit Solution
                </button>
              </div>
            </div>
          )}

          {/* Submissions Tracker */}
          <div className="p-6 rounded-[6px] bg-[#111111] border border-[#2A2A2A] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-serif font-bold text-[#F5F2EE] flex items-center gap-2">
                <FileCode2 className="w-5 h-5 text-[#C8A86B]" /> My Project Submissions
              </h3>
              <button
                onClick={() => setActiveTab('submissions')}
                className="text-xs font-semibold text-[#C8A86B] hover:underline flex items-center gap-1 font-sans"
              >
                View Community Showcase <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {submissions.length === 0 ? (
              <EmptyStateGraphic
                title="No Submissions Yet"
                subtitle="Submit your solution for Day 1 assignment to get mentor code review."
              />
            ) : (
              <div className="space-y-3 font-sans">
                {submissions.map((sub) => (
                  <div
                    key={sub._id}
                    className="p-4 rounded-[6px] bg-[#151515] border border-[#2A2A2A] hover:border-[#C8A86B]/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#F5F2EE] text-sm">{sub.projectName}</span>
                        <span
                          className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-[#111111] text-[#C8A86B] border border-[#2A2A2A]"
                        >
                          {sub.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#A3A3A3] line-clamp-1">{sub.description}</p>
                      {sub.feedback && (
                        <p className="text-xs text-[#C8A86B] italic pt-1">
                          Mentor Feedback: "{sub.feedback}"
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={sub.githubRepo}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-[6px] bg-[#111111] border border-[#2A2A2A] hover:border-[#C8A86B] text-[#A3A3A3] hover:text-[#F5F2EE] transition-colors"
                        title="GitHub Repo"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                      <a
                        href={sub.liveDemo}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-[6px] bg-[#111111] border border-[#2A2A2A] hover:border-[#C8A86B] text-[#A3A3A3] hover:text-[#C8A86B] transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Col: Announcements & Upcoming Schedule */}
        <div className="space-y-8">
          {/* Latest Announcements Feed */}
          <div className="p-6 rounded-[6px] bg-[#111111] border border-[#2A2A2A] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-serif font-bold text-[#F5F2EE] flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-[#C8A86B]" /> Announcements
              </h3>
              <button
                onClick={() => setActiveTab('announcements')}
                className="text-xs text-[#A3A3A3] hover:text-[#F5F2EE] font-sans"
              >
                All Feed
              </button>
            </div>

            <div className="space-y-3 font-sans">
              {announcements.slice(0, 3).map((anc) => (
                <div key={anc._id} className="p-3.5 rounded-[6px] bg-[#151515] border border-[#2A2A2A] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-[#111111] text-[#C8A86B] border border-[#2A2A2A]">
                      {anc.category}
                    </span>
                    <span className="text-[10px] text-[#A3A3A3]">
                      {new Date(anc.date).toLocaleDateString()}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-[#F5F2EE]">{anc.title}</h4>
                  <p className="text-xs text-[#A3A3A3] line-clamp-2">{anc.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Live Sessions Schedule */}
          <div className="p-6 rounded-[6px] bg-[#111111] border border-[#2A2A2A] space-y-4 font-sans">
            <h3 className="text-base font-serif font-bold text-[#F5F2EE] flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#C8A86B]" /> Cohort Schedule
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-[6px] bg-[#151515] border border-[#2A2A2A] flex items-center justify-between">
                <div>
                  <div className="font-semibold text-[#F5F2EE]">Live Office Hours & Debugging</div>
                  <div className="text-[#A3A3A3]">Thursday @ 16:00 UTC</div>
                </div>
                <span className="px-2 py-1 rounded bg-[#111111] text-[#C8A86B] border border-[#2A2A2A] font-medium text-[10px]">Upcoming</span>
              </div>

              <div className="p-3 rounded-[6px] bg-[#151515] border border-[#2A2A2A] flex items-center justify-between">
                <div>
                  <div className="font-semibold text-[#F5F2EE]">Guest Speaker: Shipping MVPs</div>
                  <div className="text-[#A3A3A3]">Saturday @ 18:00 UTC</div>
                </div>
                <span className="px-2 py-1 rounded bg-[#111111] text-[#A3A3A3] border border-[#2A2A2A] font-medium text-[10px]">Scheduled</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Submission Modal */}
      <Modal
        isOpen={submitModalOpen}
        onClose={() => setSubmitModalOpen(false)}
        title={`Submit Project: ${selectedAssignment?.title || 'Assignment'}`}
      >
        <form onSubmit={handleProjectSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Project Name *</label>
            <input
              type="text"
              required
              value={subForm.projectName}
              onChange={(e) => setSubForm({ ...subForm, projectName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Description *</label>
            <textarea
              required
              rows={3}
              value={subForm.description}
              onChange={(e) => setSubForm({ ...subForm, description: e.target.value })}
              placeholder="Briefly summarize your implementation, key features, and architecture."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">GitHub Repository *</label>
              <input
                type="url"
                required
                value={subForm.githubRepo}
                onChange={(e) => setSubForm({ ...subForm, githubRepo: e.target.value })}
                placeholder="https://github.com/user/repo"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Live Demo URL *</label>
              <input
                type="url"
                required
                value={subForm.liveDemo}
                onChange={(e) => setSubForm({ ...subForm, liveDemo: e.target.value })}
                placeholder="https://my-demo.run.app"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="pt-3 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setSubmitModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
            >
              {submitting ? 'Submitting...' : 'Submit Project'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Profile Edit Modal */}
      <UserProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />
    </div>
  );
};
