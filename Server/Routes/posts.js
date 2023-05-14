import  Express  from "express";
import { addPosts, getPosts , getAllPostByUser, updatePost} from "../Controller/post.js";
const router = Express.Router();


router.get("/getAllPublic", getPosts)
router.post("/addPost", addPosts)
router.get("/getAllByUser", getAllPostByUser)
router.put("/updatePost", updatePost)

export default router