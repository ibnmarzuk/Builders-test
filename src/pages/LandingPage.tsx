import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CodeMatrixGraphic, GlobalCohortMapGraphic } from '../components/common/Graphics';
import {
  Code2,
  Trophy,
  Users,
  Globe,
  Sparkles,
  ChevronDown,
  ArrowRight,
  Calendar,
  CheckCircle2,
  BookOpen
} from 'lucide-react';

export const LandingPage: React.FC<{ setActiveTab: (tab: string) => void }> = ({ setActiveTab }) => {
  const { isAuthenticated } = useAuth();
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is Builders Build?',
      a: 'Builders Build is an intensive cohort-based community program where participants from over 45 countries learn full stack engineering by shipping real production software, completing daily assignments, and reviewing peer projects.'
    },
    {
      q: 'How long does each cohort last?',
      a: 'Each cohort runs for 30 consecutive days. Every morning a new assignment is released with instructions, design specs, and API requirements. Participants submit their project GitHub repositories before midnight.'
    },
    {
      q: 'Is MongoDB Atlas required for this platform?',
      a: 'The platform integrates natively with MongoDB Atlas using Mongoose models. If no Atlas URI is provided, the hub automatically operates with an in-memory database engine pre-loaded with cohort seed data.'
    },
    {
      q: 'How are project submissions evaluated?',
      a: 'Organizers and mentors review submitted GitHub repos and live demo links. Submissions receive point rewards based on code quality, responsiveness, and functional completeness, updating the cohort leaderboard in real time.'
    },
    {
      q: 'Can I switch between Admin and Builder roles in demo mode?',
      a: 'Yes! Click the role switcher pill in the navigation header at any time to test the platform as either a Cohort Participant or an Admin Organizer.'
    }
  ];

  return (
    <div className="w-full bg-[#090909] text-[#F5F2EE] font-sans overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 px-6 lg:px-12 max-w-[1200px] mx-auto">
        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
          {/* Section Label */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111111] border border-[#2A2A2A] text-[#C8A86B] text-xs font-semibold tracking-[0.25em] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#C8A86B]" />
            <span>Cohort 5 Active • 450+ Builders Enrolled</span>
          </div>

          {/* Main Editorial Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-[#F5F2EE] leading-[1.1]">
            From Prompting to Prototype <br />
            <span className="italic font-normal text-[#C8A86B]">Ship Production Products in 30 Days</span>
          </h1>

          <p className="text-lg sm:text-xl text-[#A3A3A3] max-w-2xl mx-auto font-sans leading-relaxed">
            Master agentic workflows, PRD spec-prompting, full-stack generation, and cloud deployment. Master the art of converting natural language prompts into live, production-grade SaaS prototypes.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            {isAuthenticated ? (
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className="px-8 py-4 rounded-full bg-[#F5F2EE] text-[#090909] font-medium text-sm hover:bg-white transition-all shadow-sm flex items-center gap-2"
                >
                  Enter My Dashboard <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveTab('register')}
                  className="px-8 py-4 rounded-full bg-[#111111] border border-[#2A2A2A] hover:border-[#C8A86B] text-[#F5F2EE] font-medium text-sm transition-all flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-[#C8A86B]" /> Sign Up New Builder
                </button>
                <button
                  onClick={() => setActiveTab('login')}
                  className="px-8 py-4 rounded-full bg-[#111111] border border-[#2A2A2A] hover:border-[#F5F2EE]/40 text-[#A3A3A3] hover:text-[#F5F2EE] font-medium text-sm transition-all flex items-center gap-2"
                >
                  Switch / Log In
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => setActiveTab('login')}
                  className="px-8 py-4 rounded-full bg-[#F5F2EE] text-[#090909] font-medium text-sm hover:bg-white transition-all shadow-sm flex items-center gap-2"
                >
                  <ArrowRight className="w-4 h-4" /> Builder Log In
                </button>
                <button
                  onClick={() => setActiveTab('register')}
                  className="px-8 py-4 rounded-full bg-[#111111] border border-[#2A2A2A] hover:border-[#C8A86B] text-[#F5F2EE] font-medium text-sm transition-all flex items-center gap-2"
                >
                  Sign Up as Builder
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Hero Interactive Graphic Card */}
        <div className="mt-20 max-w-5xl mx-auto rounded-lg border border-[#2A2A2A] bg-[#111111] p-3 shadow-2xl">
          <CodeMatrixGraphic />
        </div>
      </section>

      {/* About Section */}
      <section className="py-28 bg-[#111111] border-y border-[#2A2A2A]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-16 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#C8A86B]">SECTION 01 // PHILOSOPHY</span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#F5F2EE]">Designed for Action, Not Just Tutorials</h2>
            <p className="text-[#A3A3A3] text-base leading-relaxed font-sans">
              Tutorial hell stops here. In Builders Build, learning happens by writing code, deploying live links, and earning peer validation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-10 rounded-lg bg-[#151515] border border-[#2A2A2A] hover:border-[#C8A86B]/40 transition-all space-y-4">
              <div className="w-10 h-10 rounded-lg bg-[#111111] border border-[#2A2A2A] flex items-center justify-center text-[#C8A86B]">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#F5F2EE]">Daily Assignments</h3>
              <p className="text-xs text-[#A3A3A3] leading-relaxed font-sans">
                Structured prompts covering React, Express, REST APIs, MongoDB schemas, and JWT protection released every 24 hours.
              </p>
            </div>

            <div className="p-10 rounded-lg bg-[#151515] border border-[#2A2A2A] hover:border-[#C8A86B]/40 transition-all space-y-4">
              <div className="w-10 h-10 rounded-lg bg-[#111111] border border-[#2A2A2A] flex items-center justify-center text-[#C8A86B]">
                <Trophy className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#F5F2EE]">Real-Time Leaderboard</h3>
              <p className="text-xs text-[#A3A3A3] leading-relaxed font-sans">
                Gamified point system tracking completion streaks, code quality ratings, and global builder rankings.
              </p>
            </div>

            <div className="p-10 rounded-lg bg-[#151515] border border-[#2A2A2A] hover:border-[#C8A86B]/40 transition-all space-y-4">
              <div className="w-10 h-10 rounded-lg bg-[#111111] border border-[#2A2A2A] flex items-center justify-center text-[#C8A86B]">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#F5F2EE]">Mentor Code Reviews</h3>
              <p className="text-xs text-[#A3A3A3] leading-relaxed font-sans">
                Organizers approve project submissions, provide direct feedback, and highlight top build demos to the entire community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Learning Journey Timeline */}
      <section className="py-28 max-w-[1200px] mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mb-16 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#C8A86B]">SECTION 02 // ROADMAP</span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#F5F2EE]">30-Day Cohort Blueprint</h2>
          <p className="text-[#A3A3A3] text-base font-sans">
            A battle-tested 30-day curriculum designed exclusively around shipping products from initial prompt specification to live cloud prototype.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-8 rounded-lg bg-[#111111] border border-[#2A2A2A] space-y-4 hover:border-[#C8A86B]/40 transition-colors">
            <span className="text-xs font-semibold text-[#C8A86B] uppercase tracking-widest">Days 1 - 7</span>
            <h3 className="text-lg font-serif font-bold text-[#F5F2EE]">Prompting & Architecture Specs</h3>
            <ul className="text-xs text-[#A3A3A3] space-y-2.5 font-sans">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#C8A86B] shrink-0" /> PRD & System Prompting</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#C8A86B] shrink-0" /> AI Spec-Driven Layouts</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#C8A86B] shrink-0" /> Schema & REST Controller Prompts</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#C8A86B] shrink-0" /> Day 7 MVP Prototype Ship</li>
            </ul>
          </div>

          <div className="p-8 rounded-lg bg-[#111111] border border-[#2A2A2A] space-y-4 hover:border-[#C8A86B]/40 transition-colors">
            <span className="text-xs font-semibold text-[#C8A86B] uppercase tracking-widest">Days 8 - 15</span>
            <h3 className="text-lg font-serif font-bold text-[#F5F2EE]">Deep Logic & Integration</h3>
            <ul className="text-xs text-[#A3A3A3] space-y-2.5 font-sans">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#C8A86B] shrink-0" /> Prompt Refactoring & Debugging</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#C8A86B] shrink-0" /> Auth, JWT & Route Guarding</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#C8A86B] shrink-0" /> AI SDK & External API Prompts</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#C8A86B] shrink-0" /> Feature-Complete Alpha Build</li>
            </ul>
          </div>

          <div className="p-8 rounded-lg bg-[#111111] border border-[#2A2A2A] space-y-4 hover:border-[#C8A86B]/40 transition-colors">
            <span className="text-xs font-semibold text-[#C8A86B] uppercase tracking-widest">Days 16 - 22</span>
            <h3 className="text-lg font-serif font-bold text-[#F5F2EE]">Editorial Design & Anti-Slop</h3>
            <ul className="text-xs text-[#A3A3A3] space-y-2.5 font-sans">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#C8A86B] shrink-0" /> Editorial UI & Custom Typography</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#C8A86B] shrink-0" /> Framer Motion Micro-Interactions</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#C8A86B] shrink-0" /> Mobile Responsiveness Tuning</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#C8A86B] shrink-0" /> Beta Candidate Prototype Lock</li>
            </ul>
          </div>

          <div className="p-8 rounded-lg bg-[#111111] border border-[#2A2A2A] space-y-4 hover:border-[#C8A86B]/40 transition-colors">
            <span className="text-xs font-semibold text-[#C8A86B] uppercase tracking-widest">Days 23 - 30</span>
            <h3 className="text-lg font-serif font-bold text-[#F5F2EE]">Cloud Launch & Showcase</h3>
            <ul className="text-xs text-[#A3A3A3] space-y-2.5 font-sans">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#C8A86B] shrink-0" /> Docker & Container Verification</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#C8A86B] shrink-0" /> Cloud Run Live Deployment</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#C8A86B] shrink-0" /> Community Pitch & Peer Review</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#C8A86B] shrink-0" /> Live Prototype Graduation</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Global Community Statistics Map */}
      <section className="py-28 bg-[#111111] border-t border-[#2A2A2A]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#C8A86B]">SECTION 03 // GLOBAL IMPACT</span>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#F5F2EE] leading-tight">
                Connecting Builders Across 45+ Countries
              </h2>
              <p className="text-[#A3A3A3] text-base leading-relaxed font-sans">
                Whether you are coding from Lagos, New Delhi, Tokyo, Berlin, or San Francisco, the Builders Build hub keeps every participant synced on assignments, office hours, and project reviews.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-6 rounded-lg bg-[#151515] border border-[#2A2A2A]">
                  <div className="text-3xl font-serif font-bold text-[#F5F2EE]">600+</div>
                  <div className="text-xs text-[#A3A3A3] mt-1 font-sans">Total Participants</div>
                </div>
                <div className="p-6 rounded-lg bg-[#151515] border border-[#2A2A2A]">
                  <div className="text-3xl font-serif font-bold text-[#F5F2EE]">1,250+</div>
                  <div className="text-xs text-[#A3A3A3] mt-1 font-sans">Projects Shipped</div>
                </div>
                <div className="p-6 rounded-lg bg-[#151515] border border-[#2A2A2A]">
                  <div className="text-3xl font-serif font-bold text-[#F5F2EE]">96%</div>
                  <div className="text-xs text-[#A3A3A3] mt-1 font-sans">Assignment Pass Rate</div>
                </div>
                <div className="p-6 rounded-lg bg-[#151515] border border-[#2A2A2A]">
                  <div className="text-3xl font-serif font-bold text-[#F5F2EE]">24/7</div>
                  <div className="text-xs text-[#A3A3A3] mt-1 font-sans">Telegram Community</div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-[#2A2A2A] bg-[#090909] overflow-hidden shadow-2xl">
              <GlobalCohortMapGraphic />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-28 max-w-[1200px] mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mb-16 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#C8A86B]">SECTION 04 // ALUMNI VOICES</span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#F5F2EE]">What Cohort Alumni Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-lg bg-[#111111] border border-[#2A2A2A] space-y-5">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                alt="Alex Rivera"
                className="w-10 h-10 rounded-full border border-[#C8A86B]/40 object-cover"
              />
              <div>
                <h3 className="text-sm font-semibold text-[#F5F2EE]">Alex Rivera</h3>
                <p className="text-xs text-[#A3A3A3]">Cohort 4 • Nigeria</p>
              </div>
            </div>
            <p className="text-xs text-[#A3A3A3] leading-relaxed font-sans italic">
              "The daily discipline of shipping a project before midnight completely transformed my coding speed. The peer reviews and leaderboard kept me accountable every single day."
            </p>
          </div>

          <div className="p-8 rounded-lg bg-[#111111] border border-[#2A2A2A] space-y-5">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
                alt="Priya Sharma"
                className="w-10 h-10 rounded-full border border-[#C8A86B]/40 object-cover"
              />
              <div>
                <h3 className="text-sm font-semibold text-[#F5F2EE]">Priya Sharma</h3>
                <p className="text-xs text-[#A3A3A3]">Cohort 4 • India</p>
              </div>
            </div>
            <p className="text-xs text-[#A3A3A3] leading-relaxed font-sans italic">
              "I landed my full stack software developer job 2 weeks after finishing Builders Build. Having 6 deployed full stack projects in my portfolio was the key difference."
            </p>
          </div>

          <div className="p-8 rounded-lg bg-[#111111] border border-[#2A2A2A] space-y-5">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
                alt="Mateo Rossi"
                className="w-10 h-10 rounded-full border border-[#C8A86B]/40 object-cover"
              />
              <div>
                <h3 className="text-sm font-semibold text-[#F5F2EE]">Mateo Rossi</h3>
                <p className="text-xs text-[#A3A3A3]">Cohort 4 • Brazil</p>
              </div>
            </div>
            <p className="text-xs text-[#A3A3A3] leading-relaxed font-sans italic">
              "The MERN architecture taught in Builders Build is crystal clear. Being able to see how organizers manage announcements and reviews in one central hub is awesome."
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-28 bg-[#111111] border-t border-[#2A2A2A]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#C8A86B]">SECTION 05 // FAQ</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#F5F2EE]">Everything You Need to Know</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-lg bg-[#151515] border border-[#2A2A2A] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left font-serif font-bold text-[#F5F2EE] text-base hover:text-[#C8A86B] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#A3A3A3] transition-transform duration-300 ${
                      activeFaq === idx ? 'rotate-180 text-[#C8A86B]' : ''
                    }`}
                  />
                </button>
                {activeFaq === idx && (
                  <div className="px-6 pb-6 text-xs text-[#A3A3A3] leading-relaxed border-t border-[#2A2A2A] pt-4 font-sans">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-28 px-6 lg:px-12 max-w-[1200px] mx-auto">
        <div className="p-12 rounded-lg bg-[#111111] border border-[#2A2A2A] text-center space-y-6 relative overflow-hidden">
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#F5F2EE]">
            Ready to Build and Ship Production Software?
          </h2>
          <p className="text-sm text-[#A3A3A3] max-w-xl mx-auto font-sans leading-relaxed">
            Log in to your builder dashboard, complete daily assignments, review peer builds, and track cohort leaderboard standings.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setActiveTab('register')}
              className="px-8 py-4 rounded-full bg-[#F5F2EE] text-[#090909] font-medium text-sm hover:bg-white transition-all shadow-sm flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#C8A86B]" /> Sign Up as Builder
            </button>
            <button
              onClick={() => setActiveTab('login')}
              className="px-8 py-4 rounded-full bg-[#151515] border border-[#2A2A2A] hover:border-[#C8A86B] text-[#F5F2EE] font-medium text-sm transition-all flex items-center gap-2"
            >
              Builder Log In
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
