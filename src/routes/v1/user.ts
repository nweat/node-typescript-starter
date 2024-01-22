import { getUsers } from '../../controllers/user';
import express from 'express';
import { verifyJWT } from '../../middlewares/verifyJWT';

/**
 * User Schema Definition
 * Please refer to https://brikev.github.io/express-jsdoc-swagger-docs/#/components
 * @typedef {object} User
 * @property {string} id.required - Id
 * @property {string} name.required - Name
 */

/**
 * GET /v1/user/:id
 * @tags v1
 * @summary This is the summary of the endpoint
 * @description This is the detailed description of the endpoint
 * @param {string} id.path - userId
 * @return {User[]} 200 - Success - application/json
 */

export default (database: string) => {
  const router = express.Router();

  router.get('/', verifyJWT, getUsers(database));
  return router;
};
