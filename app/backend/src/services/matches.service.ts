import Team from '../database/models/Teams.model';
import Match from '../database/models/Match.model';

const getAllMatchs = () => Match.findAll({
  include: [
    { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
    { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
  ],
});

export default {
  getAllMatchs,
};
