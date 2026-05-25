import { Router } from 'express';
import { ActivityModel } from '../models/Activity.js';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const activities = await ActivityModel.find()
      .populate('userId', 'username displayName')
      .sort({ completedAt: -1 });
    res.json(activities);
  } catch (error) {
    next(error);
  }
});

export default router;
