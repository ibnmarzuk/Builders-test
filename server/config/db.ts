import mongoose from 'mongoose';
import { UserModel } from '../models/User.js';
import { AssignmentModel } from '../models/Assignment.js';
import { AnnouncementModel } from '../models/Announcement.js';
import { SubmissionModel } from '../models/Submission.js';
import { ParticipantModel } from '../models/Participant.js';
import { INITIAL_USERS, INITIAL_ASSIGNMENTS, INITIAL_ANNOUNCEMENTS, INITIAL_PARTICIPANTS, INITIAL_SUBMISSIONS } from '../seedData.js';

let isConnected = false;

export async function connectDB(): Promise<boolean> {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri || mongoUri.includes('<username>') || mongoUri === 'MY_MONGODB_URI') {
    console.log('[MongoDB] MONGODB_URI not set or contains placeholder. Operating in high-performance local memory database mode.');
    return false;
  }

  try {
    console.log('[MongoDB] Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log('[MongoDB] Connected successfully to MongoDB Atlas!');

    // Check if initial seeding is required
    await seedMongoDBIfEmpty();
    return true;
  } catch (error: any) {
    console.warn('[MongoDB] Could not connect to Atlas:', error.message);
    console.log('[MongoDB] Falling back to local in-memory database engine for seamless operation.');
    return false;
  }
}

export function isMongoConnected(): boolean {
  return isConnected && mongoose.connection.readyState === 1;
}

async function seedMongoDBIfEmpty() {
  try {
    const userCount = await UserModel.countDocuments();
    if (userCount === 0) {
      console.log('[MongoDB] Seeding initial collections in MongoDB Atlas...');
      await UserModel.insertMany(INITIAL_USERS as any);
      await AssignmentModel.insertMany(INITIAL_ASSIGNMENTS as any);
      await AnnouncementModel.insertMany(INITIAL_ANNOUNCEMENTS as any);
      await ParticipantModel.insertMany(INITIAL_PARTICIPANTS as any);
      await SubmissionModel.insertMany(INITIAL_SUBMISSIONS as any);
      console.log('[MongoDB] Seeding complete!');
    }
  } catch (err: any) {
    console.error('[MongoDB] Error during seeding:', err.message);
  }
}
