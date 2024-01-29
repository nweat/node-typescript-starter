import { NextFunction, Request, Response } from 'express';
// import jwt from 'jsonwebtoken';

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({ message: 'Permission Denied', status: 'Error' });

    // Sign a token
    // jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });

    // Verify a JWT token
    // jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
    //   console.log(err);

    //   if (err) return res.sendStatus(403);

    //   req.user = user;

    //   next();
    // });

    return next(); // if the validation passes we need to return `next()` to ensure we proceed to the next handler
  } catch (error) {
    console.error(error);
    return res.status(401).json({ success: false });
  }
};
