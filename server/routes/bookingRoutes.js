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


// CREATE
router.post(
    "/",
    authMiddleware,
    createBooking
);


// READ
router.get(
    "/",
    authMiddleware,
    getBookings
);


// UPDATE
router.put(
    "/:id",
    authMiddleware,
    updateBooking
);


// DELETE
router.delete(
    "/:id",
    authMiddleware,
    deleteBooking
);


module.exports = router;