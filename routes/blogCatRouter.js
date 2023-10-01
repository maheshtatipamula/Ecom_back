const express = require("express");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const {
  createBCategory,
  updateBCategory,
  deleteBCategory,
  getBCategory,
  getAllBCategories,
} = require("../controllers/blogCatCtrl");

const router = express.Router();

router.post("/createbCategory", authMiddleware, isAdmin, createBCategory);
router.put("/updatebCategory/:id", authMiddleware, isAdmin, updateBCategory);
router.delete("/deletebCategory/:id", authMiddleware, isAdmin, deleteBCategory);
router.get("/getbCategory/:id", authMiddleware, isAdmin, getBCategory);
router.get("/allbcategories", authMiddleware, isAdmin, getAllBCategories);

module.exports = router;
