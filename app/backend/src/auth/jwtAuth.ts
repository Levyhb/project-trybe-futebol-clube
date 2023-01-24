import { SignOptions, sign, verify } from 'jsonwebtoken';
import IToken from '../interfaces/IToken';

const secret = process.env.JWT_SECRET || 'jwt_secret';

export const newToken = (user:IToken) => {
  const jwtConfig: SignOptions = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  try {
    const token = sign({ data: user }, secret, jwtConfig);
    return token;
  } catch (error) {
    console.log(error);
  }
};

export const verifyToken = (token: string): IToken => {
  try {
    const decodeUser = verify(token, secret);
    return decodeUser as IToken;
  } catch (error) {
    console.log(error);
    return { email: 'invalid token' };
  }
};
