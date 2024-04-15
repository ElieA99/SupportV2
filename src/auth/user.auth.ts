import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import { User } from 'src/user/user.schema';

export const userAuth = async (req, res) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ error: 'Authentication failed. ' });
  }
  try {
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
