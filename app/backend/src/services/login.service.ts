import { verifyToken } from '../auth/jwtAuth';
import User from '../database/models/User.model';

const getUserByEmail = (email:string) => User.findOne({ where: { email } });

export const loginServiceValidation = async (token: string) => {
  try {
    const { data: { role } } = verifyToken(token);
    return { type: 200, message: role };
  } catch (err) {
    return { type: 401, message: 'Invalid token' };
  }
};

export default {
  getUserByEmail,
  loginServiceValidation,
};
