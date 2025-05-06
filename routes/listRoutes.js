const express = require("express");
const router = express.Router();
const List = require("../models/List");
const Card = require("../models/Card");
const { listSchema } = require("../validators/listValidator");
const { cardSchema } = require("../validators/cardValidator");

// Create a list in a board
router.post("/", async (req, res) => {
  const parsed = listSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error);

  const list = new List({ title: req.body.title, boardId: req.body.boardId });
  await list.save();
  res.json(list);
});

// Get all lists for a board
router.get("/", async (req, res) => {
  const { boardId } = req.query;
  const lists = await List.find({ boardId });
  res.json(lists);
});

// Update a list
router.put("/:id", async (req, res) => {
  const parsed = listSchema.safeParse({
    ...req.body,
    boardId: req.body.boardId || "",
  });
  if (!parsed.success) return res.status(400).json(parsed.error);

  const list = await List.findByIdAndUpdate(
    req.params.id,
    { title: req.body.title },
    { new: true }
  );
  res.json(list);
});

// Delete a list (with cascade)
router.delete("/:id", async (req, res) => {
  const listId = req.params.id;
  // Delete all cards in this list
  await Card.deleteMany({ listId });
  // Delete the list
  await List.findByIdAndDelete(listId);
  res.json({ success: true });
});

// Create a card in a list
router.post("/cards", async (req, res) => {
  const parsed = cardSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error);

  const card = new Card({
    title: req.body.title,
    description: req.body.description,
    listId: req.body.listId,
  });
  await card.save();
  res.json(card);
});

// Get all cards for a list
router.get("/cards", async (req, res) => {
  const { listId } = req.query;
  const cards = await Card.find({ listId });
  res.json(cards);
});

// Update a card
router.put("/cards/:id", async (req, res) => {
  const parsed = cardSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error);

  const card = await Card.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      description: req.body.description,
      listId: req.body.listId,
    },
    { new: true }
  );
  res.json(card);
});

// Delete a card
router.delete("/cards/:id", async (req, res) => {
  await Card.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
