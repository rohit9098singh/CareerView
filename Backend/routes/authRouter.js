
import express from "express"
import { changePassword, checkUserAuth, deleteAccount, forgotPassword, login, logout, register, resetPassword } from "../controllers/authControllers.js";
import authenticateUser from "../middleware/authMiddleware.js";



const router=express.Router();

router.post("register",register)
router.post("login",login)
router.post("/logout",logout)
// router.post("/verify-email/:token", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/change-password",authenticateUser,changePassword);
router.get("/verify-auth",authenticateUser,checkUserAuth);
router.delete("/delete-account",authenticateUser,deleteAccount)

export default router;