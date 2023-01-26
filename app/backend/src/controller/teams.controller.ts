import { Request, Response } from 'express';
import teamsService from '../services/teams.service';

const getAllTeams = async (req: Request, res: Response) => {
  const allTeams = await teamsService.getAllTeams();
  return res.status(200).json(allTeams);
};

const getTeamById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const team = await teamsService.getTeamById(id);
  return res.status(200).json(team);
};

export default {
  getAllTeams,
  getTeamById,
};
