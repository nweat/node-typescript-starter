import { NextFunction, Request, Response } from 'express';

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  try {
    // add validation here
    return next(); // if the validation passes we need to return `next()` to ensure we proceed to the next handler
  } catch (error) {
    console.error(error);
    return res.status(401).json({ success: false });
  }
};
