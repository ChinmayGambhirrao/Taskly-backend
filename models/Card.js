const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  listId: { type: mongoose.Schema.Types.ObjectId, ref: "List", required: true },
});
module.exports = mongoose.model("Card", CardSchema);
