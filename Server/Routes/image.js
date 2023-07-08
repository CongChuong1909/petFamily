import  Express  from "express";
import { getImagePet, getImageUser, getImagesById } from "../Controller/image.js";
const router = Express.Router();

router.get("/getImagePost/:idPost",getImagesById )
router.get("/getImagePet",getImagePet )
router.get("/getImageUser",getImageUser )

export default router