import  Express  from "express";
import { getNotificationByUser, updateNotification } from "../Controller/notification.js";
const router = Express.Router();

router.get("/",getNotificationByUser )
router.put("/update",updateNotification )

export default router