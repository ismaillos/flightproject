const express = require("express");
const router = express.Router();
const Passenger = require("../models/Passenger"); // assuming you have a Passanger model in models/Passenger.js

// POST - Create a new Passenger
router.post("/", async (req, res) => {
  const passenger = new Passenger({
    name: req.body.name,
    email: req.body.email,
    prenom: req.body.prenom,
    adresse: req.body.adresse,
    date_naissance: req.body.date_naissance,
  });

  try {
    const savedPassenger = await passenger.save();
    res.status(201).json(savedPassenger);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET - Retrieve all passenger
router.get("/", async (req, res) => {
  try {
    const passenger = await Passenger.find();
    res.json(passenger);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET - Retrieve a single Passenger by ID
router.get("/:id", getPassenger, (req, res) => {
  res.json(res.passenger);
});

// PATCH - Update a Passenger
router.patch("/:id", getPassenger, async (req, res) => {
  if (req.body.name != null) {
    res.passenger.name = req.body.name;
  }
  if (req.body.email != null) {
    res.passenger.email = req.body.email;
  }
  if (req.body.prenom != null) {
    res.passenger.prenom = req.body.prenom;
  }
  if (req.body.adresse != null) {
    res.passenger.adresse = req.body.adresse;
  }
  if (req.body.date_naissance != null) {
    res.passenger.date_naissance = req.body.date_naissance;
  }

  try {
    const updatedPassenger = await res.passenger.save();
    res.json(updatedPassenger);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE - Delete a passenger
router.delete("/:id", getPassenger, async (req, res) => {
  try {
    await Passenger.deleteOne({ _id: req.params.id });
    res.json({ message: "Deleted Passenger" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get Passenger by ID
async function getPassenger(req, res, next) {
  let passenger;
  try {
    passenger = await Passenger.findById(req.params.id);
    if (passenger == null) {
      return res.status(404).json({ message: "Cannot find passenger" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.passenger = passenger;
  next();
}

module.exports = router;
