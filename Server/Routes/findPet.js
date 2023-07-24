import  Express  from "express";
import { addPostFind, updateStatus } from "../Controller/findPet.js";
const router = Express.Router();

router.post("/add",addPostFind);
router.put("/update",updateStatus);


export default router