import  Express  from "express";
import { getImagePet, getImagesById } from "../Controller/image.js";
const router = Express.Router();

router.get("/getImagePost/:idPost",getImagesById )
router.get("/getImagePet",getImagePet )

export default router