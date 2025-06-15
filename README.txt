# Airbnb Bookings

## Notes for markers

Follow the instructions below for a more detailed guide on the installation process/instructions to run. No further configurations will be needed however ensure that the env. and env.development for backend and frontend are inside those folders respectively. If for whatever reasons the environment files are not in the zipped folders please contact me and I can provide those files.

## Overview

This project is a full-stack application for managing Airbnb bookings. It includes a **backend** built with Express.js and TypeScript and a **frontend** built with React, TypeScript, and Vite.

### Features
---
#### Backend
- **Booking Management**: Handles booking creation, client management, and availability checks.
- **Database Integration**: Uses MongoDB for persistent storage of listings, bookings, and client data.
- **API Endpoints**: Provides RESTful endpoints for managing bookings, clients, and listings.

#### Frontend
- **Booking Interface**: Allows users to select listings, choose booking dates, and submit client information.
- **Filters**: Users can filter listings by location, property type, and number of bedrooms.
- **Confirmation Page**: Displays a confirmation message after a booking is successfully created.



## Project Structure

### Backend

- **Technologies**: Express.js, TypeScript, MongoDB
- **Folder Structure**:
  - `src/config`: Database configuration.
  - `src/controllers`: API logic for bookings and clients.
  - `src/models`: Mongoose models for database entities.
  - `src/routes`: Express routes for API endpoints.
  - `src/services`: Service layer for database operations.

### Frontend

- **Technologies**: React, TypeScript, Vite, Tailwind CSS
- **Folder Structure**:
  - `src/components`: Shared UI components (e.g., Loading, Header).
  - `src/pages`: Page-level components (e.g., Home, Bookings, Confirmation).
  - `src/services`: API utilities for interacting with the backend.
  - `src/interfaces`: Type definitions for data models.


## Prerequisites

Ensure you have the following installed:
- **Node.js**: [Download Node.js](https://nodejs.org/)
- **npm**: Comes with Node.js installation.



## Setup

### Backend

1. **Install Dependencies**:  
   Navigate to the `backend` folder and run:
   ```bash
   npm install
   ```

2. **Environment Variables**:  
   Create a `.env` file in the `backend` folder with the following:
   ```
   MONGO_URI=<your-mongodb-uri>
   ```

3. **Run Development Server**:  
   Start the backend server:
   ```bash
   npm run dev
   ```

4. **Build for Production**:  
   Create a production build:
   ```bash
   npm run build
   ```

---

### Frontend

1. **Install Dependencies**:  
   Navigate to the `frontend` folder and run:
   ```bash
   npm install
   ```

2. **Environment Variables**:  
   Create a `.env.development` file in the `frontend` folder with the following:
   ```
   VITE_API_URL=http://localhost:3000
   ```

3. **Run Development Server**:  
   Start the frontend server:
   ```bash
   npm run dev
   ```

4. **Build for Production**:  
   Create a production build:
   ```bash
   npm run build
   ```


## Scripts

### Backend

- **`npm run dev`**: Starts the development server with hot-reloading.
- **`npm run build`**: Compiles TypeScript code for production.
- **`npm run start`**: Runs the production server.
- **`npm run test`**: Executes backend tests.

### Frontend

- **`npm run dev`**: Starts the Vite development server.
- **`npm run build`**: Builds the frontend for production.
- **`npm run test`**: Executes frontend tests.


## Development Notes

- **Frontend URL**: [http://localhost:5173](http://localhost:5173)
- **Backend URL**: [http://localhost:3000](http://localhost:3000)

Ensure both servers are running concurrently for full functionality.

