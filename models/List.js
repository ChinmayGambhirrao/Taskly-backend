const mongoose = require('mongoose');
const ListSchema = new mongoose.Schema({
    title: {type: String, required: true},
    boardId: {type: mongoose.Schema.Types.ObjectId, ref: "Board", required: true},
})

module.exports = mongoose.model('List', ListSchema);