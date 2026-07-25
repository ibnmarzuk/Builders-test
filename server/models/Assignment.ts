import mongoose, { Schema, Document } from 'mongoose';

export interface IAssignment extends Document {
  title: string;
  description: string;
  dueDate: Date;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  resources: string[];
  status: 'Active' | 'Draft' | 'Completed';
  dayNumber: number;
  points: number;
  createdAt: Date;
}

const AssignmentSchema = new Schema<IAssignment>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
  resources: [{ type: String }],
  status: { type: String, enum: ['Active', 'Draft', 'Completed'], default: 'Active' },
  dayNumber: { type: Number, required: true },
  points: { type: Number, default: 100 },
  createdAt: { type: Date, default: Date.now }
});

export const AssignmentModel = mongoose.models.Assignment || mongoose.model<IAssignment>('Assignment', AssignmentSchema);
