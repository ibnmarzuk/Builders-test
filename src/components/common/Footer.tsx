import React from 'react';
import { Code2, Heart, Github, Twitter, MessageSquare } from 'lucide-react';

export const Footer: React.FC<{ setActiveTab: (tab: string) => void }> = () => {
  return (
    <footer className="w-full bg-[#090909] border-t border-[#2A2A2A] text-[#A3A3A3] text-sm py-16 px-6 lg:px-12">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
        {/* Brand Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#151515] border border-[#2A2A2A] flex items-center justify-center text-[#C8A86B]">
              <Code2 className="w-4 h-4" />
            </div>
            <span className="font-serif font-bold text-[#F5F2EE] text-lg tracking-wide">BUILDERS BUILD</span>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded bg-[#151515] text-[#C8A86B] border border-[#2A2A2A]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8A86B] animate-pulse"></span>
              Cohort 5 Active
            </span>
          </div>
          <p className="text-xs text-[#A3A3A3] max-w-md font-sans leading-relaxed">
            The premier global community hub for full stack engineering cohorts. Build real MVPs, submit daily assignments, and rank on the global leaderboard.
          </p>
        </div>

        {/* Community & Social Links */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-lg bg-[#111111] border border-[#2A2A2A] text-[#A3A3A3] hover:border-[#C8A86B] hover:text-[#F5F2EE] transition-all"
            title="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-lg bg-[#111111] border border-[#2A2A2A] text-[#A3A3A3] hover:border-[#C8A86B] hover:text-[#F5F2EE] transition-all"
            title="Twitter"
          >
            <Twitter className="w-4 h-4" />
          </a>
          <a
            href="https://t.me"
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-lg bg-[#111111] border border-[#2A2A2A] text-[#A3A3A3] hover:border-[#C8A86B] hover:text-[#F5F2EE] transition-all"
            title="Telegram"
          >
            <MessageSquare className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto pt-8 border-t border-[#2A2A2A] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A3A3A3]/70 font-sans">
        <div>© 2026 Builders Build Community Program. All rights reserved.</div>
        <div className="flex items-center gap-1">
          Crafted with <Heart className="w-3.5 h-3.5 text-[#C8A86B] fill-[#C8A86B]" /> for Builders Worldwide
        </div>
      </div>
    </footer>
  );
};
