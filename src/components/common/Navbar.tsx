import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Code2,
  ShieldAlert,
  LogOut,
  Layers,
  Megaphone,
  CheckSquare,
  Trophy,
  Menu,
  X,
  Globe
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'landing', label: 'Overview', icon: Globe },
    ...(isAuthenticated
      ? [
          { id: 'dashboard', label: 'My Dashboard', icon: Layers },
          ...(isAdmin ? [{ id: 'admin', label: 'Admin Hub', icon: ShieldAlert }] : []),
        ]
      : []),
    { id: 'assignments', label: 'Assignments', icon: CheckSquare },
    { id: 'announcements', label: 'Announcements', icon: Megaphone },
    { id: 'submissions', label: 'Projects', icon: Code2 },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#2A2A2A] bg-[#090909]/90 backdrop-blur-md">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between gap-6">
        {/* Brand Logo */}
        <div
          onClick={() => setActiveTab('landing')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-lg bg-[#151515] border border-[#2A2A2A] flex items-center justify-center group-hover:border-[#C8A86B] transition-colors duration-300">
            <Code2 className="w-5 h-5 text-[#C8A86B]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif tracking-wide text-white text-lg font-bold group-hover:text-[#C8A86B] transition-colors">
                BUILDERS BUILD
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold px-2 py-0.5 rounded bg-[#151515] text-[#C8A86B] border border-[#2A2A2A]">
                Cohort 5
              </span>
            </div>
            <p className="text-[11px] text-[#A3A3A3] tracking-widest uppercase">Engineering Hub</p>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1 bg-[#111111] p-1.5 rounded-full border border-[#2A2A2A]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-[#F5F2EE] text-[#090909] font-semibold shadow-sm'
                    : 'text-[#A3A3A3] hover:text-[#F5F2EE] hover:bg-[#151515]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls & Auth State */}
        <div className="hidden lg:flex items-center gap-3">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-4 pl-3 border-l border-[#2A2A2A]">
              <div className="flex items-center gap-2.5">
                <img
                  src={
                    user.avatarUrl ||
                    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
                  }
                  alt={user.name}
                  className="w-8 h-8 rounded-full border border-[#C8A86B]/40 object-cover"
                />
                <div className="text-left">
                  <div className="text-xs font-semibold text-[#F5F2EE] leading-none">{user.name}</div>
                  <div className="text-[10px] text-[#A3A3A3] capitalize mt-0.5">{user.role} Account</div>
                </div>
              </div>
              <button
                onClick={logout}
                title="Log out"
                className="p-2 text-[#A3A3A3] hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab('login')}
                className="px-5 py-2 text-xs font-medium text-[#A3A3A3] hover:text-[#F5F2EE] transition-colors"
              >
                Log In
              </button>
              <button
                onClick={() => setActiveTab('register')}
                className="px-5 py-2 text-xs font-medium text-[#090909] bg-[#F5F2EE] hover:bg-white rounded-full transition-all shadow-sm"
              >
                Sign Up as Builder
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#A3A3A3] hover:text-white rounded-lg bg-[#111111] border border-[#2A2A2A]"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#090909] border-b border-[#2A2A2A] px-6 pt-2 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 p-3 rounded-lg text-xs font-medium ${
                    activeTab === item.id
                      ? 'bg-[#F5F2EE] text-[#090909]'
                      : 'bg-[#111111] text-[#A3A3A3] border border-[#2A2A2A]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </div>

          {!isAuthenticated && (
            <div className="pt-3 border-t border-[#2A2A2A] grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setActiveTab('login');
                  setMobileMenuOpen(false);
                }}
                className="p-3 bg-[#111111] rounded-full text-xs font-medium text-[#F5F2EE] border border-[#2A2A2A] text-center"
              >
                Log In
              </button>
              <button
                onClick={() => {
                  setActiveTab('register');
                  setMobileMenuOpen(false);
                }}
                className="p-3 bg-[#F5F2EE] rounded-full text-xs font-medium text-[#090909] text-center"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
