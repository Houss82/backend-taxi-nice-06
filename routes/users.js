var express = require("express");
var router = express.Router();
const User = require("../models/users");
const connectDB = require("../models/connection");

// GET - Récupérer toutes les réservations
router.get("/", async (req, res) => {
  try {
    // S'assurer que la connexion est établie
    await connectDB();
    const reservations = await User.find();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Récupérer une réservation par ID
router.get("/:id", async (req, res) => {
  try {
    const reservation = await User.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - Créer une nouvelle réservation
router.post("/", async (req, res) => {
  try {
    const nouvelleReservation = new User(req.body);
    const reservationSauvegardee = await nouvelleReservation.save();
    res.status(201).json(reservationSauvegardee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT - Mettre à jour une réservation
router.put("/:id", async (req, res) => {
  try {
    const reservation = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }
    res.json(reservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - Supprimer une réservation
router.delete("/:id", async (req, res) => {
  try {
    const reservation = await User.findByIdAndDelete(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }
    res.json({ message: "Réservation supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
