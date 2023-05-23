import  Express  from "express";
import { addRelationship, deleteRelationship, getAllRelationships, getRelationships } from "../Controller/Relationship.js";
const router = Express.Router();

router.get("/",getRelationships )
router.get("/getAll",getAllRelationships )
router.post("/addRelationship",addRelationship )
router.delete("/deleteRelationship",deleteRelationship )

export default router