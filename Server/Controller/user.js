import { db } from "../connectbd.js";
import Jwt from "jsonwebtoken";
export const getUser = (req, res) =>{
    const query = `SELECT * FROM users WHERE idUser = ?`;
    db.query(query,[req.query.idUser] ,(err, data) => {
        if (err) return res.status(500).json(err);
        const {password, ...info} =data[0];
        return res.status(200).json(info);
    });
}

export const updateUser = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("not logged in!");
    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        const query = "UPDATE users set `name` = ?, `avatar` = ?, address = ?, phoneNumber = ? WHERE iduser = ?";
        // console.log(req.body.name,req.body.avatar, req.body.address, req.body.phoneNumber, userInfo.id);
        db.query(query, [req.body.name,req.body.avatar, req.body.address, req.body.phoneNumber, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("user has been update!");
        });
    });
};