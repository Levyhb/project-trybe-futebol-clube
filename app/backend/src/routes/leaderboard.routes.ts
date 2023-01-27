import { Router } from 'express';
import leaderboardController from '../controller/leaderboard.controller';

const router = Router();

router.get('/home', leaderboardController.getHomeTeamRanking);
router.get('/away', leaderboardController.getAwayTeamRanking);

export default router;
