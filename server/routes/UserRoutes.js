const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserDetails,
  updateUserPassword,
  updateUserProfile,
  getAllUsers,
  getSingleUser,
  updateRole,
  deleteUser
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
.put(isAuthenticatedUser, updateUserPassword)

router
.route("/me/update")
.put(isAuthenticatedUser, updateUserProfile)

router
.route("/admin/users")
.get(isAuthenticatedUser, getAllUsers)

router
.route("/admin/users/:id")
.get(isAuthenticatedUser, getSingleUser)
.put(isAuthenticatedUser, updateRole)
.delete(isAuthenticatedUser, deleteUser)

module.exports = router;
