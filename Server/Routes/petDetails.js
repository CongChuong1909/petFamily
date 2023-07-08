import  Express  from "express";
import { addData, deleteById, getByID, getFoodByID, updateFood } from "../Controller/petDetail.js";
const router = Express.Router();

router.get("/:collection/:id",getByID )
router.get("/getpetfood",getFoodByID )
router.post("/add/:collection",addData )
router.put("/updatePetFood",updateFood )
router.delete("/delete/:collection/:id",deleteById )

export default router