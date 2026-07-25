import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Menu,
  LogOut,
  Compass
} from 'lucide-react';

interface HeaderBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenMobileSidebar: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  activeTab,
  setActiveTab,
  onOpenMobileSidebar,
}) => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  const getPageTitle = (tab: string) => {
    switch (tab) {
      case 'landing':
        return { title: 'Builders Build Community Hub', subtitle: 'Global Cohort 5 Platform' };
      case 'dashboard':
        return { title: 'My Builder Dashboard', subtitle: 'Personal progress & assigned tasks' };
      case 'admin':
        return { title: 'Admin Command Center', subtitle: 'Cohort management & submission reviews' };
      case 'assignments':
        return { title: 'Daily Assignments & Tasks', subtitle: 'Curriculum roadmap and deliverables' };
      case 'announcements':
        return { title: 'Announcements & Updates', subtitle: 'Live broadcast feed from organizers' };
      case 'submissions':
        return { title: 'Project Showcase', subtitle: 'Participant builds, live demos & source code' };
      case 'leaderboard':
        return { title: 'Global Builder Leaderboard', subtitle: 'Top points & cohort standings' };
      case 'login':
        return { title: 'Log In to Hub', subtitle: 'Access your builder account' };
      case 'register':
        return { title: 'Join Cohort 5', subtitle: 'Create your builder profile' };
      default:
        return { title: 'Builders Build Hub', subtitle: 'Community platform' };
    }
  };

  const currentInfo = getPageTitle(activeTab);

  return (
    <header className="sticky top-0 z-30 h-20 w-full border-b border-[#2A2A2A] bg-[#090909]/90 backdrop-blur-md px-6 lg:px-10 flex items-center justify-between gap-4">
      {/* Left side: Mobile menu toggle & page breadcrumb */}
      <div className="flex items-center gap-4 min-w-0">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 text-[#A3A3A3] hover:text-white rounded-lg bg-[#111111] border border-[#2A2A2A] transition-colors"
          title="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <h1 className="text-sm sm:text-base font-serif font-bold text-[#F5F2EE] truncate tracking-wide">
              {currentInfo.title}
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-[#151515] text-[#C8A86B] border border-[#2A2A2A]">
              <Compass className="w-3 h-3 text-[#C8A86B]" />
              Cohort 5
            </span>
          </div>
          <p className="text-[11px] text-[#A3A3A3] truncate hidden sm:block font-sans">
            {currentInfo.subtitle}
          </p>
        </div>
      </div>

      {/* Right side: Auth & User Profile */}
      <div className="flex items-center gap-3 shrink-0">
        {isAuthenticated && user ? (
          <div className="flex items-center gap-3 pl-3 border-l border-[#2A2A2A]">
            <button
              onClick={() => setActiveTab(isAdmin ? 'admin' : 'dashboard')}
              className="flex items-center gap-2.5 text-left group"
            >
              <img
                src={
                  user.avatarUrl ||
                  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
                }
                alt={user.name}
                className="w-8 h-8 rounded-full border border-[#C8A86B]/40 object-cover group-hover:border-[#C8A86B] transition-colors"
              />
              <div className="hidden md:block">
                <div className="text-xs font-semibold text-[#F5F2EE] group-hover:text-[#C8A86B] transition-colors">
                  {user.name}
                </div>
                <div className="text-[10px] text-[#A3A3A3] capitalize">{user.role}</div>
              </div>
            </button>
            <button
              onClick={logout}
              title="Log out"
              className="p-1.5 text-[#A3A3A3] hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
};
