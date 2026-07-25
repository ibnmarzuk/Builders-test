import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/common/Toast';
import { Code2, ArrowRight, ChevronDown } from 'lucide-react';

export const RegisterPage: React.FC<{ setActiveTab: (tab: string) => void }> = ({ setActiveTab }) => {
  const { register } = useAuth();
  const { showToast } = useToast();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    telegramUsername: '@',
    country: 'Nigeria',
    role: 'participant' as 'participant' | 'admin'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    setLoading(true);
    try {
      const u = await register(form);
      showToast(`Welcome to Builders Build Cohort 5, ${u.name} (${u.role === 'admin' ? 'Admin' : 'Builder'})!`, 'success');
      if (u.role === 'admin') {
        setActiveTab('admin');
      } else {
        setActiveTab('dashboard');
      }
    } catch (err: any) {
      const msg = err?.response?.data?.message || err.message || 'Registration failed';
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6 py-16">
      <div className="max-w-md w-full bg-[#111111] border border-[#2A2A2A] rounded-lg p-8 sm:p-10 shadow-2xl space-y-8 relative">
        <button
          type="button"
          onClick={() => setActiveTab('landing')}
          className="text-xs text-[#A3A3A3] hover:text-[#C8A86B] font-sans flex items-center gap-1 transition-colors absolute top-6 left-6 sm:left-8"
        >
          ← Overview
        </button>

        <div className="text-center space-y-3 pt-4">
          <div className="w-10 h-10 rounded-lg bg-[#151515] border border-[#2A2A2A] flex items-center justify-center mx-auto text-[#C8A86B]">
            <Code2 className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C8A86B] block">REGISTRATION</span>
          <h2 className="text-3xl font-serif font-bold text-[#F5F2EE] tracking-tight">Join Builders Build</h2>
          <p className="text-xs text-[#A3A3A3] font-sans">Select your role and create your Cohort 5 profile</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 font-sans">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#A3A3A3] mb-1.5">
              Select Role *
            </label>
            <div className="relative">
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value as 'participant' | 'admin' })}
                className="w-full px-4 py-3 rounded-md bg-[#151515] border border-[#2A2A2A] text-[#F5F2EE] text-sm focus:outline-none focus:border-[#C8A86B] appearance-none cursor-pointer pr-10 font-medium transition-colors"
              >
                <option value="participant" className="bg-[#111111] text-[#F5F2EE]">
                  Builder (Participant)
                </option>
                <option value="admin" className="bg-[#111111] text-[#F5F2EE]">
                  Cohort Admin
                </option>
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#A3A3A3]">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#A3A3A3] mb-1.5">Full Name *</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Alex Rivera"
              className="w-full px-4 py-3 rounded-md bg-[#151515] border border-[#2A2A2A] text-[#F5F2EE] text-sm focus:outline-none focus:border-[#C8A86B] transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#A3A3A3] mb-1.5">Email Address *</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="alex@example.com"
              className="w-full px-4 py-3 rounded-md bg-[#151515] border border-[#2A2A2A] text-[#F5F2EE] text-sm focus:outline-none focus:border-[#C8A86B] transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#A3A3A3] mb-1.5">Password *</label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-md bg-[#151515] border border-[#2A2A2A] text-[#F5F2EE] text-sm focus:outline-none focus:border-[#C8A86B] transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#A3A3A3] mb-1.5">Telegram Handle</label>
              <input
                type="text"
                value={form.telegramUsername}
                onChange={(e) => setForm({ ...form, telegramUsername: e.target.value })}
                placeholder="@username"
                className="w-full px-4 py-3 rounded-md bg-[#151515] border border-[#2A2A2A] text-[#F5F2EE] text-sm focus:outline-none focus:border-[#C8A86B] transition-colors"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#A3A3A3] mb-1.5">Country</label>
              <input
                type="text"
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                placeholder="e.g. Nigeria"
                className="w-full px-4 py-3 rounded-md bg-[#151515] border border-[#2A2A2A] text-[#F5F2EE] text-sm focus:outline-none focus:border-[#C8A86B] transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-[#F5F2EE] hover:bg-white text-[#090909] font-medium text-sm transition-all shadow-sm flex items-center justify-center gap-2 mt-2"
          >
            {loading ? 'Creating Account...' : `Register as ${form.role === 'admin' ? 'Cohort Admin' : 'Builder'}`} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-[#A3A3A3] pt-4 border-t border-[#2A2A2A] font-sans">
          Already registered?{' '}
          <button onClick={() => setActiveTab('login')} className="text-[#C8A86B] font-semibold hover:underline ml-1">
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};
