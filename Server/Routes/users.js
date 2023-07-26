import  Express  from "express";
import { checkPass, getAllUser, getUser, resetPassword, updateBlock, updatePassWord, updateUser } from "../Controller/user.js";
const router = Express.Router();

router.get("/find", getUser)
router.get("/getAll", getAllUser)
router.post("/checkPass", checkPass)
router.post("/updatePass", updatePassWord)
router.post("/resetPass", resetPassword)
router.put("/update", updateUser)
router.put("/updateBlock", updateBlock)

export default router