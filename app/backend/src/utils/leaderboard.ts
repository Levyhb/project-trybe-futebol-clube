import ILeaderBoardTeam from '../interfaces/ILeaderboardTeam';

const leaderboard = (home: ILeaderBoardTeam[], away: ILeaderBoardTeam[]) => away.map((m) => {
  const homeTeam = home.find((t) => t.name === m.name);
  if (!homeTeam) return;
  return {
    name: m.name,
    totalPoints: m.totalPoints + homeTeam.totalPoints,
    totalGames: m.totalGames + homeTeam.totalGames,
    totalVictories: m.totalVictories + homeTeam.totalVictories,
    totalDraws: m.totalDraws + homeTeam.totalDraws,
    totalLosses: m.totalLosses + homeTeam.totalLosses,
    goalsFavor: m.goalsFavor + homeTeam.goalsFavor,
    goalsOwn: m.goalsOwn + homeTeam.goalsOwn,
    goalsBalance: m.goalsBalance + homeTeam.goalsBalance,
    efficiency: (((m.totalPoints + homeTeam.totalPoints)
    / ((m.totalGames + homeTeam.totalGames) * 3)) * 100).toFixed(2) };
});

export default leaderboard;
