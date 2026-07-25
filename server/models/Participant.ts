import mongoose, { Schema, Document } from 'mongoose';

export interface IParticipant extends Document {
  name: string;
  email: string;
  telegramUsername: string;
  country: string;
  cohort: string;
  progress: number;
  completedAssignments: number;
  totalPoints: number;
  avatarUrl: string;
  joinedDate: Date;
}

const ParticipantSchema = new Schema<IParticipant>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telegramUsername: { type: String, required: true },
  country: { type: String, required: true },
  cohort: { type: String, default: 'Cohort 5' },
  progress: { type: Number, default: 0 },
  completedAssignments: { type: Number, default: 0 },
  totalPoints: { type: Number, default: 0 },
  avatarUrl: { type: String, default: '' },
  joinedDate: { type: Date, default: Date.now }
});

export const ParticipantModel = mongoose.models.Participant || mongoose.model<IParticipant>('Participant', ParticipantSchema);
