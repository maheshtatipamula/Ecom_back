const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodb");

const createBlog = asyncHandler(async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.json({
      status: "success",
      newBlog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const newBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
    res.json({
      status: "success",
      newBlog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getBlog = await Blog.findById(id);
    const updatedViews = await Blog.findByIdAndUpdate(
      id,
      { $inc: { numViews: 1 } },
      { new: true }
    )
      .populate("likes")
      .populate("dislikes");
    res.json({
      status: "success",
      getBlog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllBlogs = asyncHandler(async (req, res) => {
  try {
    const getallBlogs = await Blog.find();
    res.json(getallBlogs);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const newBlog = await Blog.findByIdAndDelete(id);
    res.json({
      status: "success",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const likeBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  // console.log(blogId);
  validateMongodbId(blogId);
  //find blog
  const blog = await Blog.findById({ _id: blogId });
  //find login user
  // console.log(blog);
  // console.log(req.user);
  const loginUserId = req?.user._id;
  console.log(loginUserId);
  //is liked
  const isLiked = blog?.isLiked;
  //find the user if disliked the post
  const alreadyDisLiked = blog?.dislikes?.find(
    (userId) => userId?.toString() === loginUserId.toString()
  );
  if (alreadyDisLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
      },
      { new: true }
    );
    res.json(blog);
  }
  if (isLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(blog);
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { likes: loginUserId },
        isLiked: true,
      },
      { new: true }
    );
    res.json({ status: "success", blog });
  }
});

const disLikeBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  // console.log(blogId);
  validateMongodbId(blogId);
  //find blog
  const blog = await Blog.findById({ _id: blogId });
  //find login user
  // console.log(blog);
  // console.log(req.user);
  const loginUserId = req?.user._id;
  console.log(loginUserId);
  //is disliked
  const isDisLiked = blog?.isDisliked;
  //find the user if liked the post
  const alreadyLiked = blog?.likes?.find(
    (userId) => userId?.toString() === loginUserId.toString()
  );
  if (alreadyLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(blog);
  }
  if (isDisLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
      },
      { new: true }
    );
    res.json(blog);
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { dislikes: loginUserId },
        isDisliked: true,
      },
      { new: true }
    );
    res.json({ status: "success", blog });
  }
});

module.exports = {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlogs,
  deleteBlog,
  likeBlog,
  disLikeBlog,
};
