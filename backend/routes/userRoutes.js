import express from "express";
import userController from "../controllers/userController.js";
const router = express.Router();

router.post("/register",userController.register)
router.post("/login",userController.login)
router.get("/getAll",userController.getAllUsers)
router.delete("/delete",userController.deleteUser)
router.patch("/edit",userController.editUser)

export default router