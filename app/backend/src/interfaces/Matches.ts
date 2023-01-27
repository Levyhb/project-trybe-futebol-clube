export interface IMatch {
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface IHomeMatches {
  teamName: string;
  homeMatches: IMatch[];
}
