import  Express  from "express";
import { getImagesById } from "../Controller/image.js";
const router = Express.Router();

router.get("/getImagePost/:idPost",getImagesById )

export default router