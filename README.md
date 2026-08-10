# MERN Cloud Integration

A full-stack MERN application for vehicle booking management. It includes a React + Vite frontend and an Express + MongoDB backend with JWT authentication.

## Features

- User registration and login with JWT auth
- Protected dashboard for booking management
- Create, update, delete, and list bookings
- Responsive UI with client-side routing
- API requests proxied during development

## Project structure

- `client/` - React app built with Vite
- `server/` - Express backend API

## Setup

### Prerequisites

- Node.js 18+ / npm
- MongoDB connection URL

### Install dependencies

```bash
cd client
npm install

cd ../server
npm install
```

### Environment variables

Create a `.env` file in `server/` with values like:

```env
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
PORT=5000
```

## Run locally

Start the backend server:

```bash
cd server
npm start
```

Start the frontend app:

```bash
cd client
npm run dev
```

The frontend uses Vite proxy settings so API requests to `/api` are forwarded to the backend.

## Production build

Build the client app:

```bash
cd client
npm run build
```

## Notes

- Make sure MongoDB is running and the connection string is valid.
- The app expects `/api/auth` and `/api/bookings` endpoints from the backend.
