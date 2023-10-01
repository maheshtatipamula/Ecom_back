const express = require("express");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getAllCategory,
} = require("../controllers/categoryCtrl");

const router = express.Router();

router.post("/createcategory", authMiddleware, isAdmin, createCategory);
router.put("/updatecategory/:id", authMiddleware, isAdmin, updateCategory);
router.delete("/deletecategory/:id", authMiddleware, isAdmin, deleteCategory);
router.get("/getcategory/:id", authMiddleware, isAdmin, getCategory);
router.get("/allcategories", authMiddleware, isAdmin, getAllCategory);

module.exports = router;
