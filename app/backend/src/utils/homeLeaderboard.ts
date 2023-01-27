import { IHomeMatches, IMatch } from '../interfaces/Matches';

const calculateTotalPoints = (match:IMatch[]) => match.map((e) => {
  if (e.homeTeamGoals > e.awayTeamGoals) return 3;
  if (e.homeTeamGoals === e.awayTeamGoals) return 1;
  return 0;
}).reduce((acc: number, cur: number) => acc + cur, 0);

const matchesResults = (match:IMatch[]) => {
  const victories = match.filter((e) => e.homeTeamGoals > e.awayTeamGoals).length;
  const draws = match.filter((e) => e.homeTeamGoals === e.awayTeamGoals).length;
  const losses = match.filter((e) => e.homeTeamGoals === e.awayTeamGoals).length;

  return { victories, draws, losses };
};

const goalsResults = (match:IMatch[]) => {
  const goalsFavor = match.reduce((acc, cur) => acc + cur.homeTeamGoals, 0);
  const goalsOwn = match.reduce((acc, cur) => acc + cur.awayTeamGoals, 0);
  const goalsBalance = goalsFavor - goalsOwn;
  return { goalsFavor, goalsOwn, goalsBalance };
};

const calculateEfficiency = (match:IMatch[]) => {
  const efficiency = (calculateTotalPoints(match) / (match.length * 3)) * 100;
  return efficiency.toFixed(2);
};

const homeTeamLeaderboard = (match: IHomeMatches[]) => match.map((m) => ({
  name: m.teamName,
  totalPoints: calculateTotalPoints(m.homeMatches),
  totalGames: m.homeMatches.length,
  totalVictories: matchesResults(m.homeMatches).victories,
  totalDraws: matchesResults(m.homeMatches).draws,
  totalLosses: matchesResults(m.homeMatches).losses,
  goalsFavor: goalsResults(m.homeMatches).goalsFavor,
  goalsOwn: goalsResults(m.homeMatches).goalsOwn,
  goalsBalance: goalsResults(m.homeMatches).goalsBalance,
  efficiency: calculateEfficiency(m.homeMatches),
}))
  .sort((a, b) => b.goalsOwn - a.goalsOwn)
  .sort((a, b) => b.goalsFavor - a.goalsFavor)
  .sort((a, b) => b.goalsBalance - a.goalsBalance)
  .sort((a, b) => b.totalVictories - a.totalVictories)
  .sort((a, b) => b.totalPoints - a.totalPoints);

export default homeTeamLeaderboard;
