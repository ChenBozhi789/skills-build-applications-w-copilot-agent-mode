import { Schema, model } from 'mongoose';

export interface Activity {
  userId: Schema.Types.ObjectId;
  type: string;
  durationMinutes: number;
  points: number;
  completedAt: Date;
}

const activitySchema = new Schema<Activity>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    points: { type: Number, required: true, min: 0 },
    completedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export const ActivityModel = model<Activity>('Activity', activitySchema);
