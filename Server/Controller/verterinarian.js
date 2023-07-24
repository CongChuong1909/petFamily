import { db } from "../connectbd.js";
import Jwt from "jsonwebtoken";
import moment from "moment";
import { nanoid } from "nanoid";
export const getList = (req, res) => {
//     const token = req.cookies.accessToken;
//     if (!token) return res.status(401).json("not logged in!");
//     Jwt.verify(token, "secretkey", (err, userInfo) => {
//         if (err) return res.status(403).json("Token is not valid");
//         if (userInfo.role !== 0) return res.status(401).json("Not Access");
        const query = `SELECT * FROM profileveterinarian WHERE status = ?`;
        db.query(query, [req.query.status], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    // });
};
export const getVeterinarianById = (req, res) => {
        const query = `SELECT * FROM profileveterinarian WHERE iduser = ?`;
        db.query(query, [req.query.idUser], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
};

export const register = (req, res) => {
    const token = req.cookies.accessToken;
    const id = nanoid(10);
    if (!token) return res.status(401).json("not logged in!");
    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        const query =
            "INSERT INTO profileveterinarian (`id_veterinarian`, `iduser`, `name`, `address`, `address2`,`phone`, `phone2`, `worktime`, `description`, `certificateImage`, `office`, `status`, `created_at` ) VALUES (?)";
        const values = [
            id,
            userInfo.id,
            req.body.name,
            req.body.address,
            req.body.address2 || null,
            req.body.phone,
            req.body.phone2 || null,
            req.body.worktime || null,
            req.body.description || null,
            req.body.certificateImage,
            req.body.office,
            0,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        ];
        db.query(query, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("form has been submit!");
        });
    });
};

export const getServiceByID = (req, res) => {
    const query = `SELECT s.* FROM services AS s JOIN profileveterinarian AS p on s.idVeterinarian = p.id_veterinarian WHERE s.idVeterinarian = ?`;
    db.query(query, [req.query.idVeterinarian], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};
export const addService = (req, res) => {
    const token = req.cookies.accessToken;
    const id = nanoid(10);
    if (!token) return res.status(401).json("not logged in!");
    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        const query =
            "INSERT INTO services (`idservice`, `name`, `image`, `idVeterinarian`) VALUES (?)";
        const values = [
            id,
            req.body.name,
            req.body.image,
            req.body.idVeterinarian,
        ];
        db.query(query, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("add service success!");
        });
    });
};
export const deleteService = (req, res) => {
    console.log(req.query);
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("not logged in!");
    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        const query =
            "DELETE FROM services WHERE idservice = ?";
        
        db.query(query, [req.query.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("delete service success!");
        });
    });
};