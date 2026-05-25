import { Schema, model } from 'mongoose';

export interface LeaderboardEntry {
  userId: Schema.Types.ObjectId;
  totalPoints: number;
  activityCount: number;
  rank: number;
}

const leaderboardSchema = new Schema<LeaderboardEntry>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    totalPoints: { type: Number, required: true, min: 0 },
    activityCount: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
  },
  { timestamps: true },
);

export const LeaderboardModel = model<LeaderboardEntry>(
  'LeaderboardEntry',
  leaderboardSchema,
);
