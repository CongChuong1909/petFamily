import { Random } from "random-js";
import { db } from "../connectbd.js";
import Jwt from "jsonwebtoken"; 
import moment from "moment";
import { nanoid } from "nanoid";
export const getComment = (req, res) =>{

        const query = `SELECT DISTINCT c.*, u.idUser, name, avatar FROM comment AS c 
        JOIN users AS u ON (u.idUser = c.iduser) 
        WHERE c.idpost = ?
        ORDER BY c.date_create DESC `;
        db.query(query, [req.query.postId], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
}
export const addComment = (req, res) => {
    const token = req.cookies.accessToken;
    const random = new Random();
    const id = random.integer(100000, 999999);
    const idnoti = nanoid(10);
    if (!token) return res.status(401).json("not logged in!");
    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        const query = "INSERT INTO comment (`idComment`, `iduser`, `idpost`, `content`, `date_create`) VALUES (?)";
        const values = [
            id,
            userInfo.id,
            req.body.idPost,
            req.body.content,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
          ];
        db.query(query, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            else{
                if (userInfo.id !== req.body.idUserPost) {
                    console.log(userInfo);
                    const queryNoti = "INSERT INTO notification (`idnotification`, `idsender`, `iduser`, `content`, `description`, `type`,`status`, `created_at`) VALUES (?)";
                    const valuesNoti = [
                        idnoti,
                        userInfo.id,
                        req.body.idUserPost,
                        `đã bình luận bài viết của bạn: ${req.body.content}`,
                        req.body.idPost,
                        'post',
                        1,
                        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
                    ];
                    db.query(queryNoti, [valuesNoti], (err, data) => {
                        if (err) {
                            return res.status(500).json(err);
                        } else {
                            return res.status(200).json("Comment and notification has been created");
                        }
                    });
                } else {
                    return res.status(200).json("post has been liked");
                }
            }
            
        });
    });
};

export const updateComment = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("not logged in!");
    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        const query = "UPDATE comment set `content` = ? WHERE idComment = ? AND iduser = ?";
        console.log(req.body.content,req.body.idComment, userInfo.id);
        db.query(query, [req.body.content,req.body.idComment, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("comment has been update!");
        });
    });
};
export const deleteComment = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("not logged in!");
    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        const query = "DELETE FROM comment WHERE idComment = ? AND iduser = ?";
        db.query(query, [req.query.idComment, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("comment has been delete!");
        });
    });
};

export const getAmountComment = (req, res) =>{

    const query = `
    SELECT COUNT(*) AS total_comments
    FROM (
      SELECT idComment AS id
      FROM comment
      WHERE idpost = ?
      UNION ALL
      SELECT id_comment AS id
      FROM replycomment as r
      INNER JOIN comment as c ON r.id_comment = c.idComment
      WHERE c.idpost = ?
    ) AS all_comments;`;
    db.query(query,[req.query.idPost, req.query.idPost] ,(err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
}

export const getReplyComment = (req, res) =>{

    const query = `SELECT r.*,iduser FROM replycomment AS r 
    JOIN comment AS c ON (c.idComment = r.id_comment)  
    WHERE r.id_comment = ?
    ORDER BY r.date_create DESC`;
    db.query(query,[req.query.idComment] ,(err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
}
export const addReplyComment = (req, res) => {
    const token = req.cookies.accessToken;
    const idnoti = nanoid(10);
    if (!token) return res.status(401).json("not logged in!");
    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        const id = nanoid(10);
        const query = "INSERT INTO replycomment (`idreply`, `user`, `id_comment`, `content`, `date_create`) VALUES (?)";
        const values = [
            id,
            userInfo.id,
            req.body.idComment,
            req.body.content,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
          ];
        db.query(query, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            else{
                if (userInfo.id !== req.body.idUserReply) {
                    const queryNoti = "INSERT INTO notification (`idnotification`, `idsender`, `iduser`, `content`, `description`, `type`,`status`, `created_at`) VALUES (?)";
                    const valuesNoti = [
                        idnoti,
                        userInfo.id,
                        req.body.idUserReply,
                        `đã đáp lại bình luận của bạn: ${req.body.content}`,
                        req.body.idUserReply,
                        'post',
                        1,
                        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
                    ];
                    db.query(queryNoti, [valuesNoti], (err, data) => {
                        if (err) {
                            return res.status(500).json(err);
                        } else {
                            return res.status(200).json("post has been liked and notification has been created");
                        }
                    });
                } else {
                    return res.status(200).json("post has been liked");
                }
            }
        });
    });
};
export const updateReplyComment = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("not logged in!");
    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        const query = "UPDATE replycomment set `content` = ? WHERE idreply = ? AND iduser = ?";
        db.query(query, [req.body.content,req.body.idReply, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("comment has been update!");
        });
    });
};

export const deleteReplyComment = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("not logged in!");
    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        const query = "DELETE FROM replycomment WHERE idreply = ? AND iduser = ?";
        db.query(query, [req.query.idreply, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("comment has been delete!");
        });
    });
};
