const express = require('express');
const router = express.Router();
const List = require('../models/List');

// Create a list in a board
router.post('/', async (req, res) => {
    const list = new List({title: req.body.title, boardId: req.body.boardId});
    await list.save();
    res.json(list);
})

// Get all lists for a board
router.get('/', async (req, res) => {
    const {boardId} = req.query;
    const lists = await List.find({boardId});
    res.json(lists);
})

// Update a list
router.get('/:id', async(req, res) => {
    const list = await List.findByIdAndUpdate(req.params.id, {title: req.body.title}, {new: true});
    res.json(list);
})

// Delete a list
router.delete('/:id', async(req, res) => {
    await List.findByIdAndDelete(req.params.id);
    res.json({success: true});
})

module.exports = router;