const express = require("express");
const router = express.Router();
const path = require("path");

const controller = require("../controller/post.js");

router.get("/addPost", controller.getAddPost);
router.post("/addPost", controller.postAddPost);
router.get("/", controller.getPost);
router.post("/deletePost", controller.postDeletePost);
router.get("/updatePost", controller.getUpdatePost);
router.post("/updatePost", controller.postUpdatePost);
router.post("/addComment", controller.postAddComment);
router.get("/showComment", controller.getShowComment);
router.post("/getLikes", controller.postgetLikes);
router.post("/addReply", controller.postAddReply);

//mongoose

// router.get("/posts-2", controller.getPost2);
// router.get("/searchpost", controller.getSearchpost);
// router.post("/searchpost", controller.postSearchpost);

module.exports = router;
