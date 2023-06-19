const { ObjectId } = require("mongodb");
const { getdb } = require("../database/scripts/database");
const Posts = require("./posts");

const collectionName = "myLikes";

class Likes {
  constructor(post_id) {
    this.post_id = post_id;
  }
  //   save() {
  //     return getdb().collection(collectionName).insertOne(this);
  //   }
  save() {
    return new Promise(async (resolve, reject) => {
      try {
        // await getdb().collection(collectionName).insertOne(this);
        await getdb()
          .collection("foodPost")
          .updateOne(
            { _id: new ObjectId(this.post_id) },
            { $inc: { likesCount: 1 } }
          );
        let count = await Posts.getLikesCount(this.post_id);
        resolve(count);
      } catch (err) {
        reject(err);
      }
    });
  }
}
module.exports = Likes;
