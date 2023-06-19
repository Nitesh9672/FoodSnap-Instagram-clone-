const Posts = require("../models/posts");

// const Comments = require("../models/comment");
// const Likes = require("../models/likes");

// const Post = require("../models/post-2");
const Post = require("../models/posts");
const HashTag = require("../models/hashTags");
const Users = require("../models/users");
const async = require("hbs/lib/async");
const Comment = require("../models/comment");

module.exports.getAddPost = (req, res, next) => {
  // console.log(req.user);
  res.render("addpost");
};

// module.exports.postAddPost = async (req, res, next) => {
//   try {
//     const { title, imageURL, caption } = req.body;
//     const post = new Posts(title, imageURL, caption);
//     await post.save();
//     res.redirect("/posts");
//   } catch {
//     next();
//   }
// };

//mongoose
module.exports.postAddPost = async (req, res, next) => {
  try {
    console.log(req.user);
    const { title, imageURL, caption, hashtag } = req.body;
    const newPost = new Post({
      title,
      imageURL,
      caption,
      hashtag,
      user: req.user,
    });
    await newPost.save();
    Users.findOne({ _id: req.user._id }).then((user) => {
      user.posts.push(newPost._id);
      user.save();
    });

    const hashtagArray = hashtag.split(" ");
    hashtagArray.forEach((h) => {
      // console.log(h);
      const newhashTag = new HashTag({
        name: h,
        postId: newPost._id,
      });
      newhashTag.save();
    });
    res.redirect("/posts");
  } catch {
    next();
  }
};
//mongoose
// module.exports.getPost2 = (req, res, next) => {
//   Post.find({}).then((data) => {
//     res.render("post-2", {
//       data,
//     });
//   });
// };

module.exports.getPost = async (req, res, next) => {
  // console.log(req.user);
  try {
    Post.find({})
      .populate("user")
      .then((data) => {
        // console.log(data);
        res.render("post", {
          data,
        });
      });
  } catch (error) {}
};
module.exports.postDeletePost = async (req, res, next) => {
  const { idAttribute } = req.body;
  try {
    await Post.deleteOne({ _id: idAttribute });
    let posts = await Post.find({});
    console.log(posts);
    res.send(posts);
  } catch (err) {
    console.log(err);
  }
};
module.exports.getUpdatePost = (req, res, next) => {
  const { id } = req.query;
  console.log(id);
  Post.findOne({ _id: id })
    .then((data) => {
      1;
      res.render("updatePost", {
        data,
      });
    })
    .catch((err) => next(err));
};
module.exports.postUpdatePost = async (req, res, next) => {
  const { id, title, imageURL, caption } = req.body;

  try {
    const filter = { _id: id };
    let post = await Post.findOne(filter);

    post.title = title;
    post.imageURL = imageURL;
    post.caption = caption;
    await post.save();

    res.redirect("/posts");
  } catch (err) {
    console.log(err);
  }
};

module.exports.postAddComment = async (req, res, next) => {
  const { post_id, comment } = req.body;
  try {
    const newComment = new Comment({
      description: comment,
      user: req.user,
      post: post_id,
      likesCount: 0,
      replyCount: 0,
    });
    newComment.save();
    await Post.findOneAndUpdate(
      { _id: post_id },
      { $inc: { commentCount: 1 } }
    ).exec();
    res.redirect("/posts");
  } catch (err) {
    console.log(err);
  }
};
module.exports.getShowComment = async (req, res, next) => {
  const { id } = req.query;
  try {
    let comments = await Comment.find({ post: id }).populate("user");
    let data = await Post.findOne({ _id: id }).populate("user");
    res.render("comments", { data, comments });
  } catch (error) {
    console.log(error);
  }
  // Comment.getAllComment(id).then(async (comments) => {
  //   let post_id = comments[0].post_id;
  //   console.log(post_id);
  //   try {
  //     let data = await Posts.getOnePost(post_id);
  //     console.log(data);
  //     res.render("comments", { comments, data });
  //   } catch (err) {
  //     next(err);
  //   }
  // });
};
module.exports.postgetLikes = (req, res, next) => {
  const { idAtr } = req.body;
  let newLike = new Likes(idAtr);
  newLike
    .save()
    .then((count) => {
      console.log(count);
      // res.send(count);
    })
    .catch((err) => next(err));
};

module.exports.postAddReply = (req, res, next) => {
  const { post_id, comment_id, reply } = req.body;
  const obj = new Comments();
  Comments.addReply(comment_id, reply)
    .then((replyCount) => {
      console.log(replyCount);
      res.redirect(`/posts/showComment?id=${post_id}`);
    })
    .catch((err) => {
      next(err);
    });
};
//mongoose
module.exports.getSearchpost = (req, res, next) => {
  res.render("searchpost");
};
module.exports.postSearchpost = (req, res, next) => {
  const { search } = req.body;
  HashTag.find({ name: search })
    .populate("postId")
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.log(err));
};
