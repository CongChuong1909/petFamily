import  Express  from "express";
import { getUser, updateUser } from "../Controller/user.js";
const router = Express.Router();

router.get("/find", getUser)
router.put("/update", updateUser)

export default router