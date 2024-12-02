import express from "express";
import {
  registerUser,
  loginUser,
  getUserDetails,
//   getAllUsers,
} from "../controllers/user";
import authMiddleware from "../middleware/auth";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware, getUserDetails);
// router.get("/allUsers", authMiddleware, getAllUsers);

export default router;
