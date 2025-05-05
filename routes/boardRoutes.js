const express = require('express');
const router = express.Router();
const Board = require('../models/Board.js');

// Create
router.post('/', async (req, res) => {
    const board = new Board({title: req.body.title});
    await board.save();
    res.json(board);
});

// Read all
router.get('/', async(req, res) => {
    const boards = await Board.find();
    res.json(boards);
})

// Update
router.put('/:id', async(req, res) => {
    const board = await Board.findByIdAndUpdate(req.params.id, {title: req.body.title}, {new: true});
    res.json(board);
})

// Delete
router.delete(':/id', async(req, res) => {
    await Board.findByIdAndDelete(req.params.id);
    res.json({success: true});
})

module.exports = router;