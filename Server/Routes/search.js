import  Express  from "express";
import { getHistory, addHistory, deleteHistory, findUser, findPost } from "../Controller/search.js";
const router = Express.Router();


router.get("/", getHistory)
router.get("/finduser", findUser)
router.get("/findpost", findPost)
router.post("/add", addHistory)
router.delete("/delete", deleteHistory)

export default router