import { Request, Response } from 'express';
import { usersService } from '../services/user';
import { PrismaClient } from '@prisma/client';

const createUser = (prisma: PrismaClient) => {
  return async function (req: Request, res: Response) {
    try {
      const { name, gender } = req.body;

      //call the user service to create the user
      const id = await usersService(prisma).createUser({ name, gender });

      return res.status(200).json({
        id,
      });
    } catch (error) {
      if (error instanceof Error) return res.status(500).json({ error: error.name, message: error.message });
      return res.status(500).json({ error: 'Unknown', message: 'Unknown' });
    }
  };
};

export { createUser };
