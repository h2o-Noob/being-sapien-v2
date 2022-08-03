const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserDetails,
  updateUserPassword,
  updateUserProfile
} = require("../controllers/userController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router
.route("/register")
.post(registerUser)

router
.route("/login")
.post(loginUser)

router
.route("/logout")
.get(logoutUser)

router
.route("/me")
.get(isAuthenticatedUser, getUserDetails)

router
.route("/me/password/update")
.post(isAuthenticatedUser, updateUserPassword)

router
.route("/me/update")
.post(isAuthenticatedUser, updateUserProfile)

module.exports = router;
