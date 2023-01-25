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

export default {
  getAllMatches,
  getAllMatchesInProgress,
};
