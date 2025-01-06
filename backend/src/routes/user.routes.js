import express from "express";
import {
  deleteUser,
  getAllUsers,
  loginUser,
  logoutUser,
  registerUser,
  updateProfile,
  updateUser,
} from "../controllers/user.controllers.js";
// import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.route("/users/register").post(registerUser);
router.route("/users/login").post(loginUser);
router.route("/users/logout").post(logoutUser);
router.route("/users/:id").post(deleteUser);
router.route("/get-users").get(getAllUsers);
router.route("/users/:id").put(updateUser);
router.route("/edit-profile").patch(updateProfile);

// Apply verifyToken middleware to routes that require authentication
// router
//   .route("/protected-route", { withCredentials: true })
//   .get(verifyToken, (req, res) => {
//     res.status(200).json({ message: "Access granted", userId: req.userId });
//   });

export default router;
