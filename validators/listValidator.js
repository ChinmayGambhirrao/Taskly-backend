const zod = require("zod");

exports.listSchema = zod.object({
  title: zod.string().min(1, "Title is required"),
  boardId: zod.string().min(1, "boardId is required"),
});
