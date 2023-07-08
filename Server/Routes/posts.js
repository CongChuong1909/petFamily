import  Express  from "express";
import { addPosts, getPosts , getAllPostByUser, updatePost, hiddenPost, getAll, getPostByIdPost, getByCategory, getPostByPet, getPostsPagination } from "../Controller/post.js";
const router = Express.Router();


router.get("/getAllPublic", getPosts)
router.get("/getAllPublicPagination", getPostsPagination)
router.get("/getAll", getAll)
router.get("/getByID", getPostByIdPost)
router.get("/getByCategory", getByCategory)
router.get("/getAllByUser", getAllPostByUser)
router.get("/getPostByPet", getPostByPet)
router.post("/addPost", addPosts)
router.put("/updatePost", updatePost)
router.put("/hidden", hiddenPost)

export default router