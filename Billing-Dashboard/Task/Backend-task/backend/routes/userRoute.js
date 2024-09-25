const express = require("express");
const { registerUser, loginUser, getAllUser, updateUser, deleteUser, getUserDetails, logout } = require("../controller/userController");
// const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/details").get(getAllUser);
router.route('/details/:id')
  .put(updateUser)
  .delete(deleteUser)
  .get(getUserDetails);

module.exports = router;