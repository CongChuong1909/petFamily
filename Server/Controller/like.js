import { nanoid } from "nanoid";
import { db } from "../connectbd.js";
import Jwt from "jsonwebtoken";
import moment from "moment/moment.js";
export const getLikes = (req, res) =>{
    const query = `SELECT DISTINCT l.* , name, avatar FROM likepost AS l 
    JOIN users AS u ON (u.idUser = l.iduser) 
    WHERE l.idpost = ?
    ORDER BY l.date_create DESC `;
    db.query(query, [req.query.postId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
}
export const getAllLikes = (req, res) =>{
    const query = `SELECT COUNT(l.id_like_post) AS total_likes
    FROM users AS u
    JOIN posts AS p ON u.idUser = p.userid
    LEFT JOIN likepost AS l ON p.idposts = l.idpost
    WHERE u.idUser = ? AND p.post_status = 1;`;
    db.query(query, [req.query.idUser], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
}
export const addLike = (req, res) => {
    const token = req.cookies.accessToken;
    const id = nanoid(10);
    if (!token) return res.status(401).json("not logged in!");
    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        
        const query = "INSERT INTO likepost (`id_like_post`, `iduser`, `idpost`, `date_create`) VALUES (?)";
        const values = [
            id,
            userInfo.id,
            req.body.idPost,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
          ];
        db.query(query, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("post has been liked");
        });
    });
};



export const deleteLike = (req, res) => {
    const token = req.cookies.accessToken;
    const id = nanoid(10);
    if (!token) return res.status(401).json("not logged in!");
    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        
        const query = "DELETE FROM likepost WHERE `iduser` = ? AND `idpost` = ?";

        db.query(query, [userInfo.id, req.query.idPost], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Post has been disliked!");
        });
    });
};