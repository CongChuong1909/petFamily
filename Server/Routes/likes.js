import  Express  from "express";
import { addLike, deleteLike, getLikes } from "../Controller/like.js";
const router = Express.Router();

router.get("/",getLikes )
router.post("/addLike",addLike )
router.delete("/deleteLike",deleteLike )

export default router