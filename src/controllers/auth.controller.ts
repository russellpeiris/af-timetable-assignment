import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import { logger } from '..';
import { Roles } from '../enums/roles.enum';
import User from '../schemas/user.schema';
import { createStudent } from './student.controller';
import { createAdmin } from './admin.controller';
import { createFaculty } from './faculty.controller';

const generateToken = (res: Response, userId: Types.ObjectId) => {
  const jwtSecret = process.env.JWT_SECRET || '';
  const token = jwt.sign({ userId }, jwtSecret, {
    expiresIn: '24h',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 60 * 60 * 1000,
  });
};

const clearToken = (res: Response) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
};

async function login(req: Request, res: Response) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      logger.error('User not found');
      throw new Error('User not found');
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    generateToken(res, user._id);
    res.status(200).json({ message: 'Logged in successfully', user });
  } catch (error: any) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
}

async function register(req: Request, res: Response) {
  try {
    const { nic, role, username, password, name } = req.body;

    const isExist = await User.findOne({ username });
    if (isExist) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const newUser = await User.create({ username, password, name, nic });
    if (!newUser) {
      return res.status(500).json({ message: 'Failed to create user' });
    }

    let user;
    switch (role) {
      case Roles.STUDENT:
        user = await createStudent(req.body);
        generateToken(res, user._id);
        return res
          .status(201)
          .json({ message: 'Student created successfully' });

      case Roles.ADMIN:
        user = await createAdmin(req.body);
        generateToken(res, user._id);
        return res.status(201).json({ message: 'Admin created successfully' });

      case Roles.FACULTY:
        user = await createFaculty(req.body);
        generateToken(res, user._id);
        return res
          .status(201)
          .json({ message: 'Faculty created successfully' });
      default:
        return res.status(400).json({ message: 'Please provide a role' });
    }
  } catch (error: any) {
    logger.error(error.message);
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
}

export { login, register };
