import Team from '../database/models/Teams.model';
import Match from '../database/models/Match.model';
import homeTeamLeaderboard from '../utils/homeLeaderboard';
import awayTeamLeaderboard from '../utils/awayLeaderboard';

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

const getAwayTeamRanking = async () => {
  const awayTeam = await Team.findAll({
    include: [
      { model: Match,
        as: 'awayMatches',
        attributes: { exclude: ['id'] },
        where: { inProgress: false } },
    ],
  });
  const awayMatch = awayTeamLeaderboard(awayTeam);
  return awayMatch;
};

export default {
  getHomeTeamRanking,
  getAwayTeamRanking,
};
