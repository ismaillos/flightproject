const express = require("express");
const router = express.Router();
const Reservations = require("../models/Reservations"); // assuming you have a reservations model in models/Reservations.js

// POST - Create a new Reservations
router.post("/", async (req, res) => {
  const reservations = new Reservations({
    date: req.body.date,
    passengerId: req.body.passengerId,
    flightId: req.body.flightId,
    price: req.body.price,
    setNumber: req.body.setNumber,
    siege: req.body.siege,
  });

  try {
    const savedReservations = await reservations.save();
    res.status(201).json(savedReservations);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET - Retrieve all reservations
router.get("/", async (req, res) => {
  try {
    const reservations = await Reservations.find()
      .populate({ path: "passengerId" }) // Use the actual field name in your schema
      .populate({ path: "flightId" }); // Use the actual field name in your schema

    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET - Retrieve a single Reservations by ID
router.get("/:id", getReservations, (req, res) => {
  res.json(res.reservations);
});

// PATCH - Update a reservations
router.patch("/:id", getReservations, async (req, res) => {
  if (req.body.date != null) {
    res.reservations.date = req.body.date;
  }
  if (req.body.setNumber != null) {
    res.reservations.setNumber = req.body.setNumber;
  }
  if (req.body.siege != null) {
    res.reservations.siege = req.body.siege;
  }
  if (req.body.price != null) {
    res.reservations.price = req.body.price;
  }
  if (req.body.passengerId != null) {
    res.reservations.passengerId = req.body.passengerId;
  }
  if (req.body.flightId != null) {
    res.reservations.flightId = req.body.flightId;
  }

  try {
    const updatedReservations = await res.reservations.save();
    res.json(updatedReservations);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE - Delete a Reservations
router.delete("/:id", getReservations, async (req, res) => {
  try {
    await Reservations.deleteOne({ _id: req.params.id });
    res.json({ message: "Deleted Reservations" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get Reservations by ID
async function getReservations(req, res, next) {
  let reservations;
  try {
    reservations = await Reservations.findById(req.params.id);
    if (reservations == null) {
      return res.status(404).json({ message: "Cannot find Reservations" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.reservations = reservations;
  next();
}

module.exports = router;
