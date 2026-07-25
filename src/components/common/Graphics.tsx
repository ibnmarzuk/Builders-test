import React from 'react';

export const CodeMatrixGraphic: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => (
  <svg className={className} viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="800" height="500" rx="16" fill="#090D16" />
    <path d="M0 0H800V500H0V0Z" fill="url(#bg_gradient)" opacity="0.4" />

    {/* Abstract Grid Lines */}
    <g opacity="0.15">
      {Array.from({ length: 16 }).map((_, i) => (
        <line key={`h_${i}`} x1="0" y1={i * 32} x2="800" y2={i * 32} stroke="#6366F1" strokeWidth="1" />
      ))}
      {Array.from({ length: 25 }).map((_, i) => (
        <line key={`v_${i}`} x1={i * 32} y1="0" x2={i * 32} y2="500" stroke="#6366F1" strokeWidth="1" />
      ))}
    </g>

    {/* Glowing Nodes */}
    <circle cx="200" cy="180" r="120" fill="#6366F1" opacity="0.25" filter="blur(50px)" />
    <circle cx="580" cy="280" r="140" fill="#06B6D4" opacity="0.2" filter="blur(60px)" />
    <circle cx="400" cy="380" r="90" fill="#10B981" opacity="0.2" filter="blur(40px)" />

    {/* Floating Window UI Box */}
    <rect x="120" y="80" width="560" height="340" rx="12" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
    <rect x="120" y="80" width="560" height="40" rx="12" fill="#1E293B" opacity="0.6" />
    <circle cx="148" cy="100" r="5" fill="#EF4444" />
    <circle cx="164" cy="100" r="5" fill="#F59E0B" />
    <circle cx="180" cy="100" r="5" fill="#10B981" />
    <text x="204" y="104" fill="#94A3B8" fontSize="12" fontFamily="monospace" fontWeight="600">server.ts — Builders Build MERN Engine</text>

    {/* Code Lines Graphics */}
    <rect x="150" y="145" width="180" height="10" rx="3" fill="#6366F1" opacity="0.8" />
    <rect x="340" y="145" width="110" height="10" rx="3" fill="#06B6D4" opacity="0.7" />

    <rect x="170" y="170" width="220" height="8" rx="2" fill="#38BDF8" opacity="0.5" />
    <rect x="400" y="170" width="140" height="8" rx="2" fill="#A855F7" opacity="0.6" />

    <rect x="170" y="190" width="280" height="8" rx="2" fill="#10B981" opacity="0.5" />

    <rect x="190" y="210" width="160" height="8" rx="2" fill="#F59E0B" opacity="0.6" />

    {/* Nested Status Card */}
    <rect x="170" y="240" width="460" height="140" rx="8" fill="#090D16" stroke="#334155" strokeWidth="1" />
    <rect x="190" y="260" width="120" height="24" rx="12" fill="#065F46" />
    <text x="210" y="276" fill="#34D399" fontSize="11" fontFamily="sans-serif" fontWeight="700">SUBMISSION APPROVED</text>

    <text x="190" y="310" fill="#F8FAFC" fontSize="15" fontFamily="sans-serif" fontWeight="700">Full Stack MERN Community Platform</text>
    <text x="190" y="330" fill="#94A3B8" fontSize="12" fontFamily="sans-serif">React 19 • Node.js • Express • MongoDB Atlas • JWT Auth</text>

    <defs>
      <linearGradient id="bg_gradient" x1="0" y1="0" x2="800" y2="500" gradientUnits="userSpaceOnUse">
        <stop stopColor="#6366F1" />
        <stop offset="0.5" stopColor="#06B6D4" />
        <stop offset="1" stopColor="#0F172A" />
      </linearGradient>
    </defs>
  </svg>
);

export const GlobalCohortMapGraphic: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => (
  <svg className={className} viewBox="0 0 700 350" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="700" height="350" rx="16" fill="#0B132B" />

    {/* Map Grid Dots */}
    <g opacity="0.2">
      {Array.from({ length: 14 }).map((_, row) =>
        Array.from({ length: 28 }).map((_, col) => (
          <circle key={`dot_${row}_${col}`} cx={col * 25 + 12} cy={row * 25 + 12} r="1.5" fill="#38BDF8" />
        ))
      )}
    </g>

    {/* Connected Hub Beacons */}
    <g>
      {/* North America */}
      <circle cx="210" cy="110" r="6" fill="#6366F1" />
      <circle cx="210" cy="110" r="16" stroke="#6366F1" strokeWidth="1.5" opacity="0.5" />

      {/* Europe */}
      <circle cx="360" cy="95" r="6" fill="#06B6D4" />
      <circle cx="360" cy="95" r="16" stroke="#06B6D4" strokeWidth="1.5" opacity="0.5" />

      {/* Africa / Nigeria */}
      <circle cx="370" cy="190" r="7" fill="#10B981" />
      <circle cx="370" cy="190" r="20" stroke="#10B981" strokeWidth="1.5" opacity="0.6" />

      {/* India */}
      <circle cx="490" cy="160" r="7" fill="#F59E0B" />
      <circle cx="490" cy="160" r="22" stroke="#F59E0B" strokeWidth="1.5" opacity="0.6" />

      {/* East Asia */}
      <circle cx="580" cy="140" r="6" fill="#EC4899" />

      {/* South America */}
      <circle cx="270" cy="220" r="6" fill="#8B5CF6" />
    </g>

    {/* Connection Arcs */}
    <path d="M210 110 Q 285 60 360 95" stroke="#6366F1" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />
    <path d="M360 95 Q 365 142 370 190" stroke="#06B6D4" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />
    <path d="M370 190 Q 430 140 490 160" stroke="#10B981" strokeWidth="2" opacity="0.8" />
    <path d="M490 160 Q 535 120 580 140" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />

    {/* Legend Box */}
    <rect x="20" y="270" width="660" height="60" rx="8" fill="#1C2541" stroke="#3A506B" strokeWidth="1" />
    <text x="40" y="305" fill="#F8FAFC" fontSize="13" fontFamily="sans-serif" fontWeight="700">45+ Countries Connected</text>
    <text x="210" y="305" fill="#94A3B8" fontSize="12" fontFamily="sans-serif">• Daily Assignments Synchronized Across All Timezones</text>
  </svg>
);

export const EmptyStateGraphic: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-md">
    <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4 text-indigo-400">
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    </div>
    <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
    <p className="text-sm text-slate-400 max-w-sm">{subtitle}</p>
  </div>
);
