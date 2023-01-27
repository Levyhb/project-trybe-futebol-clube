import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Team extends Model {
  declare id: number;
  declare teamName: string;
  declare homeMatches: {
    homeTeamGoals: number;
    awayTeamGoals: number;
  }[];

  declare awayMatches: {
    homeTeamGoals: number;
    awayTeamGoals: number;
  }[];
}

Team.init({
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: INTEGER,
  },
  teamName: {
    allowNull: false,
    type: STRING,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

export default Team;
