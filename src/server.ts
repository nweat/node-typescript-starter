import bodyParser from 'body-parser';
import express, { Application } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import v1Router from './routes/v1';
import database from './database';
import expressJSDocSwagger from 'express-jsdoc-swagger';

const app: Application = express();
const PORT: string | number = process.env.PORT || 3000;
const options = {
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
  filesPattern: './routes/**/*.ts',
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

expressJSDocSwagger(app)(options); //initialize the express doc
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(bodyParser.json({ limit: '10mb', type: 'application/json' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

//register routes and pass in dependencies to the routers
app.use('/v1', v1Router(database));

//start the express server
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});

export default app;
