import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'jwt_secret';

const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    verify(token, secret);
    // Fazer verificação do usuário
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default validateJWT;
