import { compare } from 'bcryptjs';
import { Request, Response } from 'express';
import { newToken } from '../auth/jwtAuth';
import loginService from '../services/users.service';

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await loginService.getByEmail(email);
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
    console.log(err);
    return res.status(500).json({ message: 'Error', error: err });
  }
};

export default login;
