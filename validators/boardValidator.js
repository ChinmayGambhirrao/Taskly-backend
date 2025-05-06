const zod = require("zod");

exports.boardSchema = zod.object({
  title: zod.string().min(1, "Title is required"),
});
