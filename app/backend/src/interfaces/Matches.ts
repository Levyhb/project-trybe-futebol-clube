export interface IMatch {
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface IHomeMatches {
  teamName: string;
  homeMatches: IMatch[];
}

export interface IAwayMatches {
  teamName: string;
  awayMatches: IMatch[];
}
