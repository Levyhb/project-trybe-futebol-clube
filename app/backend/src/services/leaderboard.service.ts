import Team from '../database/models/Teams.model';
import Match from '../database/models/Match.model';
import homeTeamLeaderboard from '../utils/homeLeaderboard';

const getHomeTeamRanking = async () => {
  const homeTeams = await Team.findAll({
    include: [
      { model: Match,
        as: 'homeMatches',
        attributes: { exclude: ['id'] },
        where: { inProgress: false } },
    ],
  });
  const homeMatch = homeTeamLeaderboard(homeTeams);
  return homeMatch;
};

export default {
  getHomeTeamRanking,
};
