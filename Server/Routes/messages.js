import  Express  from "express";
import { getMessages, sendMessages } from "../Controller/messages.js";
const router = Express.Router();

router.get("/",getMessages )
router.post("/sendMessage",sendMessages )

export default router