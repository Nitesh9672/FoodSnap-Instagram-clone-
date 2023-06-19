const mongoose = require("mongoose");
const { Schema } = mongoose;

const replySchema = new Schema({
  des: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
});
module.exports = mongoose.model("Reply", replySchema);