const express = require("express");
const {
  createUser,
  loginUser,
  getallUsers,
  getaUser,
  deleteaUser,
  updateaUser,
  blockUser,
  unBlockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetYourPassword,
  adminLogin,
  addTOUserWishlist,
  getWishList,
  saveAddress,
  addToCart,
  getUserCart,
  emptyCart,
} = require("../controllers/userCtrl");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/createuser", createUser);
router.post("/forgot-password-token", forgotPasswordToken);
router.put("/reset-password/:token", resetYourPassword);
router.post("/loginuser", loginUser);
router.post("/adminlogin", adminLogin);

router.put("/updatepassword", authMiddleware, updatePassword);
router.get("/getallusers", getallUsers);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/getauser/:id", authMiddleware, getaUser);
router.delete("/deleteauser/:id", deleteaUser);
router.put("/updateauser", authMiddleware, updateaUser);
router.put("/address", authMiddleware, saveAddress);

router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unBlockUser);
router.put("/addtowishlist", authMiddleware, addTOUserWishlist);
router.get("/getwishlist", authMiddleware, getWishList);
router.get("/getusercart", authMiddleware, getUserCart);

router.post("/addtocart", authMiddleware, addToCart);
router.delete("/clearcart", authMiddleware, emptyCart);

module.exports = router;
