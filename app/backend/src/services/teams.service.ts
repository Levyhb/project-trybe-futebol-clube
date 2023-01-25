import Team from '../database/models/Teams.model';

const getAllTeams = async () => Team.findAll();

export default {
  getAllTeams,
};
