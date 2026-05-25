import { Router } from 'express';
import { ActivityModel } from '../models/Activity.js';
import { LeaderboardModel } from '../models/Leaderboard.js';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const savedLeaderboard = await LeaderboardModel.find()
      .populate('userId', 'username displayName')
      .sort({ rank: 1 });

    if (savedLeaderboard.length > 0) {
      res.json(savedLeaderboard);
      return;
    }

    const leaderboard = await ActivityModel.aggregate([
      {
        $group: {
          _id: '$userId',
          totalPoints: { $sum: '$points' },
          activityCount: { $sum: 1 },
        },
      },
      { $sort: { totalPoints: -1 } },
      { $limit: 20 },
    ]);

    res.json(leaderboard);
  } catch (error) {
    next(error);
  }
});

export default router;
