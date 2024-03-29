import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

import User from '../models/User';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    const userId = decoded.id;

    const user = await User.findByPk(userId);
    if (user.blocked) {
      res.status(403).json({ error: 'User blocked' });
    }

    req.userId = userId;

    return next();
  } catch (error) {
    res.status(401).json({ error: 'Token invalid' });
  }

  return next();
};
