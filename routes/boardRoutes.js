const express = require('express');
const router = express.Router();
const Board = require('../models/Board.js');
const List = require("../models/List.js");
const Card = require('../models/Card.js');
const {boardSchema} = require("../validators/boardValidator.js");

// Create
router.post('/', async(req, res) => {
    const parsed = boardSchema.safeParse(req.body);
    if(!parsed.success) return res.status(400).json(parsed.error);

    const board = new Board({title: req.body.title});
    await board.save();
    res.json(board);
})

// Read all
router.get('/', async(req, res) => {
    const boards = await Board.find();
    res.json(boards);
})

// Update
router.put('/:id', async(req, res) => {
    const parsed = boardSchema.safeParse(req.body);
    if(!parsed.success) return res.status(400).json(parsed.error);

    const board = await Board.findByIdAndUpdate(req.params.id, {title: req.body.title}, {new: true});
    res.json(board);
})

// Delete
router.delete('/:id', async(req, res) => {
    const boardId = req.params.id;
    const lists = await List.find({boardId});
    const listIds = lists.map(list => list._id);
    await Card.deleteMany({listId: {$in: listIds}});
    await List.deleteMany({boardId});
    await Board.findByIdAndDelete(boardId);
    res.json({success: true});
})

module.exports = router;