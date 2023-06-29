import  Express  from "express";
import {  addRelationshipFisrt, addRelationshipLast, deleteRelationship, getAllRelationships, getRelationships } from "../Controller/Relationship.js";
const router = Express.Router();

router.get("/",getRelationships )
router.get("/getAll",getAllRelationships )
router.post("/addRelationshipFirst",addRelationshipFisrt )
router.post("/addRelationshipLast",addRelationshipLast )
router.delete("/deleteRelationship",deleteRelationship )

export default router