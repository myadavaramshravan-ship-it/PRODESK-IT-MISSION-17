const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB =
    require("./config/db");

const authRoutes =
    require("./routes/authRoutes");

const bookingRoutes =
    require("./routes/bookingRoutes");


const app = express();


connectDB();

app.use(express.json());

const allowedOrigins = [
    process.env.CLIENT_ORIGIN,
    "http://localhost:5173",
    "https://prodesk-it-mission-17.vercel.app"
].filter(Boolean);

app.use(
    cors({
        origin: (origin, callback) => {
            // allow requests with no origin (mobile apps, curl, server-to-server)
            if (!origin) return callback(null, true)
            if (allowedOrigins.indexOf(origin) !== -1) return callback(null, true)
            return callback(new Error('CORS policy: origin not allowed'), false)
        },
        credentials: true
    })
);


// HEALTH CHECK
app.get("/", (req, res) => {
    res.json({
        success: true,
        message:
            "MERN Cloud Integration API is running"
    });
});


// ROUTES
app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/bookings",
    bookingRoutes
);


// PORT
const PORT =
    process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(
        `Server running on port ${PORT}`
    );
}); 