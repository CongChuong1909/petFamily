import  Express  from "express";
import { addLike, deleteLike, getAllLikes, getLikes } from "../Controller/like.js";
const router = Express.Router();

router.get("/",getLikes )
router.post("/addLike",addLike )
router.get("/amountById",getAllLikes)
router.delete("/deleteLike",deleteLike )

export default router