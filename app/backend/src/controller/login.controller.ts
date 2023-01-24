import { compare } from 'bcryptjs';
import { Request, Response } from 'express';
import { newToken } from '../auth/jwtAuth';
import loginService, { loginServiceValidation } from '../services/login.service';

const login = async (req: Request, res: Response) => {
  try {
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
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Error', error: err });
  }
};

const loginValidate = async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;

  if (!token) res.status(400).json({ response: 'Token inexistente' });

  const { type, message } = await loginServiceValidation(token);

  if (type !== 200) return res.status(type).json({ message });

  return res.status(200).json({ role: message });
};

export default { login, loginValidate };
