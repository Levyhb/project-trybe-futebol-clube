import { Request, Response } from 'express';
import matchesService from '../services/matches.service';

const getAllMatches = async (req: Request, res: Response) => {
  const teams = await matchesService.getAllMatchs();
  return res.status(200).json(teams);
};

export default {
  getAllMatches,
};
