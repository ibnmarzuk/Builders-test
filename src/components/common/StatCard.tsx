import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: string;
  color?: 'indigo' | 'emerald' | 'cyan' | 'amber' | 'rose';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
}) => {
  return (
    <div className="p-6 rounded-lg bg-[#111111] border border-[#2A2A2A] hover:border-[#C8A86B]/40 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] font-semibold text-[#C8A86B] uppercase tracking-[0.2em]">{title}</span>
        <div className="p-2.5 rounded-lg bg-[#151515] border border-[#2A2A2A] text-[#C8A86B]">
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="flex items-baseline justify-between">
        <div className="text-3xl font-serif font-bold text-[#F5F2EE] tracking-tight">{value}</div>
        {trend && (
          <span className="text-[10px] font-semibold tracking-wider uppercase text-[#C8A86B] bg-[#151515] px-2 py-0.5 rounded border border-[#2A2A2A]">
            {trend}
          </span>
        )}
      </div>
      {subtitle && <p className="text-xs text-[#A3A3A3] mt-2 font-sans">{subtitle}</p>}
    </div>
  );
};
