import  Express  from "express";
import { getConversation, addConversation,addMemberConversation, getParticipantByID } from "../Controller/conversation.js";
const router = Express.Router();

router.get("/",getConversation )
router.post("/addConversation",addConversation )
router.post("/addMemberConversation", addMemberConversation)
router.get("/getParticipants", getParticipantByID)

export default router