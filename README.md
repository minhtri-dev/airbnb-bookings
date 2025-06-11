# Full Stack Template

This repository provides a template for setting up a full-stack application using Express.js with TypeScript for the backend and Vite with React and TypeScript for the frontend.

## Prerequisites

Before you begin, ensure you have Node.js and npm installed on your machine:

- **Node.js**: [Download and install Node.js](https://nodejs.org/)
- **npm**: Included with Node.js installation

You can verify the installation by running the following commands:

```
node -v
npm -v
```

## Overview

- **Backend**: Uses Express.js and TypeScript to handle server-side logic.
- **Frontend**: Employs Vite, React, and TypeScript for client-side application.

## Project Structure
### Frontend
```
backend/
├── node_modules/
├── public/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── app.js
└── server.js

```
### Frontend
```
frontend/
├── node_modules/
├── public/
└── src/
│   ├── assets/
│   ├── components/
│   ├── config/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   ├── index.css
│   └── index.tsx
└── index.html

```
## Scripts and Commands

### Root Scripts

- **`npm run dev`**: Starts both the backend and frontend development servers concurrently.
- **`npm run build`**: Builds both the backend and frontend concurrently.
- **`npm run test`**: Runs tests for both the backend and frontend concurrently.

### Backend Scripts

- **`npm run build`**: Compiles the TypeScript code.
- **`npm run start`**: Starts the application in production mode.
- **`npm run dev`**: Starts the development server with hot-reloading.
- **`npm run lint`**: Lints the TypeScript source files.
- **`npm run format`**: Formats code using Prettier.
- **`npm run test`**: Runs backend tests using Vitest.

### Frontend Scripts

- **`npm run dev`**: Starts the Vite development server.
- **`npm run build`**: Builds the application for production.
- **`npm run lint`**: Lints the source files.
- **`npm run format`**: Formats code using Prettier.
- **`npm run test`**: Runs the frontend tests using Vitest.

## Key Packages

### Dev Tools

- **nodemon**: Automatically restarts the server upon file changes during development.
- **eslint and prettier**: Code linting and formatting.
- **vitest**: Vite-native testing framework.
- **tsx**: For watch mode.

## Getting Started

1. **Install Dependencies**
   ```
   npm install
   ```

2. **Run Development**

   ```
   npm run dev
   ```
