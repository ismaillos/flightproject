const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
  name: String,
  email: String,
  prenom: String,
  adresse: String,
  date_naissance: Date,
  // Add other fields as needed
});

module.exports = mongoose.model('Passenger', passengerSchema);

