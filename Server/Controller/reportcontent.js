import { db } from "../connectbd.js";
import Jwt from "jsonwebtoken";
import moment from "moment";
import { nanoid } from "nanoid";
export const getList = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("not logged in!");
    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        const query = `SELECT r.*, u.name AS nameReporter, u.avatar AS avatarReporter, 
            upost.name AS namePoster, upost.avatar AS avatarPoster,
            p.textcontent FROM reportcontent AS r 
            JOIN posts AS p ON r.idpost = p.idposts
            JOIN users AS upost ON p.userid = upost.idUser 
            INNER JOIN users as u ON r.iduser = u.idUser
            WHERE r.status = ?
            ORDER BY r.created_at DESC
            `;
        db.query(query,[req.query.status], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    })
    
};
export const addReport = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("not logged in!");
    const id = nanoid(10);
    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        const query =
            "INSERT INTO reportcontent (`idreport`,`idpost`, `iduser`, `content`, `description`, `status`, `created_at`) VALUES (?)";
        const values = [
            id,
            req.body.idpost,
            userInfo.id,
            req.body.content,
            req.body.decription,
            1,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        ];
        db.query(query, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("report has been created!");
        });
    });
};

export const updateReport = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("not logged in!");
    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        const query =
            "UPDATE reportcontent SET `status` = ? WHERE idreport = ?";

        db.query(query, [req.body.status, req.body.idreport], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("report has been updated!");
        });
    });
};