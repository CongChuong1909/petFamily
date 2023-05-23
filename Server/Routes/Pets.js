import  Express  from "express";
import { getPets, deletePet, addPet, updatePet, getPetFromPost } from "../Controller/pet.js";
const router = Express.Router();

router.get("/",getPets )
router.get("/post",getPetFromPost )
router.post("/addPet",addPet )
router.put("/updatePet",updatePet )
router.delete("/deletePet",deletePet )

export default router