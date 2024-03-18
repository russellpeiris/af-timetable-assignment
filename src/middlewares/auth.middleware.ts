import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Roles } from '../enums/roles.enum';
import User from '../schemas/user.schema';

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: 'Please login to continue' });
    }

    const jwtSecret = process.env.JWT_SECRET || '';
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: 'You are not authorized' });
    }

    const user = await User.findOne({ _id: decoded.userId });
    if (!user) {
      res.status(401).json({ message: 'Unauthorized, username not found' });
    }
    next();
  } catch (error: any) {
    console.error('Failed to authenticate user', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function authorizeAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.cookies.jwt;
    const jwtSecret = process.env.JWT_SECRET || '';
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

    if (decoded.role !== Roles.ADMIN) {
      return res.status(403).json({ message: 'You are not authorized' });
    }
    next();
  } catch (error: any) {
    console.error('Failed to authorize user', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
}
