import express from "express";
import { loginUser, registerUser } from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/loginUser", loginUser);

export default userRouter;
