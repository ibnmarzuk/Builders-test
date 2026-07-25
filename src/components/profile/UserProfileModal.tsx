import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { useToast } from '../common/Toast';
import { Modal } from '../common/Modal';
import {
  User as UserIcon,
  Globe,
  Send,
  Link as LinkIcon,
  Sparkles,
  FileText,
  Github,
  Linkedin,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, onClose }) => {
  const { user, updateUserInState } = useAuth();
  const { showToast } = useToast();

  const [form, setForm] = useState({
    name: user?.name || '',
    telegramUsername: user?.telegramUsername || '',
    country: user?.country || '',
    bio: user?.bio || '',
    professionalLink: user?.professionalLink || '',
    avatarUrl: user?.avatarUrl || '',
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        telegramUsername: user.telegramUsername || '',
        country: user.country || '',
        bio: user.bio || '',
        professionalLink: user.professionalLink || '',
        avatarUrl: user.avatarUrl || '',
      });
    }
  }, [user, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.updateProfile(form);
      updateUserInState(res.user);
      showToast('Profile and bio updated successfully!', 'success');
      onClose();
    } catch (err: any) {
      showToast(err?.response?.data?.message || err.message || 'Failed to update profile', 'error');
    } finally {
      setSaving(false);
    }
  };

  const presetAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80'
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Builder Editorial Profile">
      <form onSubmit={handleSubmit} className="space-y-6 text-[#F5F2EE] font-sans">
        {/* Profile Card Preview */}
        <div className="p-5 rounded-[6px] bg-[#151515] border border-[#2A2A2A] relative overflow-hidden">
          <div className="flex items-start gap-4">
            <img
              src={
                form.avatarUrl ||
                'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
              }
              alt={form.name || 'Builder'}
              className="w-16 h-16 rounded-full border-2 border-[#C8A86B] object-cover shrink-0 shadow-md"
            />
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#C8A86B] uppercase tracking-wider">
                  Cohort 5 Builder
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8A86B]" />
                <span className="text-xs text-[#A3A3A3]">{form.country || 'Global'}</span>
              </div>
              <h3 className="text-lg font-serif font-bold text-[#F5F2EE] truncate">
                {form.name || 'Builder Name'}
              </h3>
              <p className="text-xs text-[#A3A3A3] italic line-clamp-2">
                {form.bio || 'No bio written yet. Share your background, tech stack, and build focus.'}
              </p>
              {form.professionalLink && (
                <a
                  href={form.professionalLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#C8A86B] hover:underline pt-1"
                >
                  <LinkIcon className="w-3.5 h-3.5" />
                  <span className="truncate max-w-[220px]">{form.professionalLink}</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Form Inputs Grid */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#C8A86B] mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Alex Rivera"
                className="w-full px-3.5 py-2.5 rounded-[6px] bg-[#111111] border border-[#2A2A2A] text-[#F5F2EE] text-xs focus:outline-none focus:border-[#C8A86B] transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#C8A86B] mb-1.5">
                Telegram Handle
              </label>
              <input
                type="text"
                value={form.telegramUsername}
                onChange={(e) => setForm({ ...form, telegramUsername: e.target.value })}
                placeholder="@alexbuilder"
                className="w-full px-3.5 py-2.5 rounded-[6px] bg-[#111111] border border-[#2A2A2A] text-[#F5F2EE] text-xs focus:outline-none focus:border-[#C8A86B] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#C8A86B] mb-1.5">
              Country / Region
            </label>
            <input
              type="text"
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
              placeholder="e.g. Nigeria, Germany, Singapore, United States"
              className="w-full px-3.5 py-2.5 rounded-[6px] bg-[#111111] border border-[#2A2A2A] text-[#F5F2EE] text-xs focus:outline-none focus:border-[#C8A86B] transition-colors"
            />
          </div>

          {/* Member Bio Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#C8A86B]">
                Member Bio & Engineering Focus
              </label>
              <span className="text-[10px] text-[#A3A3A3]">{form.bio.length} / 300</span>
            </div>
            <textarea
              rows={3}
              maxLength={300}
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              placeholder="Full-stack engineer building AI agents & web apps. Focused on React, Node.js, and TypeScript..."
              className="w-full px-3.5 py-2.5 rounded-[6px] bg-[#111111] border border-[#2A2A2A] text-[#F5F2EE] text-xs focus:outline-none focus:border-[#C8A86B] transition-colors leading-relaxed resize-none"
            />
          </div>

          {/* Professional Link Input */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#C8A86B] mb-1.5">
              Professional Link (Portfolio / LinkedIn / GitHub)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#A3A3A3]">
                <LinkIcon className="w-4 h-4 text-[#C8A86B]" />
              </div>
              <input
                type="url"
                value={form.professionalLink}
                onChange={(e) => setForm({ ...form, professionalLink: e.target.value })}
                placeholder="https://github.com/alexrivera or https://linkedin.com/in/alexrivera"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-[6px] bg-[#111111] border border-[#2A2A2A] text-[#F5F2EE] text-xs focus:outline-none focus:border-[#C8A86B] transition-colors"
              />
            </div>
          </div>

          {/* Avatar URL / Selection */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#C8A86B] mb-1.5">
              Avatar Image URL
            </label>
            <input
              type="url"
              value={form.avatarUrl}
              onChange={(e) => setForm({ ...form, avatarUrl: e.target.value })}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3.5 py-2.5 rounded-[6px] bg-[#111111] border border-[#2A2A2A] text-[#F5F2EE] text-xs focus:outline-none focus:border-[#C8A86B] transition-colors mb-2"
            />
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-[#A3A3A3]">Quick Presets:</span>
              <div className="flex items-center gap-1.5">
                {presetAvatars.map((url, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setForm({ ...form, avatarUrl: url })}
                    className={`w-6 h-6 rounded-full border overflow-hidden transition-all ${
                      form.avatarUrl === url ? 'border-[#C8A86B] scale-110' : 'border-[#2A2A2A] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={url} alt={`Preset ${i}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="pt-4 border-t border-[#2A2A2A] flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-full bg-[#151515] text-[#A3A3A3] hover:text-[#F5F2EE] border border-[#2A2A2A] text-xs font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2 rounded-full bg-[#F5F2EE] hover:bg-white text-[#090909] text-xs font-semibold shadow-sm transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <CheckCircle2 className="w-4 h-4 text-[#C8A86B]" />
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
