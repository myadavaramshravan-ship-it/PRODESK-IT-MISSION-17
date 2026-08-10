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

## Deployment

### Deploy frontend to Vercel

- Set the root directory to `client`
- Build command: `npm run build`
- Output directory: `dist`
- Keep `client/vercel.json` in the repo for SPA routing.

### Deploy backend to Render

- Set the root directory to `server`
- Build command: `npm install`
- Start command: `npm start`
- Configure Render environment variables:
	- `MONGO_URI`
	- `JWT_SECRET`
	- `CLIENT_ORIGIN` (the Vercel frontend URL)

### Deployed URLs (set these values on Render)

- Frontend (Vercel): `https://prodesk-it-mission-17.vercel.app/`
- Backend (Render): `https://prodesk-it-mission-17.onrender.com/`

Example `CLIENT_ORIGIN` value to set on Render:

```
CLIENT_ORIGIN=https://prodesk-it-mission-17.vercel.app
```

## Notes

- Make sure MongoDB is running and the connection string is valid.
- The app expects `/api/auth` and `/api/bookings` endpoints from the backend.
