import { nanoid } from "nanoid";
import { db } from "../connectbd.js";
import Jwt from "jsonwebtoken";
import moment from "moment/moment.js";
export const getNotificationByUser = (req, res) =>{
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("not logged in!");
    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        
        const query = ` SELECT * FROM notification WHERE iduser = ? ORDER BY CASE WHEN status = 1 THEN 0 ELSE 1 END ASC, created_at DESC`;
        db.query(query, [userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    });

} 
export const updateNotification = (req, res) =>{
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("not logged in!");
    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        
        const query = `UPDATE notification SET status = 0 WHERE idnotification = ?`;
        db.query(query, [req.query.idnotification], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json('has been read');
        });
    });

} 
