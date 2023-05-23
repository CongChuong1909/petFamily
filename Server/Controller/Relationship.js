import { nanoid } from "nanoid";
import { db } from "../connectbd.js";
import Jwt from "jsonwebtoken";
import moment from "moment/moment.js";
export const getRelationships = (req, res) =>{
    const query = `SELECT * FROM friendlist WHERE user_follower = ? `;
    db.query(query, [req.query.followedUserId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
}
export const getAllRelationships = (req, res) =>{
    const query = `SELECT * FROM friendlist`;
    db.query(query, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
}
export const addRelationship = (req, res) => {
    const token = req.cookies.accessToken;
    const id = nanoid(10);
    if (!token) return res.status(401).json("not logged in!");
    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        
        const query = "INSERT INTO friendlist (`id_friend_list`, `user_followed`, `user_follower`) VALUES (?)";
        const values = [
            id,
            req.body.idUser,
            userInfo.id,
          ];
        db.query(query, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Following");
        });
    });
};
export const deleteRelationship = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("not logged in!");
    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        
        const query = "DELETE FROM friendlist WHERE `user_follower` = ? AND `user_followed` = ?";

        db.query(query, [userInfo.id, req.query.idUser], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("unFollow!");
        });
    });
};