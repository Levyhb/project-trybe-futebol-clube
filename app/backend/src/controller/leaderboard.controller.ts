import { Request, Response } from 'express';
import leaderboardService from '../services/leaderboard.service';

const getHomeTeamRanking = async (_req: Request, res: Response) => {
  const team = await leaderboardService.getHomeTeamRanking();
  res.status(200).json(team);
};

export default {
  getHomeTeamRanking,
};
