import  Express  from "express";
import { login, logout, register } from "../Controller/auth.js";
const router = Express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/register", register);

export default router