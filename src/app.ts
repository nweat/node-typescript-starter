import bodyParser from 'body-parser';
import express, { Application } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import v1Router from './routes/v1';
import expressJSDocSwagger from 'express-jsdoc-swagger';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const prisma = new PrismaClient();

const app: Application = express();

const options = {
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local',
    },
    {
      url: 'url',
      description: 'Staging',
    },
    {
      url: 'url',
      description: 'Production',
    },
  ],
  info: {
    version: '1.0.0',
    title: 'API',
    license: {
      name: 'MIT',
    },
    description: 'API Documentation',
    contact: {
      name: 'Name',
      email: 'Email',
    },
  },
  filesPattern: ['./routes/**/*.js', './routes/**/*.ts'],
  baseDir: __dirname,
  security: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
    },
  },
  // URL where SwaggerUI will be rendered
  swaggerUIPath: '/api-docs',
  // Expose OpenAPI UI
  exposeSwaggerUI: true,
  // Expose Open API JSON Docs documentation in `apiDocsPath` path.
  exposeApiDocs: false,
};

expressJSDocSwagger(app)(options); //initialize the openAPI documentation
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(bodyParser.json({ limit: '10mb', type: 'application/json' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

//register routes and pass in dependencies to the routers
app.use('/v1', v1Router(prisma));
//app.use('/v2', v2Router(logger));

export default app;
