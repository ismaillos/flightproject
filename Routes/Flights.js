const express = require("express");
const router = express.Router();
const Flight = require("../models/Flights"); // assuming you have a Flight model in models/Flights.js
const bodyParser = require("body-parser");

// POST - Create a new flight
router.post("/", async (req, res) => {
  const flight = new Flight({
    depart: req.body.depart,
    arrival: req.body.arrival,
    gare: req.body.gare,
    ville_depart: req.body.ville_depart,
    ville_destination: req.body.ville_destination,
    duree: req.body.duree,
    type: req.body.type,
  });

  try {
    const savedFlight = await flight.save();
    res.status(201).json(savedFlight);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET - Retrieve all flights
router.get("/", async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET - Retrieve a single flight by ID
router.get("/:id", getFlight, (req, res) => {
  res.json(res.flight);
});

// PATCH - Update a flight
router.patch("/:id", getFlight, async (req, res) => {
  if (req.body.depart != null) {
    res.flight.depart = req.body.depart;
  }
  if (req.body.arrival != null) {
    res.flight.arrival = req.body.arrival;
  }
  if (req.body.gare != null) {
    res.flight.gare = req.body.garee;
  }
  if (req.body.ville_depart != null) {
    res.flight.ville_depart = req.body.ville_depart;
  }

  if (req.body.ville_destination != null) {
    res.flight.ville_destination = req.body.ville_destination;
  }

  if (req.body.duree != null) {
    res.flight.duree = req.body.duree;
  }

  if (req.body.type != null) {
    res.flight.type = req.body.type;
  }

  try {
    const updatedFlight = await res.flight.save();
    res.json(updatedFlight);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE - Delete a flight
router.delete("/:id", getFlight, async (req, res) => {
  try {
    await Flight.deleteOne({ _id: req.params.id });
    res.json({ message: "Deleted Flight" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get flight by ID
async function getFlight(req, res, next) {
  let flight;
  try {
    flight = await Flight.findById(req.params.id);
    if (flight == null) {
      return res.status(404).json({ message: "Cannot find flight" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.flight = flight;
  next();
}

module.exports = router;
