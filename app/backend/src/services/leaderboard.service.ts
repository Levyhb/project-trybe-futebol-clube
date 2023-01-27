import Team from '../database/models/Teams.model';
import Match from '../database/models/Match.model';
import homeTeamLeaderboard from '../utils/homeLeaderboard';
import awayTeamLeaderboard from '../utils/awayLeaderboard';
import leaderboard from '../utils/leaderboard';

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

const getRanking = async () => {
  const homeTeamRanking = await getHomeTeamRanking();
  const awayTeamRanking = await getAwayTeamRanking();

  const getLeaderboard = leaderboard(homeTeamRanking, awayTeamRanking)
    .sort((a, b) => {
      if (a && b) {
        return b.totalPoints - a.totalPoints
        || b.totalVictories - a.totalVictories
        || b.goalsBalance - a.goalsBalance
        || b.goalsFavor - a.goalsFavor
        || b.goalsOwn - a.goalsOwn;
      }
      return -1;
    });
  return getLeaderboard;
};

export default {
  getHomeTeamRanking,
  getAwayTeamRanking,
  getRanking,
};
