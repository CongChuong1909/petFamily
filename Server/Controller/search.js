import { nanoid } from "nanoid";
import { db } from "../connectbd.js";
import Jwt from "jsonwebtoken";
import moment from "moment/moment.js";
export const getHistory = (req, res) =>{
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("not logged in!");
    Jwt.verify(token, "secretkey", (err, userInfo) => {
        const query = `SELECT s.*, uu.name, uu.avatar FROM search AS s 
        JOIN users AS u ON (s.iduser = u.idUser) 
        LEFT JOIN users AS uu on (s.user = uu.idUser)
        WHERE s.idUser = ?
        ORDER BY s.date_created DESC`;
        db.query(query, [userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    });
}
export const findUser = (req, res) =>{
    const searchTerm = req.query.searchTerm;
        const query = `SELECT * FROM users WHERE LOWER(name) LIKE '%${searchTerm.toLowerCase()}%'`;
        db.query(query, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
}
export const findPost = (req, res) =>{
    const searchTerm = req.query.searchTerm;
    const keywords = searchTerm.toLowerCase().split(' ');
    const searchConditions = keywords.map(keyword => `LOWER(p.textcontent) LIKE '%${keyword.replace(/%/g, '!%').replace(/_/g, '!_')}%'`);
    const query = `SELECT p.*, u.idUser, u.name, u.avatar FROM posts AS p JOIN users AS u ON (u.idUser = p.userid) WHERE ${searchConditions.join(' AND ')}`;
        db.query(query, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
}
export const addHistory = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("not logged in!");
    const id = nanoid(10);
    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");

        const queryCheck = `SELECT * FROM search WHERE idUser = ? AND (user = ? OR history = ?)`;
        const valuesCheck = [userInfo.id, req.body.user, req.body.history];
        db.query(queryCheck, valuesCheck, (err, data) => {
            if (err) return res.status(500).json(err);

            if (data.length > 0) {
                const queryUpdate = `UPDATE search SET date_created = ? WHERE idsearch = ?`;
                const valuesUpdate = [
                    moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                    data[0].idsearch
                ];
                db.query(queryUpdate, valuesUpdate, (err, updatedData) => {
                    if (err) return res.status(500).json(err);
                    return res.status(200).json('Search history already exists. Date updated.');
                });
            } else {
                const queryInsert = `INSERT INTO search (idsearch, iduser, history, date_created, user) VALUES (?, ?, ?, ?, ?)`;
                const valuesInsert = [
                    id,
                    userInfo.id,
                    req.body.history,
                    moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                    req.body.user
                ];
                db.query(queryInsert, valuesInsert, (err, insertedData) => {
                    if (err) return res.status(500).json(err);
                    return res.status(200).json("Search history has been created!");
                });
            }
        });
    });
};




export const deleteHistory = (req, res) => {
    const token = req.cookies.accessToken;
    const id = nanoid(10);
    if (!token) return res.status(401).json("not logged in!");
    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        
        const query = "DELETE FROM search WHERE `idsearch` = ? AND `iduser` = ?";

        db.query(query, [req.query.idSearch, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("history delete success!");
        });
    });
};