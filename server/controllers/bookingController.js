const Booking = require("../models/Booking");

const createBooking = async (req, res) => {
    try {
        const {
            customerName,
            vehicleType,
            serviceType,
            bookingDate,
            status
        } = req.body;

        if (
            !customerName ||
            !vehicleType ||
            !serviceType ||
            !bookingDate
        ) {
            return res.status(400).json({
                success: false,
                message: "All booking fields are required"
            });
        }

        const booking =
            await Booking.create({
                customerName,
                vehicleType,
                serviceType,
                bookingDate,
                status
            });

        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            booking
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const getBookings = async (req, res) => {
    try {
        const bookings =
            await Booking.find()
                .sort({
                    createdAt: -1
                });

        res.json({
            success: true,
            bookings
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const updateBooking = async (req, res) => {
    try {
        const { id } = req.params;

        const booking =
            await Booking.findByIdAndUpdate(
                id,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        res.json({
            success: true,
            message: "Booking updated successfully",
            booking
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;

        const booking =
            await Booking.findByIdAndDelete(id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        res.json({
            success: true,
            message: "Booking deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


module.exports = {
    createBooking,
    getBookings,
    updateBooking,
    deleteBooking
};