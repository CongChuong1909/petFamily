import { db } from "../connectbd.js";
import Jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
export const getUser = (req, res) =>{
    const query = `SELECT * FROM users WHERE idUser = ?`;
    db.query(query,[req.query.idUser] ,(err, data) => {
        if (err) return res.status(500).json(err);
        const {password, ...info} = data[0];
        return res.status(200).json(info);
    }); 
}
export const checkPass = (req,res)=>{
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("not logged in!");
    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        const query = `SELECT password FROM users WHERE idUser = ?`
        db.query(query, [ userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            if(bcrypt.compareSync(req.body.password, data[0].password))
                return res.status(200).json("password đúng");
            else{
                return res.status(403).json("password sai");
            }
        });
    });
}

export const updatePassWord = (req, res)=>{
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("not logged in!");
    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        const query = `UPDATE users SET password = ? WHERE idUser = ?`
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        db.query(query, [hashedPassword, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("update password success!");
        });
    });
}

export const resetPassword = (req, res)=>{
    
    const query = `UPDATE users SET password = ? WHERE idUser = ?`
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    db.query(query, [hashedPassword, req.body.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("update password success!");
    });
}
export const getAllUser = (req, res) =>{
    const query = `SELECT * FROM users`;
    db.query(query,(err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    }); 
}

export const updateUser = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("not logged in!");
    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        const query = "UPDATE users set `name` = ?, `avatar` = ?, address = ?, phoneNumber = ?, gender = ?, birthday = ? WHERE iduser = ?";
        // console.log(req.body.name,req.body.avatar, req.body.address, req.body.phoneNumber, userInfo.id);
        db.query(query, [req.body.name,req.body.avatar, req.body.address, req.body.phoneNumber, req.body.gender, req.body.birthday, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("user has been update!");
        });
    });
};

export const updateBlock = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("not logged in!");
    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        const query = "UPDATE users set `status` = ? WHERE iduser = ?";
        // console.log(req.body.name,req.body.avatar, req.body.address, req.body.phoneNumber, userInfo.id);
        db.query(query, [req.body.status, req.body.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("user has been update!");
        });
    });
};