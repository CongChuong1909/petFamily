import { db } from "../connectbd.js";

export const getImagesById = (req, res) => {
    const query = `SELECT * FROM images WHERE id_post = ?`;
    const id = req.params.idPost;
    db.query(query, id, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};

export const getImagePet  = (req, res)=> {
    const query = `SELECT i.* FROM images AS i 
    JOIN posts AS p ON p.idposts = i.id_post 
    JOIN pets_post AS pp ON p.idposts = pp.idpost WHERE pp.idpets = ?`;
    db.query(query, [req.query.idPet], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
}