const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        customerName: {
            type: String,
            required: true,
            trim: true
        },

        vehicleType: {
            type: String,
            required: true,
            enum: [
                "Car",
                "Bike",
                "SUV",
                "Truck"
            ]
        },

        serviceType: {
            type: String,
            required: true,
            enum: [
                "Oil Change",
                "General Service",
                "Brake Service",
                "Engine Repair"
            ]
        },

        bookingDate: {
            type: Date,
            required: true
        },

        status: {
            type: String,
            enum: [
                "Pending",
                "In Progress",
                "Completed"
            ],
            default: "Pending"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Booking",
    bookingSchema
);