import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'participant';
  telegramUsername?: string;
  country?: string;
  cohort?: string;
  progress?: number;
  avatarUrl?: string;
  bio?: string;
  professionalLink?: string;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['admin', 'participant'], default: 'participant' },
  telegramUsername: { type: String, default: '' },
  country: { type: String, default: 'Global' },
  cohort: { type: String, default: 'Cohort 5' },
  progress: { type: Number, default: 0 },
  avatarUrl: { type: String, default: '' },
  bio: { type: String, default: '' },
  professionalLink: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

export const UserModel = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
