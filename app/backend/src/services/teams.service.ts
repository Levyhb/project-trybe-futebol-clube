import Team from '../database/models/Teams.model';

const getAllTeams = async () => Team.findAll();

const getTeamById = async (id:number) => Team.findOne({ where: { id } });

export default {
  getAllTeams,
  getTeamById,
};
