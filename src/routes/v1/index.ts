import express from 'express';
import user from './user';

export default (database: string) => {
  const router = express.Router();

  router.use('/users', user(database));
  return router;
};
