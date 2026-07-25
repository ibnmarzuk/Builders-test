import mongoose, { Schema, Document } from 'mongoose';

export interface ISubmission extends Document {
  projectName: string;
  description: string;
  githubRepo: string;
  liveDemo: string;
  screenshot: string;
  submittedBy: mongoose.Types.ObjectId | any;
  assignmentId: mongoose.Types.ObjectId | any;
  assignmentTitle: string;
  submissionDate: Date;
  status: 'Pending' | 'Approved' | 'Rejected';
  feedback: string;
  pointsAwarded: number;
}

const SubmissionSchema = new Schema<ISubmission>({
  projectName: { type: String, required: true },
  description: { type: String, required: true },
  githubRepo: { type: String, required: true },
  liveDemo: { type: String, required: true },
  screenshot: { type: String, default: '' },
  submittedBy: { type: Schema.Types.Mixed, required: true },
  assignmentId: { type: Schema.Types.Mixed },
  assignmentTitle: { type: String, default: '' },
  submissionDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  feedback: { type: String, default: '' },
  pointsAwarded: { type: Number, default: 0 }
});

export const SubmissionModel = mongoose.models.Submission || mongoose.model<ISubmission>('Submission', SubmissionSchema);
