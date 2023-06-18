const mongoose = require("mongoose");
const { Schema } = mongoose;

const hashTagSchema = new Schema({
  name: String,
  postId: [
    {
      type: Schema.Types.ObjectId,
      ref: "posts",
    },
  ],
});

module.exports = mongoose.model("hashTags", hashTagSchema);
