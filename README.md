# MERN Cloud Integration

A full-stack MERN application for vehicle booking management. It includes a React + Vite frontend and an Express + MongoDB backend with JWT authentication.

## Features

- User registration and login with JWT authentication
- Protected booking dashboard
- Create, update, delete, and list bookings
- Responsive React UI with client-side routing
- Backend API proxied during local development

## Project structure

- `client/` — React frontend built with Vite
- `server/` — Express backend API

## Prerequisites

- Node.js 18+ and npm
- MongoDB connection URL

## Install dependencies

```bash
cd client
npm install

cd ../server
npm install
```

## Environment variables

Create a `.env` file in the `server/` folder with the following values:

```env
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
PORT=5000
CLIENT_ORIGIN=<your-frontend-url>
```

- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — secret used for signing JWT tokens
- `PORT` — backend port (default is `5000`)
- `CLIENT_ORIGIN` — frontend origin to allow CORS (for production deployment)

## Run locally

Start the backend server:

```bash
cd server
npm start
```

For development with auto-reload:

```bash
cd server
npm run dev
```

Start the frontend app:

```bash
cd client
npm run dev
```

The frontend proxies `/api` requests to the backend during local development.

## Build for production

Build the client app:

```bash
cd client
npm run build
```

## Deployment

### Frontend (Vercel)

- Root directory: `client`
- Build command: `npm run build`
- Output directory: `dist`

Set the following environment variable in Vercel:

- `VITE_API_URL` — backend API URL, e.g. `https://your-backend-url.com`

If `VITE_API_URL` is not provided, the frontend defaults to `/api`.

### Backend (Render or similar)

- Root directory: `server`
- Build command: `npm install`
- Start command: `npm start`

Required environment variables:

- `MONGO_URI`
- `JWT_SECRET`
- `CLIENT_ORIGIN`

Example `CLIENT_ORIGIN` value:

```env
CLIENT_ORIGIN=https://prodesk-it-mission-17.vercel.app/
```

## Notes

- Ensure MongoDB is reachable and the connection string is valid.
- The backend exposes `/api/auth` and `/api/bookings` endpoints.
- `VITE_API_URL` is optional for local development but required for production deployments with separate frontend and backend domains.
