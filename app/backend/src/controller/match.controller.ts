import { Request, Response } from 'express';
import matchesService from '../services/matches.service';

const getAllMatches = async (req: Request, res: Response) => {
  const { inProgress } = req.query;

  if (inProgress !== undefined) {
    const inProgressToBoolean = JSON.parse(inProgress as string);
    const matches = await matchesService.getAllMatchesInProgress(inProgressToBoolean);
    return res.status(200).json(matches);
  }

  const matches = await matchesService.getAllMatches();
  return res.status(200).json(matches);
};

export default {
  getAllMatches,
};
