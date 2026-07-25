import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/common/Toast';
import { Code2, ArrowRight, ChevronDown } from 'lucide-react';

export const LoginPage: React.FC<{ setActiveTab: (tab: string) => void }> = ({ setActiveTab }) => {
  const { login } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'participant' | 'admin'>('participant');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please enter both email and password.', 'error');
      return;
    }

    setLoading(true);
    try {
      const u = await login(email, password);
      showToast(`Welcome back, ${u.name} (${u.role === 'admin' ? 'Admin' : 'Builder'})!`, 'success');
      if (u.role === 'admin') {
        setActiveTab('admin');
      } else {
        setActiveTab('dashboard');
      }
    } catch (err: any) {
      const msg = err?.response?.data?.message || err.message || 'Invalid email or password';
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = (role: 'participant' | 'admin') => {
    if (role === 'admin') {
      setEmail('admin@buildersbuild.com');
      setPassword('admin123');
      setSelectedRole('admin');
    } else {
      setEmail('alex@buildersbuild.com');
      setPassword('builder123');
      setSelectedRole('participant');
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
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C8A86B] block">AUTHENTICATION</span>
          <h2 className="text-3xl font-serif font-bold text-[#F5F2EE] tracking-tight">Log In to Builders Build</h2>
          <p className="text-xs text-[#A3A3A3] font-sans">Sign in to your Cohort 5 builder or admin account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 font-sans">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#A3A3A3] mb-1.5">
              Select Role *
            </label>
            <div className="relative">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as 'participant' | 'admin')}
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
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#A3A3A3] mb-1.5">
              {selectedRole === 'admin' ? 'Admin Email Address' : 'Builder Email Address'}
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={selectedRole === 'admin' ? 'admin@buildersbuild.com' : 'builder@buildersbuild.com'}
              className="w-full px-4 py-3 rounded-md bg-[#151515] border border-[#2A2A2A] text-[#F5F2EE] text-sm focus:outline-none focus:border-[#C8A86B] transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#A3A3A3] mb-1.5">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-md bg-[#151515] border border-[#2A2A2A] text-[#F5F2EE] text-sm focus:outline-none focus:border-[#C8A86B] transition-colors"
            />
          </div>

          {/* Quick Demo Credentials Autofill */}
          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-[#A3A3A3]">Quick Demo Prefill:</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('participant')}
                className="text-[11px] font-medium text-[#C8A86B] hover:underline"
              >
                Builder
              </button>
              <span className="text-[#2A2A2A]">•</span>
              <button
                type="button"
                onClick={() => handleQuickDemo('admin')}
                className="text-[11px] font-medium text-[#C8A86B] hover:underline"
              >
                Admin
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-[#F5F2EE] hover:bg-white text-[#090909] font-medium text-sm transition-all shadow-sm flex items-center justify-center gap-2 mt-2"
          >
            {loading ? 'Authenticating...' : `Sign In as ${selectedRole === 'admin' ? 'Cohort Admin' : 'Builder'}`}{' '}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-[#A3A3A3] pt-4 border-t border-[#2A2A2A] font-sans">
          Don't have an account yet?{' '}
          <button onClick={() => setActiveTab('register')} className="text-[#C8A86B] font-semibold hover:underline ml-1">
            Register as a Builder
          </button>
        </div>
      </div>
    </div>
  );
};
