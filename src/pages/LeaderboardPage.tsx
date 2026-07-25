import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Participant } from '../types';
import { useToast } from '../components/common/Toast';
import { Trophy, Award, Search, Globe, Flame, CheckCircle2 } from 'lucide-react';

export const LeaderboardPage: React.FC = () => {
  const { showToast } = useToast();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [countryFilter, setCountryFilter] = useState('All');

  useEffect(() => {
    api.getParticipants()
      .then(setParticipants)
      .catch(() => showToast('Error loading leaderboard', 'error'))
      .finally(() => setLoading(false));
  }, []);

  const countries = Array.from(new Set(participants.map((p) => p.country)));

  const filtered = participants.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.telegramUsername.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = countryFilter === 'All' || p.country === countryFilter;
    return matchesSearch && matchesCountry;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="p-8 rounded-[6px] bg-[#111111] border border-[#2A2A2A] shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151515] text-[#C8A86B] text-xs font-semibold border border-[#2A2A2A]">
            <Trophy className="w-3.5 h-3.5 text-[#C8A86B]" /> Global Rankings
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#F5F2EE]">Cohort Leaderboard</h1>
          <p className="text-[#A3A3A3] text-sm max-w-xl font-sans">
            Recognizing top builders for code completeness, prompt submissions, and active peer engagement.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[#A3A3A3] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search builder..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2.5 rounded-[6px] bg-[#151515] border border-[#2A2A2A] text-[#F5F2EE] text-xs focus:outline-none focus:border-[#C8A86B] font-sans"
            />
          </div>

          <select
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
            className="w-full sm:w-36 py-2.5 px-3 rounded-[6px] bg-[#151515] border border-[#2A2A2A] text-[#F5F2EE] text-xs font-sans cursor-pointer"
          >
            <option value="All" className="bg-[#111111]">All Countries</option>
            {countries.map((c) => (
              <option key={c} value={c} className="bg-[#111111]">
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Podium Top 3 */}
      {filtered.length >= 3 && countryFilter === 'All' && !searchQuery && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Rank 2 */}
          <div className="p-6 rounded-[6px] bg-[#111111] border border-[#2A2A2A] flex flex-col items-center text-center space-y-3 relative order-2 md:order-1">
            <div className="w-10 h-10 rounded-full bg-[#151515] border border-[#2A2A2A] flex items-center justify-center font-bold text-[#F5F2EE] text-sm font-serif">
              #2
            </div>
            <img src={filtered[1].avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'} alt={filtered[1].name} className="w-16 h-16 rounded-full border border-[#2A2A2A] object-cover" />
            <h3 className="font-serif font-bold text-[#F5F2EE] text-base">{filtered[1].name}</h3>
            <p className="text-xs text-[#A3A3A3] font-sans">{filtered[1].country} • {filtered[1].telegramUsername}</p>
            <div className="px-3 py-1 rounded bg-[#151515] text-[#C8A86B] border border-[#2A2A2A] text-xs font-semibold font-sans">
              {filtered[1].totalPoints} Points
            </div>
          </div>

          {/* Rank 1 */}
          <div className="p-6 rounded-[6px] bg-[#111111] border-2 border-[#C8A86B] flex flex-col items-center text-center space-y-3 relative order-1 md:order-2 shadow-2xl scale-105">
            <div className="w-12 h-12 rounded-full bg-[#151515] border border-[#C8A86B] flex items-center justify-center font-bold text-[#C8A86B] text-base shadow-lg">
              <Trophy className="w-6 h-6 text-[#C8A86B] fill-[#C8A86B]" />
            </div>
            <img src={filtered[0].avatarUrl || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'} alt={filtered[0].name} className="w-20 h-20 rounded-full border-2 border-[#C8A86B] object-cover shadow-xl" />
            <h3 className="font-serif font-bold text-[#F5F2EE] text-lg">{filtered[0].name}</h3>
            <p className="text-xs text-[#C8A86B] font-semibold font-sans">{filtered[0].country} • {filtered[0].telegramUsername}</p>
            <div className="px-4 py-1.5 rounded bg-[#151515] text-[#C8A86B] border border-[#2A2A2A] text-xs font-semibold font-sans">
              {filtered[0].totalPoints} Points • Champion
            </div>
          </div>

          {/* Rank 3 */}
          <div className="p-6 rounded-[6px] bg-[#111111] border border-[#2A2A2A] flex flex-col items-center text-center space-y-3 relative order-3">
            <div className="w-10 h-10 rounded-full bg-[#151515] border border-[#2A2A2A] flex items-center justify-center font-bold text-[#A3A3A3] text-sm font-serif">
              #3
            </div>
            <img src={filtered[2].avatarUrl || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'} alt={filtered[2].name} className="w-16 h-16 rounded-full border border-[#2A2A2A] object-cover" />
            <h3 className="font-serif font-bold text-[#F5F2EE] text-base">{filtered[2].name}</h3>
            <p className="text-xs text-[#A3A3A3] font-sans">{filtered[2].country} • {filtered[2].telegramUsername}</p>
            <div className="px-3 py-1 rounded bg-[#151515] text-[#C8A86B] border border-[#2A2A2A] text-xs font-semibold font-sans">
              {filtered[2].totalPoints} Points
            </div>
          </div>
        </div>
      )}

      {/* Full Leaderboard Table */}
      <div className="rounded-[6px] bg-[#111111] border border-[#2A2A2A] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#A3A3A3] font-sans">
            <thead className="bg-[#151515] border-b border-[#2A2A2A] uppercase tracking-wider text-[10px] font-semibold text-[#A3A3A3]">
              <tr>
                <th className="p-4">Rank</th>
                <th className="p-4">Builder</th>
                <th className="p-4">Telegram</th>
                <th className="p-4">Country</th>
                <th className="p-4">Completed</th>
                <th className="p-4">Total Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2A2A]">
              {filtered.map((p, idx) => (
                <tr key={p._id} className="hover:bg-[#151515] transition-colors">
                  <td className="p-4 font-serif font-bold text-[#C8A86B]">#{idx + 1}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                        alt={p.name}
                        className="w-8 h-8 rounded-full border border-[#2A2A2A] object-cover"
                      />
                      <div>
                        <div className="font-semibold text-[#F5F2EE] text-sm">{p.name}</div>
                        <div className="text-[10px] text-[#A3A3A3]">{p.cohort}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-mono text-[#C8A86B]">{p.telegramUsername}</td>
                  <td className="p-4 text-[#A3A3A3]">{p.country}</td>
                  <td className="p-4 font-medium text-[#A3A3A3]">{p.completedAssignments} Projects</td>
                  <td className="p-4 font-serif font-bold text-[#C8A86B] text-sm">{p.totalPoints} pts</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
