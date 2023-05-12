import express from "express";
import { uploadImages } from "../Controller/upload.js";
import { uploadCloud } from "../middlewares/uploadImage.js";

const router = express.Router();

router.post("/uploadImage", uploadCloud, uploadImages.upload);

export default router;
