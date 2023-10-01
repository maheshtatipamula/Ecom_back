const express = require("express");
const {
  createProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  addToWishList,
  rating,
} = require("../controllers/productCtrl");
const { isAdmin, authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/createproduct", authMiddleware, isAdmin, createProduct);
router.get("/getproduct/:id", getProduct);
router.put("/updateproduct/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/deleteproduct/:id", authMiddleware, isAdmin, deleteProduct);
router.get("/getallproducts", getAllProducts);
router.put("/addtowishlist", authMiddleware, addToWishList);
router.put("/rating", authMiddleware, rating);

module.exports = router;
