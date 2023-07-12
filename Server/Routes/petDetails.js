import  Express  from "express";
import { addData, deleteById, getByID, getCharacterByID, getFoodByID, updateCharacter, updateFood } from "../Controller/petDetail.js";
const router = Express.Router();

router.get("/:collection/:id",getByID )
router.get("/getpetfood",getFoodByID )
router.put("/updatePetFood",updateFood )
router.get("/getpetcharacter",getCharacterByID )
router.put("/updatePetCharacter",updateCharacter )
router.post("/add/:collection",addData )
router.delete("/delete/:collection/:id",deleteById )

export default router