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
  const homeTeam = await Team.findByPk(homeTeamId);
  const awayTeam = await Team.findByPk(awayTeamId);

  if (!homeTeam || !awayTeam) return { type: 404, response: 'There is no team with such id!' };

  const match = await Match.create({
    homeTeamId,
    awayTeamId,
    homeTeamGoals,
    awayTeamGoals,
    inProgress: true,
  });
  return { type: 201, response: match };
};

const finishMatch = async (id: number) => {
  const match = await Match.update({ inProgress: false }, { where: { id } });
  return match;
};

const updateMatch = async (id: number, homeTeam: number, awayTeam: number) => {
  const match = await Match
    .update({ homeTeamGoals: homeTeam, awayTeamGoals: awayTeam }, { where: { id } });
  return match;
};

export default {
  getAllMatches,
  getAllMatchesInProgress,
  newMatch,
  finishMatch,
  updateMatch,
};
