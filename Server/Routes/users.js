import  Express  from "express";
import { getUser } from "../Controller/user.js";
const router = Express.Router();

router.get("/find/:userId", getUser)

export default router