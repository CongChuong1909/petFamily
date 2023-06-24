import { db } from "../connectbd.js";
import Jwt from "jsonwebtoken";
import moment from "moment";
import { nanoid } from "nanoid";
export const getList = (req, res) => {
        const query = `SELECT c.*, u.name, u.avatar, u.date_create FROM customerfeedback AS c JOIN profileveterinarian as p ON c.id_veterinarian = p.id_veterinarian INNER JOIN users as u ON c.iduser = u.idUser WHERE p.id_veterinarian = ? ORDER BY c.created_at DESC`;
        db.query(query, [req.query.idVerterinarian], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
};
export const addRating = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("not logged in!");
    const id = nanoid(10);
    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        const query =
            "INSERT INTO customerfeedback (`idfeedback`,`iduser`, `id_veterinarian`, `rating`, `comment`, `created_at`,`title`) VALUES (?)";
        const values = [
            id,
            userInfo.id,
            req.body.idVeterinarian,
            req.body.rating,
            req.body.comment,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            req.body.title,
        ];
        db.query(query, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("rating has been created!");
        });
    });
};

export const updateRating = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("not logged in!");
    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        const query =
            "UPDATE customerfeedback SET `rating` = ?, `comment` = ?, `title` = ? WHERE idfeedback = ? AND iduser = ?";
        const values = [
            req.body.rating,
            req.body.comment.replace(/'/g, "\\'"),
            req.body.title,
            req.body.idfeedback,
            userInfo.id
        ];
        //////
        ///status: 1: đang báo cáo
        ///status: 2: bỏ qua
        ///status: 0: xóa và thông báo
        console.log(query);
        db.query(query, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("rating has been updated!");
        });
    });
};
