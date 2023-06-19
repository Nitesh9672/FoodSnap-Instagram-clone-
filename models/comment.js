const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  description: String,
  reply: [
    {
      type: Schema.Types.ObjectId,
      ref: "Reply",
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "posts",
  },
  likesCount: Number,
  replyCount: Number,
});
module.exports = mongoose.model("Comments", commentSchema);
