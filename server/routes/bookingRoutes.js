const express = require("express");

const {
    createBooking,
    getBookings,
    updateBooking,
    deleteBooking
} = require("../controllers/bookingController");

const authMiddleware =
    require("../middleware/authMiddleware");

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    createBooking
);

router.get(
    "/",
    authMiddleware,
    getBookings
);

router.put(
    "/:id",
    authMiddleware,
    updateBooking
);

router.delete(
    "/:id",
    authMiddleware,
    deleteBooking
);


module.exports = router;