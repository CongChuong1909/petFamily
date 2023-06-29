import  Express  from "express";
import { addPosts, getPosts , getAllPostByUser, updatePost, hiddenPost, getAll, getPostByIdPost } from "../Controller/post.js";
const router = Express.Router();


router.get("/getAllPublic", getPosts)
router.get("/getAll", getAll)
router.get("/getByID", getPostByIdPost)
router.post("/addPost", addPosts)
router.get("/getAllByUser", getAllPostByUser)
router.put("/updatePost", updatePost)
router.put("/hidden", hiddenPost)

export default router