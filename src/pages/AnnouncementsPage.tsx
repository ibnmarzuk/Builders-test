import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Announcement } from '../types';
import { useToast } from '../components/common/Toast';
import { Megaphone, Search, Pin, Calendar, Tag } from 'lucide-react';

export const AnnouncementsPage: React.FC = () => {
  const { showToast } = useToast();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  useEffect(() => {
    api.getAnnouncements()
      .then(setAnnouncements)
      .catch(() => showToast('Error loading announcements', 'error'))
      .finally(() => setLoading(false));
  }, []);

  const filteredAnnouncements = announcements.filter((a) => {
    const matchesQuery = a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === 'All' || a.category === categoryFilter;
    return matchesQuery && matchesCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="p-8 rounded-[6px] bg-[#111111] border border-[#2A2A2A] shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151515] text-[#C8A86B] text-xs font-semibold border border-[#2A2A2A]">
            <Megaphone className="w-3.5 h-3.5" /> Cohort Broadcasts
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#F5F2EE]">Community Announcements</h1>
          <p className="text-[#A3A3A3] text-sm max-w-xl font-sans">
            Stay up to date with official workshop schedules, deadline updates, and cohort news.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[#A3A3A3] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2.5 rounded-[6px] bg-[#151515] border border-[#2A2A2A] text-[#F5F2EE] text-xs focus:outline-none focus:border-[#C8A86B] font-sans"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full sm:w-36 py-2.5 px-3 rounded-[6px] bg-[#151515] border border-[#2A2A2A] text-[#F5F2EE] text-xs font-sans cursor-pointer"
          >
            <option value="All" className="bg-[#111111]">All Categories</option>
            <option value="General" className="bg-[#111111]">General</option>
            <option value="Assignment" className="bg-[#111111]">Assignment</option>
            <option value="Event" className="bg-[#111111]">Event</option>
            <option value="Urgent" className="bg-[#111111]">Urgent</option>
          </select>
        </div>
      </div>

      {/* Feed List */}
      {loading ? (
        <div className="py-20 text-center text-[#A3A3A3] text-sm font-semibold">Loading announcements...</div>
      ) : (
        <div className="space-y-4">
          {filteredAnnouncements.map((anc) => (
            <div
              key={anc._id}
              className={`p-6 rounded-[6px] bg-[#111111] border border-[#2A2A2A] transition-all space-y-3 ${
                anc.isPinned ? 'border-[#C8A86B]/60 shadow-lg' : 'hover:border-[#C8A86B]/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#151515] text-[#C8A86B] border border-[#2A2A2A]">
                    {anc.category}
                  </span>
                  {anc.isPinned && (
                    <span className="text-xs font-semibold text-[#C8A86B] flex items-center gap-1 bg-[#151515] px-2.5 py-0.5 rounded border border-[#2A2A2A]">
                      <Pin className="w-3 h-3 fill-[#C8A86B]" /> Pinned
                    </span>
                  )}
                </div>
                <div className="text-xs text-[#A3A3A3] flex items-center gap-1 font-sans">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(anc.date).toLocaleDateString()}
                </div>
              </div>

              <h3 className="text-xl font-serif font-bold text-[#F5F2EE]">{anc.title}</h3>
              <p className="text-sm text-[#A3A3A3] leading-relaxed whitespace-pre-line font-sans">{anc.content}</p>

              <div className="text-xs text-[#A3A3A3]/70 pt-3 border-t border-[#2A2A2A] font-sans">
                Published by <span className="text-[#F5F2EE] font-medium">{anc.authorName}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
