import  Express  from "express";
import { addRelationship, deleteRelationship, getRelationships } from "../Controller/like.js";
const router = Express.Router();

router.get("/",getRelationships )
router.post("/addRelationship",addRelationship )
router.delete("/deleteRelationship",deleteRelationship )

export default router