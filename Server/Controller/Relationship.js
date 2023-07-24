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
export const addRelationshipFisrt = (req, res) => {
    const token = req.cookies.accessToken;
    const id = nanoid(10);
    const idConversation = nanoid(10);
    const idnoti = nanoid(10)

    if (!token) {
        return res.status(401).json("Not logged in!");
    }

    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) {
            return res.status(403).json("Token is not valid");
        }
        
        const query = "INSERT INTO friendlist (`id_friend_list`, `user_followed`, `user_follower`) VALUES (?, ?, ?)";
        const values = [
            id,
            req.body.idUser,
            userInfo.id,
        ];

        db.query(query, values, (err, data) => {
            if (err) {
                return res.status(500).json(err);
            }

            const queryConversation = "INSERT INTO conversation (`idconversation`, `idusercreate`, `nameconversation`, `created_at`) VALUES (?, ?, '', ?)";
            const valuesConversation = [
                idConversation,
                userInfo.id,
                moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            ];

            db.query(queryConversation, valuesConversation, (err, data) => {
                if (err) {
                    return res.status(500).json(err);
                }

                const queryParticipant = "INSERT INTO participants (`idconversation`, `user_id`) VALUES (?, ?)";
                const valuesParticipant = [
                    idConversation,
                    userInfo.id,
                ];

                db.query(queryParticipant, valuesParticipant, (err, data) => {
                    if (err) {
                        return res.status(500).json(err);
                    }

                    const queryParticipant2 = "INSERT INTO participants (`idconversation`, `user_id`) VALUES (?, ?)";
                    const valuesParticipant2 = [
                        idConversation,
                        req.body.idUser,
                    ];

                    db.query(queryParticipant2, valuesParticipant2, (err, data) => {
                        if (err) {
                            return res.status(500).json(err);
                        }
                        else{
                            if (userInfo.id !== req.body.idUser) {
                                const queryNoti = "INSERT INTO notification (`idnotification`, `idsender`, `iduser`, `content`, `description`, `type`,`status`, `created_at`) VALUES (?)";
                                const valuesNoti = [
                                    idnoti,
                                    userInfo.id,
                                    req.body.idUser,
                                    `đã bắt đầu theo dõi bạn`,
                                    'friend',
                                    'friend',
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
                                return res.status(200).json("Add relationship and create notification success!");
                            }
                        }
                    });
                });
            });
        });
    });
};

export const addRelationshipLast = (req, res) => {
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