import { Schema, model } from 'mongoose';

export interface Team {
  name: string;
  mascot: string;
  memberCount: number;
}

const teamSchema = new Schema<Team>(
  {
    name: { type: String, required: true, unique: true },
    mascot: { type: String, required: true },
    memberCount: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true },
);

export const TeamModel = model<Team>('Team', teamSchema);
