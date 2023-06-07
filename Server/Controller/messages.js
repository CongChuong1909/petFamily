import { nanoid } from "nanoid";
import { db } from "../connectbd.js";
import Jwt from "jsonwebtoken";
import moment from "moment/moment.js";
export const getMessages = (req, res) =>{
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("not logged in!");
    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        
        const query = ` SELECT * FROM messages WHERE idconversation = ? ORDER BY created_at ASC`;
        db.query(query, [req.query.idConversation], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    });

} 
export const sendMessages = (req, res) =>{
    const token = req.cookies.accessToken;
    const id = nanoid(10);
    if (!token) return res.status(401).json("not logged in!");
    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        
        const query = " INSERT INTO messages (`idmessage`, `idconversation`, `idsender`, `textcontent`, `created_at`) VALUES (?)";
        const values = [
            id,
            req.body.idConversation,
            userInfo.id,
            req.body.textContent,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        ]
        db.query(query, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Send message successfully");
        });
    });

} 