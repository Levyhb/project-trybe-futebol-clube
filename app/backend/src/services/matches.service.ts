import Team from '../database/models/Teams.model';
import Match from '../database/models/Match.model';

const getAllMatches = () => Match.findAll({
  include: [
    { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
    { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
  ],
});

const getAllMatchesInProgress = (inProgress: boolean) => Match.findAll({
  where: { inProgress },
  include: [
    { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
    { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
  ],
});

const newMatch = async (
  homeTeamId: number,
  awayTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
) => {
  const match = await Match.create({
    homeTeamId,
    awayTeamId,
    homeTeamGoals,
    awayTeamGoals,
    inProgress: true,
  });
  return match;
};

const finishMatch = async (id: number) => {
  const match = await Match.update({ inProgress: false }, { where: { id } });
  return match;
};

export default {
  getAllMatches,
  getAllMatchesInProgress,
  newMatch,
  finishMatch,
};
