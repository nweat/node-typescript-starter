import { createUser } from '../../controllers/user';
import express from 'express';
import { verifyJWT } from '../../middlewares/verifyJWT';
import { usersService } from '../../services/user';
import { PrismaClient } from '@prisma/client';

/**
 * User Schema Definition
 * Please refer to https://brikev.github.io/express-jsdoc-swagger-docs/#/components
 * @typedef {object} User
 * @property {string} id - User ID
 * @property {string} name.required - Name
 * @property {string} gender.required - Gender
 */

/**
 * Create User Response Payload Schema Definition
 * Please refer to https://brikev.github.io/express-jsdoc-swagger-docs/#/components
 * @typedef {object} CreateUserResponsePayload
 * @property {number} id - User ID
 */

/**
 * Error Schema Definition
 * Please refer to https://brikev.github.io/express-jsdoc-swagger-docs/#/components
 * @typedef {object} Error
 * @property {string} error
 * @property {string} message
 */

export default (prisma: PrismaClient) => {
  const router = express.Router();

  /**
   * GET /v1/user/{id}
   * @tags v1
   * @summary Example without controller
   * @description This is the description of the endpoint
   * @param {number} id.path - userId
   * @return {User} 200 - Success - application/json
   * @return {Error} 500 - Error - application/json
   * @security BearerAuth
   */
  router.get('/:id', verifyJWT, async (req, res) => {
    try {
      const { id } = req.params;

      //call the user service to get the user
      const user = await usersService(prisma).getUser(Number(id));

      if (!user) return res.status(500).json({ error: 'Not Found', message: 'User not found' });

      return res.status(200).json({
        ...user,
      });
    } catch (error) {
      //logger.error(e)
      if (error instanceof Error) return res.status(500).json({ error: error.name, message: error.message });
      return res.status(500).json({ error: 'Unknown', message: 'Unknown' });
    }
  });

  /**
   * POST /v1/user/create
   * @tags v1
   * @summary Example with controller
   * @description This is the description of the endpoint
   * @param {User} request.body.required
   * @return {CreateUserResponsePayload} 200 - Success - application/json
   * @return {Error} 500 - Error - application/json
   * @security BearerAuth
   */
  router.post('/create', verifyJWT, createUser(prisma));
  return router;
};
