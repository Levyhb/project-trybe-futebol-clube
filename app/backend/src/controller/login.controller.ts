import { compare } from 'bcryptjs';
import { Request, Response } from 'express';
import { newToken } from '../auth/jwtAuth';
import loginService, { loginServiceValidation } from '../services/login.service';

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await loginService.getUserByEmail(email);
  if (!user) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  const validPassword = await compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }
  const token = newToken(user);

  res.status(200).json({ token });
};

const loginValidate = async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;

  const { type, message } = await loginServiceValidation(token);

  if (type !== 200) return res.status(type).json({ message });

  return res.status(200).json({ role: message });
};

export default { login, loginValidate };
