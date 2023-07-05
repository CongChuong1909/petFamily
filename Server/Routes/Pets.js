import  Express  from "express";
import { getPets, deletePet, addPet, updatePet, getPetFromPost, getAll, getPetByID } from "../Controller/pet.js";
const router = Express.Router();

router.get("/",getPets )
router.get("/getById",getPetByID )
router.get("/post",getPetFromPost )
router.get("/getAll",getAll )
router.post("/addPet",addPet )
router.put("/updatePet",updatePet )
router.delete("/deletePet",deletePet )

export default router