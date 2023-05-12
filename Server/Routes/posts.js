import  Express  from "express";
import { addPosts, getPosts } from "../Controller/post.js";
const router = Express.Router();


router.get("/getAllPublic", getPosts)
router.post("/addPost", addPosts)

export default router