/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './components/common/Toast';
import { Sidebar } from './components/common/Sidebar';
import { HeaderBar } from './components/common/HeaderBar';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';

import { LandingPage } from './pages/LandingPage';
import { UserDashboard } from './pages/UserDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { AssignmentsPage } from './pages/AssignmentsPage';
import { AnnouncementsPage } from './pages/AnnouncementsPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { SubmissionsPage } from './pages/SubmissionsPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

function MainLayout() {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('landing');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#090909] text-[#F5F2EE] font-sans selection:bg-[#C8A86B] selection:text-[#090909] flex">
        {/* Workspace Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
          isCollapsed={sidebarCollapsed}
          setIsCollapsed={setSidebarCollapsed}
        />

        {/* Main Workspace Body */}
        <div
          className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
            sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
          }`}
        >
          <HeaderBar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onOpenMobileSidebar={() => setSidebarOpen(true)}
          />

          <main className="flex-1 overflow-x-hidden relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8, filter: 'blur(3px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -8, filter: 'blur(3px)' }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full"
              >
                {activeTab === 'landing' && <LandingPage setActiveTab={setActiveTab} />}
                {activeTab === 'dashboard' && <UserDashboard setActiveTab={setActiveTab} />}
                {activeTab === 'admin' && <AdminDashboard />}
                {activeTab === 'assignments' && <AssignmentsPage setActiveTab={setActiveTab} />}
                {activeTab === 'announcements' && <AnnouncementsPage />}
                {activeTab === 'leaderboard' && <LeaderboardPage />}
                {activeTab === 'submissions' && <SubmissionsPage setActiveTab={setActiveTab} />}
                {activeTab === 'login' && <LoginPage setActiveTab={setActiveTab} />}
                {activeTab === 'register' && <RegisterPage setActiveTab={setActiveTab} />}
              </motion.div>
            </AnimatePresence>
          </main>

          <Footer setActiveTab={setActiveTab} />
        </div>
      </div>
    );
  }

  // Public / Unauthenticated View (Clean layout without top navigation bar on landing, login, or registration pages)
  return (
    <div className="min-h-screen bg-[#090909] text-[#F5F2EE] font-sans selection:bg-[#C8A86B] selection:text-[#090909] flex flex-col">
      {activeTab !== 'landing' && activeTab !== 'login' && activeTab !== 'register' && (
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      )}

      <main className="flex-1 overflow-x-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8, filter: 'blur(3px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -8, filter: 'blur(3px)' }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full"
          >
            {activeTab === 'landing' && <LandingPage setActiveTab={setActiveTab} />}
            {activeTab === 'dashboard' && <UserDashboard setActiveTab={setActiveTab} />}
            {activeTab === 'admin' && <AdminDashboard />}
            {activeTab === 'assignments' && <AssignmentsPage setActiveTab={setActiveTab} />}
            {activeTab === 'announcements' && <AnnouncementsPage />}
            {activeTab === 'leaderboard' && <LeaderboardPage />}
            {activeTab === 'submissions' && <SubmissionsPage setActiveTab={setActiveTab} />}
            {activeTab === 'login' && <LoginPage setActiveTab={setActiveTab} />}
            {activeTab === 'register' && <RegisterPage setActiveTab={setActiveTab} />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <MainLayout />
      </ToastProvider>
    </AuthProvider>
  );
}
