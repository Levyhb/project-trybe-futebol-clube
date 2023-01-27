import { IAwayMatches, IMatch } from '../interfaces/Matches';

export const calculateTotalPoints = (match:IMatch[]) => match.map((e) => {
  if (e.awayTeamGoals > e.homeTeamGoals) return 3;
  if (e.homeTeamGoals === e.awayTeamGoals) return 1;
  return 0;
}).reduce((acc: number, cur: number) => acc + cur, 0);

export const matchesResults = (match:IMatch[]) => {
  const victories = match.filter((e) => e.homeTeamGoals < e.awayTeamGoals).length;
  const draws = match.filter((e) => e.homeTeamGoals === e.awayTeamGoals).length;
  const losses = match.filter((e) => e.homeTeamGoals > e.awayTeamGoals).length;

  return { victories, draws, losses };
};

export const goalsResults = (match:IMatch[]) => {
  const goalsFavor = match.reduce((acc, cur) => acc + cur.awayTeamGoals, 0);
  const goalsOwn = match.reduce((acc, cur) => acc + cur.homeTeamGoals, 0);
  const goalsBalance = goalsFavor - goalsOwn;
  return { goalsFavor, goalsOwn, goalsBalance };
};

export const calculateEfficiency = (match:IMatch[]) => {
  const efficiency = (calculateTotalPoints(match) / (match.length * 3)) * 100;
  return efficiency.toFixed(2);
};

const awayTeamLeaderboard = (match: IAwayMatches[]) => match.map((m) => ({
  name: m.teamName,
  totalPoints: calculateTotalPoints(m.awayMatches),
  totalGames: m.awayMatches.length,
  totalVictories: matchesResults(m.awayMatches).victories,
  totalDraws: matchesResults(m.awayMatches).draws,
  totalLosses: matchesResults(m.awayMatches).losses,
  goalsFavor: goalsResults(m.awayMatches).goalsFavor,
  goalsOwn: goalsResults(m.awayMatches).goalsOwn,
  goalsBalance: goalsResults(m.awayMatches).goalsBalance,
  efficiency: calculateEfficiency(m.awayMatches),
}))
  .sort((a, b) => b.goalsOwn - a.goalsOwn)
  .sort((a, b) => b.goalsFavor - a.goalsFavor)
  .sort((a, b) => b.goalsBalance - a.goalsBalance)
  .sort((a, b) => b.totalVictories - a.totalVictories)
  .sort((a, b) => b.totalPoints - a.totalPoints);

export default awayTeamLeaderboard;
