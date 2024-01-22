import { Request, Response } from 'express';
import { usersService } from '../services/user';

//Define user type
export type User = {
  id: string;
  name: string;
};

const getUsers = (database: string) => {
  return async function (req: Request, res: Response) {
    //call the user service
    const users = await usersService(database).getUsersSvc();

    return res.status(200).json({
      ...users,
    });
  };
};

export { getUsers };
