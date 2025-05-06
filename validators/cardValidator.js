const zod = require("zod");

exports.cardSchema = zod.object({
  title: zod.string().min(1, "Title is required"),
  descrption: zod.string().optional(),
  listId: zod.string().min(1, "listId is required"),
});
