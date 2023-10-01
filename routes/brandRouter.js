const express = require("express");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrand,
  getAllBrand,
} = require("../controllers/brandCtrl");

const router = express.Router();

router.post("/createbrand", authMiddleware, isAdmin, createBrand);
router.put("/updatebrand/:id", authMiddleware, isAdmin, updateBrand);
router.delete("/deletebrand/:id", authMiddleware, isAdmin, deleteBrand);
router.get("/getbrand/:id", authMiddleware, isAdmin, getBrand);
router.get("/allbrands", authMiddleware, isAdmin, getAllBrand);

module.exports = router;
