const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  passengerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Passenger",
  },
  flightId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Flight",
  },
  date: Date,
  setNumber: Number,
  siege: Number,
  price: String,
  // Add other fields as needed
});

module.exports = mongoose.model("Reservation", reservationSchema);
