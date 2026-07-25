export const INITIAL_USERS = [
  {
    _id: 'usr_admin_1',
    name: 'Sarah Connor (Admin)',
    email: 'admin@buildersbuild.com',
    passwordHash: '$2a$10$wT/fGqA4N6mFmX.J3p2A3.3eN/qfD0K.k1Z9q3A4N6mFmX.J3p2A3', // bcrypt hash for 'admin123'
    role: 'admin',
    telegramUsername: '@sarah_builds',
    country: 'United States',
    cohort: 'Cohort 5',
    progress: 100,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    createdAt: new Date('2026-01-01').toISOString(),
  },
  {
    _id: 'usr_builder_1',
    name: 'Alex Rivera',
    email: 'alex@buildersbuild.com',
    passwordHash: '$2a$10$xU/gHrB5O7nGnY.K4q3B4.4fO/rgE1L.l2A0r4B5O7nGnY.K4q3B4', // bcrypt hash for 'builder123'
    role: 'participant',
    telegramUsername: '@alex_rivera_code',
    country: 'Nigeria',
    cohort: 'Cohort 5',
    progress: 85,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    createdAt: new Date('2026-02-10').toISOString(),
  },
  {
    _id: 'usr_builder_2',
    name: 'Priya Sharma',
    email: 'priya@buildersbuild.com',
    passwordHash: '$2a$10$xU/gHrB5O7nGnY.K4q3B4.4fO/rgE1L.l2A0r4B5O7nGnY.K4q3B4',
    role: 'participant',
    telegramUsername: '@priyacodes',
    country: 'India',
    cohort: 'Cohort 5',
    progress: 92,
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    createdAt: new Date('2026-02-12').toISOString(),
  }
];

export const INITIAL_ASSIGNMENTS = [
  {
    _id: 'asg_1',
    dayNumber: 1,
    title: 'PRD Specification & System Prompting for MVPs',
    description: 'Draft a comprehensive Product Requirements Document (PRD) and translate it into system prompts for AI coding agents. Define component hierarchies, state models, and design tokens.',
    dueDate: '2026-07-26T23:59:59.000Z',
    difficulty: 'Easy',
    resources: [
      'https://promptingguide.ai',
      'https://react.dev/learn',
      'https://tailwindcss.com/docs'
    ],
    status: 'Completed',
    points: 100,
    createdAt: new Date('2026-07-20').toISOString(),
  },
  {
    _id: 'asg_2',
    dayNumber: 2,
    title: 'AI Spec-Driven UI Architecture & Component Generation',
    description: 'Prompt and assemble an editorial, high-contrast React + Tailwind UI layout. Ensure typography hierarchies, modular file structure, and accessible color tokens are strictly preserved.',
    dueDate: '2026-07-28T23:59:59.000Z',
    difficulty: 'Medium',
    resources: [
      'https://lucide.dev',
      'https://motion.dev/docs',
      'https://tailwindcss.com/docs'
    ],
    status: 'Active',
    points: 150,
    createdAt: new Date('2026-07-21').toISOString(),
  },
  {
    _id: 'asg_3',
    dayNumber: 3,
    title: 'Express REST Backend & Database Schema Prompting',
    description: 'Guide an AI agent to build Express REST API controllers, MongoDB/Mongoose schemas, and error handling middleware for rapid backend prototype integration.',
    dueDate: '2026-07-30T23:59:59.000Z',
    difficulty: 'Hard',
    resources: [
      'https://mongoosejs.com/docs/guide.html',
      'https://expressjs.com'
    ],
    status: 'Active',
    points: 200,
    createdAt: new Date('2026-07-22').toISOString(),
  },
  {
    _id: 'asg_4',
    dayNumber: 4,
    title: 'Auth Guarding & Prompt-Driven Security Testing',
    description: 'Prompt secure JWT authentication, password hashing with bcrypt, and role protection. Implement automated unit checks to verify route security.',
    dueDate: '2026-08-02T23:59:59.000Z',
    difficulty: 'Medium',
    resources: [
      'https://jwt.io/introduction',
      'https://github.com/dherault/bcryptjs'
    ],
    status: 'Draft',
    points: 180,
    createdAt: new Date('2026-07-23').toISOString(),
  },
  {
    _id: 'asg_5',
    dayNumber: 5,
    title: 'Framer Motion Transitions & Anti-Slop UI Polish',
    description: 'Eliminate default AI templates by prompting customized micro-interactions, page transitions, and dark luxury editorial design systems.',
    dueDate: '2026-08-04T23:59:59.000Z',
    difficulty: 'Medium',
    resources: [
      'https://motion.dev/docs',
      'https://tailwindcss.com/docs'
    ],
    status: 'Draft',
    points: 190,
    createdAt: new Date('2026-07-24').toISOString(),
  },
  {
    _id: 'asg_6',
    dayNumber: 6,
    title: 'Containerization, Cloud Deployment & Live Prototype Shipping',
    description: 'Package your prompt-built full-stack application with Docker and deploy to Cloud Run. Verify live prototype URLs and prepare for Demo Day showcase.',
    dueDate: '2026-08-06T23:59:59.000Z',
    difficulty: 'Hard',
    resources: [
      'https://cloud.google.com/run/docs',
      'https://docs.docker.com'
    ],
    status: 'Draft',
    points: 250,
    createdAt: new Date('2026-07-24').toISOString(),
  }
];

export const INITIAL_ANNOUNCEMENTS = [
  {
    _id: 'anc_1',
    title: 'Welcome to Builders Build Cohort 5!',
    content: 'We are thrilled to welcome over 450 builders from 32 countries! Get ready for 30 intensive days of building, shipping, and accelerating your developer journey.',
    date: '2026-07-20T10:00:00.000Z',
    category: 'General',
    authorName: 'Sarah Connor',
    isPinned: true
  },
  {
    _id: 'anc_2',
    title: 'Live Workshop: Building SaaS MVPs in 48 Hours',
    content: 'Join our senior mentor session this Thursday at 16:00 UTC. We will cover rapid prototyping, boilerplate setup, and deployment strategies on Cloud Run.',
    date: '2026-07-22T14:30:00.000Z',
    category: 'Event',
    authorName: 'Sarah Connor',
    isPinned: false
  },
  {
    _id: 'anc_3',
    title: 'Assignment #2 Deadline Extension & Office Hours',
    content: 'Due to requests from builders in Asia-Pacific timezones, Assignment #2 deadline is extended by 12 hours. Join Discord voice channel #office-hours for 1-on-1 debug assistance.',
    date: '2026-07-24T09:15:00.000Z',
    category: 'Urgent',
    authorName: 'Alex Rivera',
    isPinned: true
  }
];

export const INITIAL_PARTICIPANTS = [
  {
    _id: 'part_1',
    name: 'Priya Sharma',
    email: 'priya@buildersbuild.com',
    telegramUsername: '@priyacodes',
    country: 'India',
    cohort: 'Cohort 5',
    progress: 95,
    completedAssignments: 4,
    totalPoints: 530,
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    joinedDate: '2026-07-15T00:00:00.000Z'
  },
  {
    _id: 'part_2',
    name: 'Alex Rivera',
    email: 'alex@buildersbuild.com',
    telegramUsername: '@alex_rivera_code',
    country: 'Nigeria',
    cohort: 'Cohort 5',
    progress: 88,
    completedAssignments: 3,
    totalPoints: 450,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    joinedDate: '2026-07-16T00:00:00.000Z'
  },
  {
    _id: 'part_3',
    name: 'Mateo Rossi',
    email: 'mateo@buildersbuild.com',
    telegramUsername: '@mateobuilds',
    country: 'Brazil',
    cohort: 'Cohort 5',
    progress: 82,
    completedAssignments: 3,
    totalPoints: 410,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    joinedDate: '2026-07-16T00:00:00.000Z'
  },
  {
    _id: 'part_4',
    name: 'Yuki Tanaka',
    email: 'yuki@buildersbuild.com',
    telegramUsername: '@yukidev',
    country: 'Japan',
    cohort: 'Cohort 5',
    progress: 90,
    completedAssignments: 4,
    totalPoints: 490,
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    joinedDate: '2026-07-17T00:00:00.000Z'
  },
  {
    _id: 'part_5',
    name: 'Elena Rostova',
    email: 'elena@buildersbuild.com',
    telegramUsername: '@elena_tech',
    country: 'Germany',
    cohort: 'Cohort 5',
    progress: 78,
    completedAssignments: 2,
    totalPoints: 340,
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    joinedDate: '2026-07-18T00:00:00.000Z'
  },
  {
    _id: 'part_6',
    name: 'David Kim',
    email: 'david@buildersbuild.com',
    telegramUsername: '@dkim_builds',
    country: 'South Korea',
    cohort: 'Cohort 5',
    progress: 85,
    completedAssignments: 3,
    totalPoints: 420,
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    joinedDate: '2026-07-18T00:00:00.000Z'
  }
];

export const INITIAL_SUBMISSIONS = [
  {
    _id: 'sub_1',
    projectName: 'DevPulse - Community Activity Tracker',
    description: 'A full-stack dashboard built with React, Express, and Tailwind CSS to measure GitHub commit velocity and peer code reviews.',
    githubRepo: 'https://github.com/alexrivera/devpulse-hub',
    liveDemo: 'https://devpulse-demo.run.app',
    screenshot: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
    submittedBy: {
      _id: 'usr_builder_1',
      name: 'Alex Rivera',
      email: 'alex@buildersbuild.com',
      telegramUsername: '@alex_rivera_code',
      country: 'Nigeria',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    },
    assignmentId: 'asg_1',
    assignmentTitle: 'Full Stack MERN Architecture & Setup',
    submissionDate: '2026-07-21T18:20:00.000Z',
    status: 'Approved',
    feedback: 'Excellent clean directory layout and Express API error handling! Great job on the live demo.',
    pointsAwarded: 100
  },
  {
    _id: 'sub_2',
    projectName: 'CryptoGuard Auth System',
    description: 'Secure JWT authentication flow featuring password salting, role-based route middleware, and animated login UI.',
    githubRepo: 'https://github.com/priyasharma/cryptoguard-auth',
    liveDemo: 'https://cryptoguard.dev',
    screenshot: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80',
    submittedBy: {
      _id: 'usr_builder_2',
      name: 'Priya Sharma',
      email: 'priya@buildersbuild.com',
      telegramUsername: '@priyacodes',
      country: 'India',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    },
    assignmentId: 'asg_2',
    assignmentTitle: 'JWT Authentication & Role Protection',
    submissionDate: '2026-07-23T11:45:00.000Z',
    status: 'Approved',
    feedback: 'Flawless JWT verification and role guard implementation. Highly secure architecture!',
    pointsAwarded: 150
  },
  {
    _id: 'sub_3',
    projectName: 'Builders Hub REST API Engine',
    description: 'Comprehensive Express REST API with MongoDB Mongoose schemas for managing assignments, submissions, and student scores.',
    githubRepo: 'https://github.com/alexrivera/builders-rest-api',
    liveDemo: 'https://builders-api.dev',
    screenshot: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
    submittedBy: {
      _id: 'usr_builder_1',
      name: 'Alex Rivera',
      email: 'alex@buildersbuild.com',
      telegramUsername: '@alex_rivera_code',
      country: 'Nigeria',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    },
    assignmentId: 'asg_3',
    assignmentTitle: 'RESTful CRUD Modules & MongoDB Schemas',
    submissionDate: '2026-07-24T15:10:00.000Z',
    status: 'Pending',
    feedback: '',
    pointsAwarded: 0
  }
];
