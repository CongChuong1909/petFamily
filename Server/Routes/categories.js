import  Express  from "express";
import { getAllCategory, getCategoryPost } from "../Controller/category.js";
const router = Express.Router();

router.get("/",getAllCategory)
router.get("/getById",getCategoryPost)
export default router