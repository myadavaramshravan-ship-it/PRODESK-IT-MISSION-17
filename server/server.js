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
app.use(
    cors({
        origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
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