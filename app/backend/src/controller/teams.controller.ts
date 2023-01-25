import { Request, Response } from 'express';
import teamsService from '../services/teams.service';

const getAllTeams = async (req: Request, res: Response) => {
  const allTeams = await teamsService.getAllTeams();
  return res.status(200).json(allTeams);
};

export default {
  getAllTeams,
};
