// import express from "express";
// import * as usercontroller from "../controllers/user";
// const router = express.Router();

// router.post("/register", usercontroller.createUser);
// router.get("/getuser", usercontroller.getAllUsers);
// router.get("/getuser/:id", usercontroller.getUserById);
// router.post("/login", usercontroller.loginUser);

// export default router;




import express from "express";
import { registerUser, loginUser, getUserDetails,getAllUsers } from "../controllers/user";
import authMiddleware from "../middleware/auth";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware, getUserDetails);
router.get("/allUsers",authMiddleware, getAllUsers);


export default router;
