const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  depart: Date,
  arrival: Date,
  gare: String,
  ville_depart: String,
  ville_destination: String,
  duree: Date,
  type: String,
  // Add other fields as needed
});

module.exports = mongoose.model("Flight", flightSchema);
