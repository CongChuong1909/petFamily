
import { nanoid } from "nanoid";
import { db } from "../connectbd.js";
export const getAllCategory = (req, res) => {
    const query = `SELECT * FROM category`;
    db.query(query, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};

export const getCategoryPost = (req, res) => {
    const query = `SELECT * FROM categorypost AS cp JOIN category AS c ON cp.idcategory = c.idcategory WHERE cp.idpost = ?`;
    db.query(query,[req.query.idPost], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};
export const addCategoryPost = (req, res) => {
    const id = nanoid(10);
    const query = 'INSERT INTO category (`idcategory`, `nameCategory`, `slug`) VALUES (?)';
    const values = [
        id,
        req.body.name,
        req.body.name
      ];
    db.query(query,[values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};
