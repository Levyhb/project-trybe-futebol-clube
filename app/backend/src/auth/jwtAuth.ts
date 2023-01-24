import { SignOptions, sign, verify, JwtPayload } from 'jsonwebtoken';
import IToken from '../interfaces/IToken';

const secret = process.env.JWT_SECRET || 'jwt_secret';

export const newToken = (user:IToken) => {
  const jwtConfig: SignOptions = {
    algorithm: 'HS256',
    expiresIn: '7d',
  };
  try {
    const token = sign({ data: user }, secret, jwtConfig);
    return token;
  } catch (error) {
    console.log(error);
  }
};

export const verifyToken = (token: string): JwtPayload => {
  const decodeUser = verify(token, secret);
  return decodeUser as JwtPayload;
};
