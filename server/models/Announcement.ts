import mongoose, { Schema, Document } from 'mongoose';

export interface IAnnouncement extends Document {
  title: string;
  content: string;
  date: Date;
  category: 'General' | 'Assignment' | 'Event' | 'Urgent' | 'Resource';
  authorName: string;
  isPinned: boolean;
}

const AnnouncementSchema = new Schema<IAnnouncement>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  category: { type: String, enum: ['General', 'Assignment', 'Event', 'Urgent', 'Resource'], default: 'General' },
  authorName: { type: String, default: 'Organizers' },
  isPinned: { type: Boolean, default: false }
});

export const AnnouncementModel = mongoose.models.Announcement || mongoose.model<IAnnouncement>('Announcement', AnnouncementSchema);
