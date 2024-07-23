import express from "express";
import {
  register,
  login,
  logout,
  getMe,
  forgotPassword,
  resetPassword,
  updateDetails,
  updatePassword,
} from "../controllers/auth";
import { protect } from "../middleware/auth";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", protect, getMe);
router.patch("/updatedetails", protect, updateDetails);
router.patch("/updatepassword", protect, updatePassword);
router.post("/forgotpassword", forgotPassword);
router.patch("/resetpassword/:resettoken", resetPassword);

export default router;
