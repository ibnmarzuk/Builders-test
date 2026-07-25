import { isMongoConnected } from './config/db.js';
import { UserModel } from './models/User.js';
import { AssignmentModel } from './models/Assignment.js';
import { AnnouncementModel } from './models/Announcement.js';
import { SubmissionModel } from './models/Submission.js';
import { ParticipantModel } from './models/Participant.js';
import { INITIAL_USERS, INITIAL_ASSIGNMENTS, INITIAL_ANNOUNCEMENTS, INITIAL_PARTICIPANTS, INITIAL_SUBMISSIONS } from './seedData.js';

// In-Memory Fallback State
let memUsers = [...INITIAL_USERS];
let memAssignments = [...INITIAL_ASSIGNMENTS];
let memAnnouncements = [...INITIAL_ANNOUNCEMENTS];
let memParticipants = [...INITIAL_PARTICIPANTS];
let memSubmissions = [...INITIAL_SUBMISSIONS];

export const DB = {
  // USERS
  async findUserByEmail(email: string) {
    if (isMongoConnected()) {
      const doc: any = await (UserModel as any).findOne({ email: email.toLowerCase() }).lean();
      if (!doc) return null;
      return { ...doc, _id: doc._id.toString() };
    }
    const found = memUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    return found ? { ...found } : null;
  },

  async findUserById(id: string) {
    if (isMongoConnected()) {
      const doc: any = await (UserModel as any).findById(id).lean();
      if (!doc) return null;
      return { ...doc, _id: doc._id.toString() };
    }
    const found = memUsers.find(u => u._id === id);
    return found ? { ...found } : null;
  },

  async createUser(userData: any) {
    if (isMongoConnected()) {
      const created = await (UserModel as any).create({
        ...userData,
        email: userData.email.toLowerCase()
      });
      return { ...created.toObject(), _id: created._id.toString() };
    }
    const newUser = {
      _id: `usr_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      name: userData.name,
      email: userData.email.toLowerCase(),
      passwordHash: userData.passwordHash,
      role: userData.role || 'participant',
      telegramUsername: userData.telegramUsername || '',
      country: userData.country || 'Global',
      cohort: userData.cohort || 'Cohort 5',
      progress: userData.progress || 0,
      avatarUrl: userData.avatarUrl || `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`,
      createdAt: new Date().toISOString()
    };
    memUsers.push(newUser);

    // Also auto-create participant entry if participant
    if (newUser.role === 'participant') {
      const newPart = {
        _id: `part_${Date.now()}`,
        name: newUser.name,
        email: newUser.email,
        telegramUsername: newUser.telegramUsername || '@builder',
        country: newUser.country,
        cohort: newUser.cohort,
        progress: 0,
        completedAssignments: 0,
        totalPoints: 0,
        avatarUrl: newUser.avatarUrl,
        joinedDate: new Date().toISOString()
      };
      memParticipants.push(newPart);
    }
    return newUser;
  },

  async updateUserProfile(id: string, data: any) {
    if (isMongoConnected()) {
      const updated: any = await (UserModel as any).findByIdAndUpdate(
        id,
        { $set: data },
        { new: true }
      ).lean();
      if (!updated) return null;
      return { ...updated, _id: updated._id.toString() };
    }
    const idx = memUsers.findIndex(u => u._id === id);
    if (idx === -1) return null;
    memUsers[idx] = { ...memUsers[idx], ...data };

    // Also sync participant record if available
    const userEmail = memUsers[idx].email;
    const partIdx = memParticipants.findIndex(p => p.email.toLowerCase() === userEmail.toLowerCase());
    if (partIdx !== -1) {
      if (data.name) memParticipants[partIdx].name = data.name;
      if (data.telegramUsername) memParticipants[partIdx].telegramUsername = data.telegramUsername;
      if (data.country) memParticipants[partIdx].country = data.country;
      if (data.avatarUrl) memParticipants[partIdx].avatarUrl = data.avatarUrl;
    }
    return memUsers[idx];
  },

  // ASSIGNMENTS
  async getAssignments() {
    if (isMongoConnected()) {
      const docs: any[] = await (AssignmentModel as any).find().sort({ dayNumber: 1 }).lean();
      return docs.map(d => ({ ...d, _id: d._id.toString() }));
    }
    return [...memAssignments].sort((a, b) => a.dayNumber - b.dayNumber);
  },

  async createAssignment(data: any) {
    if (isMongoConnected()) {
      const created = await (AssignmentModel as any).create(data);
      return { ...created.toObject(), _id: created._id.toString() };
    }
    const newAssignment = {
      _id: `asg_${Date.now()}`,
      dayNumber: Number(data.dayNumber) || memAssignments.length + 1,
      title: data.title,
      description: data.description,
      dueDate: new Date(data.dueDate).toISOString(),
      difficulty: data.difficulty || 'Medium',
      resources: Array.isArray(data.resources) ? data.resources : (data.resources ? data.resources.split(',').map((s: string) => s.trim()) : []),
      status: data.status || 'Active',
      points: Number(data.points) || 100,
      createdAt: new Date().toISOString()
    };
    memAssignments.push(newAssignment);
    return newAssignment;
  },

  async updateAssignment(id: string, data: any) {
    if (isMongoConnected()) {
      const updated: any = await (AssignmentModel as any).findByIdAndUpdate(id, data, { new: true }).lean();
      return updated ? { ...updated, _id: updated._id.toString() } : null;
    }
    const idx = memAssignments.findIndex(a => a._id === id);
    if (idx === -1) return null;
    memAssignments[idx] = {
      ...memAssignments[idx],
      ...data,
      resources: Array.isArray(data.resources) ? data.resources : (typeof data.resources === 'string' ? data.resources.split(',').map((s: string) => s.trim()) : memAssignments[idx].resources)
    };
    return memAssignments[idx];
  },

  async deleteAssignment(id: string) {
    if (isMongoConnected()) {
      const res = await (AssignmentModel as any).findByIdAndDelete(id);
      return !!res;
    }
    const initialLen = memAssignments.length;
    memAssignments = memAssignments.filter(a => a._id !== id);
    return memAssignments.length < initialLen;
  },

  // ANNOUNCEMENTS
  async getAnnouncements() {
    if (isMongoConnected()) {
      const docs: any[] = await (AnnouncementModel as any).find().sort({ isPinned: -1, date: -1 }).lean();
      return docs.map(d => ({ ...d, _id: d._id.toString() }));
    }
    return [...memAnnouncements].sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0) || new Date(b.date).getTime() - new Date(a.date).getTime());
  },

  async createAnnouncement(data: any) {
    if (isMongoConnected()) {
      const created = await (AnnouncementModel as any).create(data);
      return { ...created.toObject(), _id: created._id.toString() };
    }
    const newAnnouncement = {
      _id: `anc_${Date.now()}`,
      title: data.title,
      content: data.content,
      date: new Date().toISOString(),
      category: data.category || 'General',
      authorName: data.authorName || 'Organizers',
      isPinned: !!data.isPinned
    };
    memAnnouncements.unshift(newAnnouncement);
    return newAnnouncement;
  },

  async updateAnnouncement(id: string, data: any) {
    if (isMongoConnected()) {
      const updated: any = await (AnnouncementModel as any).findByIdAndUpdate(id, data, { new: true }).lean();
      return updated ? { ...updated, _id: updated._id.toString() } : null;
    }
    const idx = memAnnouncements.findIndex(a => a._id === id);
    if (idx === -1) return null;
    memAnnouncements[idx] = { ...memAnnouncements[idx], ...data };
    return memAnnouncements[idx];
  },

  async deleteAnnouncement(id: string) {
    if (isMongoConnected()) {
      const res = await (AnnouncementModel as any).findByIdAndDelete(id);
      return !!res;
    }
    const initialLen = memAnnouncements.length;
    memAnnouncements = memAnnouncements.filter(a => a._id !== id);
    return memAnnouncements.length < initialLen;
  },

  // SUBMISSIONS
  async getSubmissions(userId?: string) {
    if (isMongoConnected()) {
      let filterObj: any = {};
      if (userId) {
        filterObj = { 'submittedBy._id': userId };
      }
      const docs: any[] = await (SubmissionModel as any).find(filterObj).sort({ submissionDate: -1 }).lean();
      return docs.map(d => ({ ...d, _id: d._id.toString() }));
    }
    if (userId) {
      return memSubmissions.filter(s => s.submittedBy && s.submittedBy._id === userId);
    }
    return [...memSubmissions].sort((a, b) => new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime());
  },

  async createSubmission(data: any, user: any) {
    const submissionData = {
      projectName: data.projectName,
      description: data.description,
      githubRepo: data.githubRepo,
      liveDemo: data.liveDemo,
      screenshot: data.screenshot || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
      submittedBy: {
        _id: user._id,
        name: user.name,
        email: user.email,
        telegramUsername: user.telegramUsername || '@builder',
        country: user.country || 'Global',
        avatarUrl: user.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
      },
      assignmentId: data.assignmentId || 'asg_1',
      assignmentTitle: data.assignmentTitle || 'MERN Stack Project',
      submissionDate: new Date().toISOString(),
      status: 'Pending',
      feedback: '',
      pointsAwarded: 0
    };

    if (isMongoConnected()) {
      const created = await (SubmissionModel as any).create(submissionData);
      return { ...created.toObject(), _id: created._id.toString() };
    }
    const newSubmission = {
      _id: `sub_${Date.now()}`,
      ...submissionData
    };
    memSubmissions.unshift(newSubmission);
    return newSubmission;
  },

  async updateSubmission(id: string, data: any) {
    if (isMongoConnected()) {
      const updated: any = await (SubmissionModel as any).findByIdAndUpdate(id, data, { new: true }).lean();
      return updated ? { ...updated, _id: updated._id.toString() } : null;
    }
    const idx = memSubmissions.findIndex(s => s._id === id);
    if (idx === -1) return null;
    memSubmissions[idx] = { ...memSubmissions[idx], ...data };

    // If status updated to Approved, award points to participant
    if (data.status === 'Approved') {
      const submitterEmail = memSubmissions[idx].submittedBy?.email;
      if (submitterEmail) {
        const partIdx = memParticipants.findIndex(p => p.email === submitterEmail);
        if (partIdx !== -1) {
          memParticipants[partIdx].completedAssignments += 1;
          memParticipants[partIdx].totalPoints += Number(data.pointsAwarded) || 100;
          memParticipants[partIdx].progress = Math.min(100, memParticipants[partIdx].progress + 15);
        }
      }
    }
    return memSubmissions[idx];
  },

  async deleteSubmission(id: string) {
    if (isMongoConnected()) {
      const res = await (SubmissionModel as any).findByIdAndDelete(id);
      return !!res;
    }
    const initialLen = memSubmissions.length;
    memSubmissions = memSubmissions.filter(s => s._id !== id);
    return memSubmissions.length < initialLen;
  },

  // PARTICIPANTS
  async getParticipants() {
    if (isMongoConnected()) {
      const docs: any[] = await (ParticipantModel as any).find().sort({ totalPoints: -1 }).lean();
      return docs.map(d => ({ ...d, _id: d._id.toString() }));
    }
    return [...memParticipants].sort((a, b) => b.totalPoints - a.totalPoints);
  },

  async createParticipant(data: any) {
    if (isMongoConnected()) {
      const created = await (ParticipantModel as any).create(data);
      return { ...created.toObject(), _id: created._id.toString() };
    }
    const newPart = {
      _id: `part_${Date.now()}`,
      name: data.name,
      email: data.email.toLowerCase(),
      telegramUsername: data.telegramUsername || '@builder',
      country: data.country || 'Global',
      cohort: data.cohort || 'Cohort 5',
      progress: Number(data.progress) || 0,
      completedAssignments: Number(data.completedAssignments) || 0,
      totalPoints: Number(data.totalPoints) || 0,
      avatarUrl: data.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      joinedDate: new Date().toISOString()
    };
    memParticipants.push(newPart);
    return newPart;
  },

  async updateParticipant(id: string, data: any) {
    if (isMongoConnected()) {
      const updated: any = await (ParticipantModel as any).findByIdAndUpdate(id, data, { new: true }).lean();
      return updated ? { ...updated, _id: updated._id.toString() } : null;
    }
    const idx = memParticipants.findIndex(p => p._id === id);
    if (idx === -1) return null;
    memParticipants[idx] = { ...memParticipants[idx], ...data };
    return memParticipants[idx];
  },

  async deleteParticipant(id: string) {
    if (isMongoConnected()) {
      const res = await (ParticipantModel as any).findByIdAndDelete(id);
      return !!res;
    }
    const initialLen = memParticipants.length;
    memParticipants = memParticipants.filter(p => p._id !== id);
    return memParticipants.length < initialLen;
  },

  // ANALYTICS
  async getAnalytics() {
    const participants = await this.getParticipants();
    const assignments = await this.getAssignments();
    const announcements = await this.getAnnouncements();
    const submissions = await this.getSubmissions();

    const totalParticipants = participants.length;
    const activeAssignments = assignments.filter(a => a.status === 'Active').length;
    const totalSubmissions = submissions.length;
    const pendingSubmissions = submissions.filter(s => s.status === 'Pending').length;
    const totalAnnouncements = announcements.length;

    const avgProgress = totalParticipants > 0
      ? Math.round(participants.reduce((acc, p) => acc + p.progress, 0) / totalParticipants)
      : 0;

    const countrySet = new Set(participants.map(p => p.country));

    const countryCounts: { [key: string]: number } = {};
    participants.forEach(p => {
      countryCounts[p.country] = (countryCounts[p.country] || 0) + 1;
    });

    const cohortDistribution = Object.keys(countryCounts).map(country => ({
      country,
      count: countryCounts[country]
    }));

    return {
      totalParticipants,
      activeAssignments,
      totalSubmissions,
      pendingSubmissions,
      totalAnnouncements,
      averageProgress: avgProgress,
      countriesCount: countrySet.size,
      cohortDistribution
    };
  }
};
