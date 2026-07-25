import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Submission } from '../types';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/common/Toast';
import { Modal } from '../components/common/Modal';
import {
  Code2,
  ExternalLink,
  Github,
  Plus,
  Search,
  Send,
  MessageSquare,
  Sparkles
} from 'lucide-react';

export const SubmissionsPage: React.FC<{ setActiveTab: (tab: string) => void }> = ({ setActiveTab }) => {
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Submit Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    projectName: '',
    description: '',
    githubRepo: '',
    liveDemo: '',
    screenshot: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchSubmissions = () => {
    api.getSubmissions()
      .then(setSubmissions)
      .catch(() => showToast('Error loading project submissions', 'error'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleOpenSubmitModal = () => {
    if (!isAuthenticated) {
      showToast('Please log in to submit your project showcase.', 'info');
      setActiveTab('login');
      return;
    }
    setForm({
      projectName: '',
      description: '',
      githubRepo: 'https://github.com/myusername/my-project',
      liveDemo: 'https://my-app.run.app',
      screenshot: ''
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.projectName || !form.description || !form.githubRepo || !form.liveDemo) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      await api.createSubmission(form);
      showToast('Project showcase submitted successfully!', 'success');
      setModalOpen(false);
      fetchSubmissions();
    } catch (err: any) {
      showToast('Error submitting project', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const filtered = submissions.filter(s =>
    s.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (s.submittedBy?.name && s.submittedBy.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="p-8 rounded-[6px] bg-[#111111] border border-[#2A2A2A] shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151515] text-[#C8A86B] text-xs font-semibold border border-[#2A2A2A]">
            <Code2 className="w-3.5 h-3.5" /> Community Showcase
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#F5F2EE]">Project Submissions & Demos</h1>
          <p className="text-[#A3A3A3] text-sm max-w-xl font-sans">
            Explore live software built by participants across all cohorts. Review source repositories, test live links, and share feedback.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[#A3A3A3] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search projects or builders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2.5 rounded-[6px] bg-[#151515] border border-[#2A2A2A] text-[#F5F2EE] text-xs focus:outline-none focus:border-[#C8A86B] font-sans"
            />
          </div>

          <button
            onClick={handleOpenSubmitModal}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#F5F2EE] hover:bg-white text-[#090909] text-xs font-medium shadow-sm transition-all flex items-center justify-center gap-1.5 font-sans"
          >
            <Plus className="w-4 h-4" /> Submit Project
          </button>
        </div>
      </div>

      {/* Grid Showcase */}
      {loading ? (
        <div className="py-20 text-center text-[#A3A3A3] text-sm font-semibold font-sans">Loading project showcase...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((sub) => (
            <div
              key={sub._id}
              className="p-6 rounded-[6px] bg-[#111111] border border-[#2A2A2A] hover:border-[#C8A86B]/40 transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={sub.submittedBy?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                      alt={sub.submittedBy?.name}
                      className="w-7 h-7 rounded-full border border-[#2A2A2A] object-cover"
                    />
                    <span className="text-xs font-medium text-[#F5F2EE] font-sans">{sub.submittedBy?.name || 'Builder'}</span>
                  </div>

                  <span
                    className="text-[10px] font-semibold uppercase px-2.5 py-0.5 rounded bg-[#151515] text-[#C8A86B] border border-[#2A2A2A]"
                  >
                    {sub.status}
                  </span>
                </div>

                <h3 className="text-lg font-serif font-bold text-[#F5F2EE] leading-snug">{sub.projectName}</h3>
                <p className="text-xs text-[#A3A3A3] line-clamp-3 leading-relaxed font-sans">{sub.description}</p>

                {sub.feedback && (
                  <div className="p-3 rounded-[6px] bg-[#151515] border border-[#2A2A2A] text-xs text-[#A3A3A3] font-sans">
                    <div className="font-semibold text-[10px] text-[#C8A86B] uppercase tracking-wider mb-0.5">Mentor Feedback</div>
                    "{sub.feedback}"
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-[#2A2A2A] flex items-center justify-between font-sans">
                <div className="text-[10px] text-[#A3A3A3]">
                  {new Date(sub.submissionDate).toLocaleDateString()}
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={sub.githubRepo}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-[6px] bg-[#151515] border border-[#2A2A2A] hover:border-[#C8A86B] text-[#A3A3A3] hover:text-[#F5F2EE] transition-colors"
                    title="GitHub Code Repository"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={sub.liveDemo}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-[6px] bg-[#151515] border border-[#2A2A2A] hover:border-[#C8A86B] text-[#A3A3A3] hover:text-[#C8A86B] transition-colors"
                    title="Open Live Application Demo"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Submit Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Submit Project Showcase">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Project Name *</label>
            <input
              type="text"
              required
              value={form.projectName}
              onChange={(e) => setForm({ ...form, projectName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Description *</label>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">GitHub Repo *</label>
              <input
                type="url"
                required
                value={form.githubRepo}
                onChange={(e) => setForm({ ...form, githubRepo: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Live Demo URL *</label>
              <input
                type="url"
                required
                value={form.liveDemo}
                onChange={(e) => setForm({ ...form, liveDemo: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
              />
            </div>
          </div>

          <div className="pt-3 flex justify-end gap-3">
            <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold">
              Cancel
            </button>
            <button type="submit" disabled={submitting} className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30">
              Submit Showcase
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
