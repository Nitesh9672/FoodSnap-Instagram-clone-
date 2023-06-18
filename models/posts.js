// const { ObjectId } = require("mongodb");
// const { getdb } = require("../database/scripts/database");

// const collectionName = "foodPost";

// class Posts {
//   constructor(title, imageUrl, caption) {
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.caption = caption;
//     this.commentCount = 0;
//     this.likesCount = 0;
//   }
//   save() {
//     return getdb().collection(collectionName).insertOne(this);
//   }
//   static getAllPost() {
//     return new Promise(async (resolve, reject) => {
//       try {
//         let data = await getdb().collection(collectionName).find({}).toArray();
//         console.log(data);
//         resolve(data);
//       } catch (err) {
//         reject(err);
//       }
//     });
//   }
//   static deleteOnePost(id) {
//     console.log(id);
//     return new Promise(async (resolve, reject) => {
//       try {
//         await getdb()
//           .collection(collectionName)
//           .deleteOne({ _id: new ObjectId(id) });
//         let data = getdb().collection(collectionName).find({}).toArray();
//         resolve(data);
//       } catch (err) {
//         reject(err);
//       }
//     });
//   }
//   static getOnePost(id) {
//     return new Promise(async (resolve, reject) => {
//       try {
//         let data = await getdb()
//           .collection(collectionName)
//           .find({ _id: new ObjectId(id) })
//           .toArray();
//         resolve(data[0]);
//       } catch (err) {
//         reject(err);
//       }
//     });
//   }
//   static updatePost(newPost) {
//     return new Promise(async (resolve, reject) => {
//       try {
//         const { id, title, imageUrl, caption } = newPost;
//         await getdb()
//           .collection(collectionName)
//           .updateOne(
//             { _id: new ObjectId(id) },
//             {
//               $set: {
//                 title,
//                 imageUrl,
//                 caption,
//               },
//             }
//           );
//         resolve("updated successfully");
//       } catch (err) {
//         reject(err);
//       }
//     });
//   }
//   static getLikesCount(id) {
//     return new Promise(async (resolve, reject) => {
//       try {
//         let data = await getdb()
//           .collection(collectionName)
//           .find({ _id: new ObjectId(id) })
//           .toArray();
//         console.log(data);
//         resolve(data[0].likesCount);
//       } catch (error) {
//         reject(error);
//       }
//     });
//   }
// }

// module.exports = Posts;
const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  title: String,
  imageURL: String,
  caption: String,
  hashtag: String,
  likesCount: Number,
  commentCount: Number,
  hashTagId: [
    {
      type: Schema.Types.ObjectId,
      ref: "hashTags",
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
});

module.exports = mongoose.model("posts", postSchema);
