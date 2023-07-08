import  Express  from "express";
import { getList, addShare } from "../Controller/share.js";
const router = Express.Router();


router.get("/", getList)
router.post("/addShare", addShare)

export default router