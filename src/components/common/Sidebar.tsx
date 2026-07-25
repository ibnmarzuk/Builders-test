import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Code2,
  ShieldAlert,
  LogOut,
  Layers,
  Megaphone,
  CheckSquare,
  Trophy,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronRight,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isOpen,
  setIsOpen,
  isCollapsed,
  setIsCollapsed,
}) => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  const navGroups = [
    ...(isAuthenticated
      ? [
          {
            title: 'Workspace',
            items: [
              { id: 'dashboard', label: 'My Dashboard', icon: Layers, description: 'Personal Progress' },
              ...(isAdmin
                ? [{ id: 'admin', label: 'Admin Center', icon: ShieldAlert, description: 'Cohort Management', badge: 'Admin' }]
                : []),
            ],
          },
        ]
      : []),
    {
      title: 'Cohort Modules',
      items: [
        { id: 'assignments', label: 'Assignments', icon: CheckSquare, description: 'Daily Curriculum & Tasks' },
        { id: 'announcements', label: 'Announcements', icon: Megaphone, description: 'Community Updates' },
        { id: 'submissions', label: 'Project Showcase', icon: Code2, description: 'Submitted Code & Demos' },
        { id: 'leaderboard', label: 'Leaderboard', icon: Trophy, description: 'Cohort Standings' },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-[#090909]/80 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-[#090909] border-r border-[#2A2A2A] transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${isCollapsed ? 'lg:w-20' : 'lg:w-64'} w-72`}
      >
        {/* Sidebar Header / Brand */}
        <div className="h-20 px-4 flex items-center justify-between border-b border-[#2A2A2A] shrink-0">
          <div
            onClick={() => {
              setActiveTab('landing');
              setIsOpen(false);
            }}
            className="flex items-center gap-3 cursor-pointer group overflow-hidden"
          >
            <div className="w-9 h-9 rounded-lg bg-[#151515] border border-[#2A2A2A] flex items-center justify-center group-hover:border-[#C8A86B] transition-colors shrink-0">
              <Code2 className="w-5 h-5 text-[#C8A86B]" />
            </div>

            {!isCollapsed && (
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-serif font-bold text-[#F5F2EE] text-base tracking-wide truncate group-hover:text-[#C8A86B] transition-colors">
                    BUILDERS
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.2em] font-semibold px-1.5 py-0.5 rounded bg-[#151515] text-[#C8A86B] border border-[#2A2A2A] shrink-0">
                    Cohort 5
                  </span>
                </div>
                <p className="text-[10px] text-[#A3A3A3] uppercase tracking-widest truncate">Engineering Hub</p>
              </div>
            )}
          </div>

          {/* Collapse/Expand button for desktop */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1.5 text-[#A3A3A3] hover:text-[#F5F2EE] hover:bg-[#151515] rounded-lg transition-colors shrink-0"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
          </button>
        </div>

        {/* Sidebar Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3 py-6 space-y-6">
          {navGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-1">
              {!isCollapsed && (
                <div className="px-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#C8A86B] mb-2">
                  {group.title}
                </div>
              )}

              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsOpen(false);
                    }}
                    title={isCollapsed ? item.label : undefined}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all group relative ${
                      isActive
                        ? 'bg-[#F5F2EE] text-[#090909] font-semibold shadow-sm'
                        : 'text-[#A3A3A3] hover:text-[#F5F2EE] hover:bg-[#111111]'
                    } ${isCollapsed ? 'justify-center px-0' : ''}`}
                  >
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isActive ? 'text-[#090909]' : 'text-[#A3A3A3] group-hover:text-[#C8A86B]'
                      }`}
                    />

                    {!isCollapsed && (
                      <div className="flex-1 text-left min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="truncate">{item.label}</span>
                          {item.badge && (
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#C8A86B]/20 text-[#C8A86B] border border-[#C8A86B]/30">
                              {item.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {isActive && !isCollapsed && <ChevronRight className="w-3.5 h-3.5 opacity-60 ml-auto" />}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Sidebar Footer / User Profile */}
        <div className="p-4 border-t border-[#2A2A2A] bg-[#090909] shrink-0">
          {isAuthenticated && user ? (
            <div
              className={`flex items-center gap-2.5 p-2 rounded-lg bg-[#111111] border border-[#2A2A2A] ${
                isCollapsed ? 'justify-center' : ''
              }`}
            >
              <img
                src={
                  user.avatarUrl ||
                  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
                }
                alt={user.name}
                className="w-8 h-8 rounded-full border border-[#C8A86B]/40 object-cover shrink-0"
              />

              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-[#F5F2EE] truncate">{user.name}</div>
                  <div className="text-[10px] text-[#A3A3A3] capitalize truncate">{user.role} Account</div>
                </div>
              )}

              <button
                onClick={logout}
                title="Log out"
                className="p-1.5 text-[#A3A3A3] hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors shrink-0"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            !isCollapsed && (
              <div className="p-2 text-center text-[11px] text-[#A3A3A3] space-y-2">
                <p className="uppercase tracking-widest text-[10px]">Cohort 5 Active</p>
                <button
                  onClick={() => setActiveTab('register')}
                  className="w-full py-2.5 rounded-full bg-[#F5F2EE] text-[#090909] font-semibold text-xs shadow-sm hover:bg-white transition-all"
                >
                  Sign Up as Builder
                </button>
              </div>
            )
          )}
        </div>
      </aside>
    </>
  );
};
