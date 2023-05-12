import { db } from "../connectbd.js";

export const getImagesById = (req, res) => {
    const query = `SELECT * FROM images WHERE id_post = ?`;
    const id = req.params.idPost;
    db.query(query, id, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};
