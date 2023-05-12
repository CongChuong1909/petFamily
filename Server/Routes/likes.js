import  Express  from "express";
import { getImagesById } from "../Controller/image.js";
const router = Express.Router();

router.get("/getImagePost",getImagesById )

export default router