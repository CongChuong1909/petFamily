import  Express  from "express";
import { getAllUser, getUser, updateBlock, updateUser } from "../Controller/user.js";
const router = Express.Router();

router.get("/find", getUser)
router.get("/getAll", getAllUser)
router.put("/update", updateUser)
router.put("/updateBlock", updateBlock)

export default router