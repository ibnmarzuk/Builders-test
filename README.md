# Builders Build Community Hub

The central full-stack MERN platform for managing the **Builders Build** cohort community, daily assignments, announcements, project submissions, leaderboards, and participant management.

---

## 🚀 Features

### 1. User Authentication & Authorization
* **JWT & bcryptjs Encryption**: Secure registration, login, and token generation.
* **Role-Based Access Control**: Protected user dashboards and admin command centers.
* **1-Click Demo Switcher**: Instant switching between Builder and Admin roles.

### 2. Modern Landing Page
* **Hero & Cohort Badge**: High-impact introduction to Cohort 5.
* **Daily Learning Journey**: Interactive Day 1 – Day 30 curriculum roadmap.
* **Feature Bento Grid & Statistics**: Real-time stats across 45+ countries with SVG vector graphics.
* **Testimonials & FAQ Accordion**: Common questions and builder success stories.

### 3. User Dashboard
* **Today's Assignment Widget**: Active prompt, difficulty tags, resource links, and countdown timers.
* **Submission Tracker**: Live status of submitted GitHub repos and live demos (Pending, Approved, Rejected).
* **Broadcast Feed**: Announcements and upcoming live office hours schedule.

### 4. Admin Command Center
* **Analytics Tower**: Total builders, active assignments, pending submission queue, and country distribution.
* **Assignments CRUD**: Full publish, edit, and delete tools for curriculum assignments.
* **Announcements CRUD**: Broadcast feed with Markdown and category tagging.
* **Submission Review Queue**: Review code repositories, assign point rewards, and provide mentor feedback.
* **Participant Directory**: Directory management across countries and cohorts.

---

## 🛠 Tech Stack

* **Frontend**: React 19, Tailwind CSS v4, Lucide Icons, Axios, Motion
* **Backend**: Node.js, Express.js REST API
* **Database**: MongoDB Atlas via Mongoose (with in-memory engine fallback)
* **Authentication**: JSON Web Tokens (JWT) & bcryptjs

---

## 💻 Installation & Setup Guide

### Prerequisites
* Node.js (v18+ recommended)
* npm / yarn

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/your-username/builders-build-hub.git
cd builders-build-hub
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```env
MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.mongodb.net/builders_build?retryWrites=true&w=majority"
JWT_SECRET="your_custom_secure_jwt_secret_key"
```
> **Note**: If `MONGODB_URI` is omitted or invalid, the app automatically runs in local in-memory database mode with seed data so you can test immediately.

### 3. Run in Development Mode
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
├── server.ts                 # Express entry point & Vite middleware
├── server/
│   ├── config/db.ts          # MongoDB Atlas Mongoose connection & fallback engine
│   ├── models/               # Mongoose Schemas (User, Assignment, Announcement, Submission, Participant)
│   ├── middleware/auth.ts    # JWT token verification & admin guards
│   ├── routes/               # REST API Endpoints (/api/auth, /api/assignments, etc.)
│   ├── seedData.ts           # Cohort seed dataset
│   └── store.ts              # Hybrid Atlas + Memory database controller
├── src/
│   ├── components/           # Navbar, Footer, Modal, StatCard, Graphics, Toast
│   ├── context/AuthContext   # Global auth state & demo switcher
│   ├── pages/                # LandingPage, UserDashboard, AdminDashboard, etc.
│   ├── services/api.ts       # Axios client
│   ├── types.ts              # TypeScript definitions
│   └── App.tsx               # Main application shell
└── package.json
```
