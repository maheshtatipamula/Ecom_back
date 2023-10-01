const express = require("express");
const {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlogs,
  deleteBlog,
  likeBlog,
  disLikeBlog,
} = require("../controllers/blogCtrl");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/createblog", authMiddleware, isAdmin, createBlog);
router.put("/updateblog/:id", authMiddleware, isAdmin, updateBlog);
router.get("/getblog/:id", authMiddleware, isAdmin, getBlog);
router.get("/getallblogs", authMiddleware, getAllBlogs);
router.delete("/deleteblog/:id", authMiddleware, isAdmin, deleteBlog);
router.put("/likes", authMiddleware, isAdmin, likeBlog);
router.put("/dislikes", authMiddleware, isAdmin, disLikeBlog);

module.exports = router;
