const express = require("express");
const router = express.Router();
const Card = require("../models/Card");

// Create a card in a list
router.post("/", async (req, res) => {
  const card = new Card({
    title: req.body.title,
    description: req.body.description,
    listId: req.body.listId,
  });
  await card.save();
  res.json(card);
});

// Get all cards for a list
router.get("/", async (req, res) => {
  const { listId } = req.query;
  const cards = await Card.find({ listId });
  res.json(cards);
});

// Update a card
router.put(":/id", async (req, res) => {
  const card = await Card.findByIdAndUpdate(
    req.params.id,
    { title: req.body.title, description: req.body.description },
    { new: true }
  );
  res.json(card);
});

// Delete a card
router.delete(":/id", async (req, res) => {
  await Card.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
