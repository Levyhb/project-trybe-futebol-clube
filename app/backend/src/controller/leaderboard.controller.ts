import { Request, Response } from 'express';
import leaderboardService from '../services/leaderboard.service';

const getHomeTeamRanking = async (_req: Request, res: Response) => {
  const team = await leaderboardService.getHomeTeamRanking();
  res.status(200).json(team);
};

const getAwayTeamRanking = async (_req: Request, res: Response) => {
  const team = await leaderboardService.getAwayTeamRanking();
  res.status(200).json(team);
};

const getRanking = async (_req: Request, res: Response) => {
  const team = await leaderboardService.getRanking();
  res.status(200).json(team);
};

export default {
  getHomeTeamRanking,
  getAwayTeamRanking,
  getRanking,
};
