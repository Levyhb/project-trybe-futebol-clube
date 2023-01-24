import User from '../database/models/User.model';

const getByEmail = (email:string) => User.findOne({ where: { email } });

export default {
  getByEmail,
};
