import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Assignment } from '../types';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/common/Toast';
import { Modal } from '../components/common/Modal';
import {
  CheckSquare,
  Search,
  Clock,
  ExternalLink,
  Send,
  Sparkles,
  BookOpen
} from 'lucide-react';

export const AssignmentsPage: React.FC<{ setActiveTab: (tab: string) => void }> = ({ setActiveTab }) => {
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('All');

  // Submit Modal
  const [selectedAsg, setSelectedAsg] = useState<Assignment | null>(null);
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [subForm, setSubForm] = useState({
    projectName: '',
    description: '',
    githubRepo: '',
    liveDemo: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.getAssignments()
      .then(setAssignments)
      .catch(() => showToast('Error loading assignments', 'error'))
      .finally(() => setLoading(false));
  }, []);

  const handleOpenSubmit = (asg: Assignment) => {
    if (!isAuthenticated) {
      showToast('Please log in to submit your assignment solution.', 'info');
      setActiveTab('login');
      return;
    }
    setSelectedAsg(asg);
    setSubForm({
      projectName: `${asg.title} Solution`,
      description: '',
      githubRepo: 'https://github.com/myusername/my-project',
      liveDemo: 'https://my-app.run.app'
    });
    setSubmitModalOpen(true);
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.createSubmission({
        ...subForm,
        assignmentId: selectedAsg?._id,
        assignmentTitle: selectedAsg?.title
      });
      showToast('Assignment project submitted successfully!', 'success');
      setSubmitModalOpen(false);
      setActiveTab('dashboard');
    } catch (err: any) {
      showToast('Error submitting project', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredAssignments = assignments.filter((a) => {
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDiff = difficultyFilter === 'All' || a.difficulty === difficultyFilter;
    return matchesSearch && matchesDiff;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title Header */}
      <div className="p-8 rounded-[6px] bg-[#111111] border border-[#2A2A2A] shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151515] text-[#C8A86B] text-xs font-semibold border border-[#2A2A2A]">
            <BookOpen className="w-3.5 h-3.5" /> Cohort 5 Curriculum
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#F5F2EE]">Daily Assignments: Prompting to Prototype</h1>
          <p className="text-[#A3A3A3] text-sm max-w-xl font-sans">
            Ship daily AI-assisted full stack software projects. Advance through the 30-day curriculum from initial prompt specification to live cloud prototype deployment.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[#A3A3A3] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search assignments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2.5 rounded-[6px] bg-[#151515] border border-[#2A2A2A] text-[#F5F2EE] text-xs focus:outline-none focus:border-[#C8A86B] font-sans"
            />
          </div>

          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="w-full sm:w-36 py-2.5 px-3 rounded-[6px] bg-[#151515] border border-[#2A2A2A] text-[#F5F2EE] text-xs font-sans cursor-pointer"
          >
            <option value="All" className="bg-[#111111]">All Difficulty</option>
            <option value="Easy" className="bg-[#111111]">Easy</option>
            <option value="Medium" className="bg-[#111111]">Medium</option>
            <option value="Hard" className="bg-[#111111]">Hard</option>
          </select>
        </div>
      </div>

      {/* Assignments Grid */}
      {loading ? (
        <div className="py-20 text-center text-[#A3A3A3] text-sm font-semibold font-sans">Loading curriculum...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredAssignments.map((asg) => (
            <div
              key={asg._id}
              className="p-6 rounded-[6px] bg-[#111111] border border-[#2A2A2A] hover:border-[#C8A86B]/40 transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#151515] text-[#C8A86B] border border-[#2A2A2A]">
                    Day {asg.dayNumber} Assignment
                  </span>
                  <span
                    className="text-xs font-semibold px-2.5 py-0.5 rounded bg-[#151515] text-[#A3A3A3] border border-[#2A2A2A]"
                  >
                    {asg.difficulty}
                  </span>
                </div>

                <h3 className="text-xl font-serif font-bold text-[#F5F2EE]">{asg.title}</h3>
                <p className="text-xs text-[#A3A3A3] leading-relaxed font-sans">{asg.description}</p>

                {asg.resources && asg.resources.length > 0 && (
                  <div className="space-y-1 pt-1 font-sans">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-[#C8A86B]">Documentation</div>
                    <div className="flex flex-wrap gap-2">
                      {asg.resources.map((res, i) => (
                        <a
                          key={i}
                          href={res}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-[#C8A86B] hover:underline"
                        >
                          <ExternalLink className="w-3 h-3" /> Link #{i + 1}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-[#2A2A2A] flex items-center justify-between font-sans">
                <div className="text-xs text-[#A3A3A3]">
                  Reward: <span className="text-[#C8A86B] font-semibold">{asg.points} Points</span>
                </div>

                <button
                  onClick={() => handleOpenSubmit(asg)}
                  className="px-5 py-2.5 rounded-full bg-[#F5F2EE] hover:bg-white text-[#090909] text-xs font-medium shadow-sm transition-all flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" /> Submit Project
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Submit Modal */}
      <Modal isOpen={submitModalOpen} onClose={() => setSubmitModalOpen(false)} title={`Submit Project: ${selectedAsg?.title}`}>
        <form onSubmit={handleProjectSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Project Name *</label>
            <input type="text" required value={subForm.projectName} onChange={(e) => setSubForm({ ...subForm, projectName: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm" />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Description *</label>
            <textarea required rows={3} value={subForm.description} onChange={(e) => setSubForm({ ...subForm, description: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">GitHub Repo *</label>
              <input type="url" required value={subForm.githubRepo} onChange={(e) => setSubForm({ ...subForm, githubRepo: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Live Demo *</label>
              <input type="url" required value={subForm.liveDemo} onChange={(e) => setSubForm({ ...subForm, liveDemo: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm" />
            </div>
          </div>

          <div className="pt-3 flex justify-end gap-3">
            <button type="button" onClick={() => setSubmitModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold">Cancel</button>
            <button type="submit" disabled={submitting} className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30">Submit</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
