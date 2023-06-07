import { nanoid } from "nanoid";
import { db } from "../connectbd.js";
import Jwt from "jsonwebtoken";
import moment from "moment/moment.js";

export const getConversation = (req, res) =>{
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("not logged in!");
    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        
        const query = `SELECT DISTINCT p.idconversation, p.user_id, c.nameconversation
                    FROM participants as p 
                    JOIN conversation AS c ON p.idconversation = c.idconversation
                    WHERE p.idconversation IN (
                    SELECT idconversation
                    FROM participants
                    WHERE user_id = ?
                    ) AND p.user_id != ?
        `;
        db.query(query, [userInfo.id, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    });
} 
export const addConversation = async (req, res) => {
    const token = req.cookies.accessToken;
    const id = nanoid(10);
    if (!token) return res.status(401).json("not logged in!");

    Jwt.verify(token, "secretkey", async (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");

        const query =
            "INSERT INTO conversation (`idconversation`, `idusercreate`, `nameconversation`, `created_at`) VALUES (?)";
        const values = [
            id,
            userInfo.id,
            req.body.nameConversation,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        ];

        try {
            await new Promise((resolve, reject) => {
                db.query(query, [values], (err, data) => {
                    if (err) return reject(err);
                    resolve(data);
                });
            });

            const paticipantQuery =
                "INSERT INTO participants (`idconversation`,`user_id`) VALUES (?)";
            const listPaticipant = [...req.body.paticipant, userInfo.id]
            for(const paticipant of listPaticipant)
            {   
                const valuePaticipant = [
                    id,
                    paticipant,
                ];
                 await new Promise((resolve, reject) => {
                    db.query(paticipantQuery, [valuePaticipant], (err, data) => {
                        if (err) return reject(err);
                        resolve(data);
                    });
                });
            }

            return res.status(200).json("create conversation and participant successfully");
        } catch (error) {
            return res.status(500).json(error);
        }
    });
};

export const getParticipantByID = (req, res) =>{
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("not logged in!");
    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        
        const query = `
            SELECT * FROM dbpetsocial.participants as p WHERE idconversation = ?AND p.user_id != ?`;
        db.query(query, [req.query.idconversation, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    });
} 
 

export const addMemberConversation = (req, res) =>{
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("not logged in!");
    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        
        const query = `
            INSERT INTO paticipants ('idconversation', 'user_id') VALUES (?)
        `;
        const values = [
            req.body.idConversation,
            req.body.idUser
        ]
        db.query(query, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("add member sussessfully");
        });
    });
} 