import express from 'express';
import user from './user';
import { PrismaClient } from '@prisma/client';

export default (prisma: PrismaClient) => {
  const router = express.Router();

  router.use('/user', user(prisma));
  return router;
};
