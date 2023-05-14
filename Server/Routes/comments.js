import  Express  from "express";
import { getComment, addComment, updateComment, deleteComment, getReplyComment, updateReplyComment, deleteReplyComment, addReplyComment, getAmountComment } from "../Controller/comment.js";
const router = Express.Router();

router.get("/",getComment);
router.post("/addComment",addComment);
router.put("/updateComment",updateComment);
router.delete("/deleteComment",deleteComment);
router.get("/getReply", getReplyComment);
router.post("/addReply", addReplyComment);
router.put("/updateReply", updateComment);
router.delete("/updateReply", deleteReplyComment);
router.get("/getAmount", getAmountComment);


export default router