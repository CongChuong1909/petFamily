import  Express  from "express";
import { addNotification, getContentNotification, getNotificationByUser, updateNotification } from "../Controller/notification.js";
const router = Express.Router();

router.get("/",getNotificationByUser )
router.get("/getContent", getContentNotification)
router.put("/update",updateNotification )
router.post("/add",addNotification )

export default router