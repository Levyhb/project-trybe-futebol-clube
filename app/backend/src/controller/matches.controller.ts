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

const newMatch = async (req: Request, res: Response) => {
  const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;

  if (!homeTeamId || !awayTeamId) {
    return res.status(400).json({ message: 'some fields are missing' });
  }

  const { type, response } = await matchesService
    .newMatch(homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals);

  if (type === 404) return res.status(type).json({ message: 'There is no team with such id!' });

  return res.status(type).json(response);
};

const finishMatch = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const match = await matchesService.finishMatch(id);

  if (!match) return res.status(400).json({ message: 'no match found' });

  return res.status(200).json({ message: 'Finished' });
};

const updateMatch = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { homeTeamGoals, awayTeamGoals } = req.body;

  if (!homeTeamGoals || !awayTeamGoals) {
    return res.status(400).json({ message: 'some fields are missing' });
  }

  const match = await matchesService.updateMatch(id, homeTeamGoals, awayTeamGoals);
  if (!match) return res.status(400).json({ message: 'no match found' });

  return res.status(200).json({ message: 'updated match' });
};

export default {
  getAllMatches,
  newMatch,
  finishMatch,
  updateMatch,
};
