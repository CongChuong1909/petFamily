import  Express  from "express";
import { addCategoryPost, getAllCategory, getCategoryPost } from "../Controller/category.js";
const router = Express.Router();

router.get("/",getAllCategory)
router.get("/getById",getCategoryPost)
router.post("/addCate",addCategoryPost)
export default router