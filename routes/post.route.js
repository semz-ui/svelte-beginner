const express = require("express");
const {
  createPost,
  getUserPosts,
  updateUserPosts,
  deleteUserPosts,
} = require("../controllers/post.controller");
const protectRoute = require("../middleware/protect.route");

const router = express.Router();

router.post("/create", protectRoute, createPost);
router.get("/all/:email", protectRoute, getUserPosts);
router.patch("/update", protectRoute, updateUserPosts);
router.delete("/delete/:id", protectRoute, deleteUserPosts);

module.exports = router;
