import  Express  from "express";
import { getList, addRating, updateRating } from "../Controller/rating.js";
const router = Express.Router();


router.get("/getList", getList)
router.post("/addRating", addRating)
router.put("/updateRating", updateRating)

export default router