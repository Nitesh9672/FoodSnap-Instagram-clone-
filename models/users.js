const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  password: String,
  facebookId: String,
  token: String,
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "posts",
    },
  ],
});

module.exports = mongoose.model("Users", userSchema);
