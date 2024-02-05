## Node TypeScript Starter Project

A starter project demonstrating a basic setup of a Node Express API including the setup of Prisma ORM with MySQL

### Project structure

![Screenshot](architecture.png)

```
├── prisma
├── src
│   ├── __tests__
│   ├── controllers
│   ├── middlewares
│   ├── routes
│   ├── services
│   ├── app.ts - configure the express app
│   ├── index.ts - start the express server
├── tsconfig.json
├── .eslintrc
├── .prettierrc
├── .env
├── .env.example
├── package.json
├── yarn.lock
└── README.md
```

### Prerequisites

- Install node v20+ (Recommended install via [nvm](https://github.com/nvm-sh/nvm))
- Install npm v9+
- Install yarn package manager
- MySQL database server running

### Features

- Functional based approach supporting pure functions with dependency injection
- Setup of [Prisma ORM](https://www.prisma.io/) with MySQL provider
- Generation of swagger UI with [express-jsdoc-swagger](https://brikev.github.io/express-jsdoc-swagger-docs/#/)
- Use of [dotenv](https://www.npmjs.com/package/dotenv) to load environment variables from .env file
- Prefix versioning of routes
- Setup of eslint and prettier for code formatting and enforcing code standards
- Setup of testing environment with jest and supertest
- Generation of .gitignore with [gitignore.io](https://www.toptal.com/developers/gitignore)
- Use [fakerjs](https://fakerjs.dev/) for generating fake test data
- Setup of [jest](https://jestjs.io/) for testing
- Setup of [supertest](https://www.npmjs.com/package/supertest) for testing API routes

### API Docs

http://localhost:3000/api-docs/

<br>

# Setup

### Step 1: [Baseline](https://www.prisma.io/docs/orm/prisma-migrate/workflows/baselining) an existing database with Prisma ORM

We only need to do this step ONCE. The purpose is to generate the schema from the existing production database schema. This step is necessary so that we can create the development environment.

1. If there is an existing `prisma` folder, delete it.

2. In the `.env` file, set the `DATABASE_URL` to the connection URL for the production database.

3. `npx prisma init`: creates the new directory called "prisma" that contains the file "schema.prisma"

4. Inside `schema.prisma`, ensure to specify the correct datasource provider. For example "mysql" or "postgresql"

5. `npx prisma db pull`: reads the database schema and translates it into a Prisma data model. Open up the "schema.prisma" file to check the models that were generated.

6. `mkdir -p prisma/migrations/0_init`: "migrations" folder will contain all the migrations. "0_init" is the first migration

7. `npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/0_init/migration.sql` : generates the migration file

8. `npx prisma migrate resolve --applied 0_init`: mark the migration as applied. We now have a baseline for the current database schema. The database will now contain a new table called "\_prisma_migrations" that will be used to hold a history of all migrations.

9. Please make sure that you set the `DATABASE_URL` back to your local connection URL. Ideally you should not commit the ".env" file and handle this through your CI/CD flow.

10. If you need to make changes to the schema after the migration is applied, update the schema inside `prisma/schema.prisma` and use this command: `npx prisma migrate dev --name <NAME>` to make further changes to your database schema.

### Step 2: Build Docker Containers and Run

- `docker-compose build`
- `docker-compose up -d`

Access the MySQL instance:

- `docker exec -it mysql mysql -p`

<br>

### Create a deployable version

`yarn start`: will compile your application according to the configurations in the `tsconfig.json` file, create a `build` folder and invoke the compiled JS server file

<br>

### Deploying database changes using GitHub Actions

https://www.prisma.io/docs/orm/prisma-client/deployment/deploy-database-changes-with-prisma-migrate
