## Node TypeScript Starter Project

A starter project demonstrating a basic 3 layer architecture setup of a Node Express API

<br>

### Features

- Functional based approach supporting pure functions with dependency injection
- Prefix versioning of routes
- Auto generation of API docs with express-jsdoc-swagger
- Setup of eslint and prettier
- Setup of test with jest and supertest

<br>

### API Documentation

http://localhost:3000/api-docs/

<br>

### Prerequisites

- Install node v20+ (Recommended install via [nvm](https://github.com/nvm-sh/nvm))
- Install npm v9+
- Install yarn package manager

<br>

### Install & run locally

```
nvm use 20
yarn install
yarn dev
```

<br>

### Test

```
yarn test
```

<br>

### Build

Transpiles TypeScript into JavaScript. The transpiled files will be inside the `/build` directory

`yarn build`

<br>

### Dependency management

Add a new dependency:

- `yarn add <package_name>`

Add a new dev dependency:

- `yarn add <package_name> --save-dev`

<br>

### Recommended VSCode settings

```
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.formatOnPaste": true,
  ...
}
```
