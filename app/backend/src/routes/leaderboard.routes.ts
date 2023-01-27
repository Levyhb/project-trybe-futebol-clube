import { Router } from 'express';
import leaderboardController from '../controller/leaderboard.controller';

const router = Router();

router.get('/', leaderboardController.getHomeTeamRanking);

export default router;
