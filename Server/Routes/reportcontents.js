import  Express  from "express";
import { getList, addReport, updateReport } from "../Controller/reportcontent.js";
const router = Express.Router();


router.get("/getList", getList)
router.post("/addReport", addReport)
router.put("/updateReport", updateReport)
// router.put("/deleteReport", deleteReport)

export default router