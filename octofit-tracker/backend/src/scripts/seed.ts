import dotenv from 'dotenv';
import { connectToDatabase, mongoose } from '../config/database.js';
import { ActivityModel } from '../models/Activity.js';
import { LeaderboardModel } from '../models/Leaderboard.js';
import { TeamModel } from '../models/Team.js';
import { UserModel } from '../models/User.js';
import { WorkoutModel } from '../models/Workout.js';

dotenv.config();

async function seed() {
  console.log('Seed the octofit_db database with test data');

  await connectToDatabase();

  await Promise.all([
    ActivityModel.deleteMany({}),
    LeaderboardModel.deleteMany({}),
    TeamModel.deleteMany({}),
    UserModel.deleteMany({}),
    WorkoutModel.deleteMany({}),
  ]);

  const users = await UserModel.insertMany([
    {
      username: 'alex-rivera',
      email: 'alex.rivera@example.com',
      displayName: 'Alex Rivera',
    },
    {
      username: 'maya-chen',
      email: 'maya.chen@example.com',
      displayName: 'Maya Chen',
    },
    {
      username: 'sam-patel',
      email: 'sam.patel@example.com',
      displayName: 'Sam Patel',
    },
  ]);

  await TeamModel.insertMany([
    { name: 'Cardio Crew', mascot: 'Lightning', memberCount: 8 },
    { name: 'Core Collective', mascot: 'Atlas', memberCount: 6 },
    { name: 'Trail Blazers', mascot: 'Summit', memberCount: 10 },
  ]);

  await WorkoutModel.insertMany([
    {
      name: 'Morning Mobility Flow',
      focusArea: 'Flexibility',
      difficulty: 'beginner',
      durationMinutes: 20,
    },
    {
      name: 'Tempo Strength Circuit',
      focusArea: 'Strength',
      difficulty: 'intermediate',
      durationMinutes: 35,
    },
    {
      name: 'Endurance Hill Repeats',
      focusArea: 'Cardio',
      difficulty: 'advanced',
      durationMinutes: 45,
    },
  ]);

  await ActivityModel.insertMany([
    {
      userId: users[0]._id,
      type: 'Run',
      durationMinutes: 32,
      points: 120,
      completedAt: new Date('2026-05-20T17:30:00.000Z'),
    },
    {
      userId: users[1]._id,
      type: 'Cycling',
      durationMinutes: 48,
      points: 150,
      completedAt: new Date('2026-05-21T07:15:00.000Z'),
    },
    {
      userId: users[2]._id,
      type: 'Strength training',
      durationMinutes: 40,
      points: 135,
      completedAt: new Date('2026-05-22T18:00:00.000Z'),
    },
    {
      userId: users[1]._id,
      type: 'Yoga',
      durationMinutes: 25,
      points: 80,
      completedAt: new Date('2026-05-23T06:45:00.000Z'),
    },
  ]);

  await LeaderboardModel.insertMany([
    {
      userId: users[1]._id,
      totalPoints: 230,
      activityCount: 2,
      rank: 1,
    },
    {
      userId: users[2]._id,
      totalPoints: 135,
      activityCount: 1,
      rank: 2,
    },
    {
      userId: users[0]._id,
      totalPoints: 120,
      activityCount: 1,
      rank: 3,
    },
  ]);

  await mongoose.disconnect();
}

seed().catch(async (error) => {
  console.error('Failed to seed octofit_db', error);
  await mongoose.disconnect();
  process.exit(1);
});
