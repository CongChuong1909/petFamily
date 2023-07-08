import { nanoid } from "nanoid";
import { db } from "../connectbd.js";
import Jwt from "jsonwebtoken";
import moment from "moment/moment.js";
export const getPets = (req, res) =>{
    const query = `SELECT * FROM pets WHERE idUser = ?`;
    db.query(query, [req.query.idUser], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
}
export const getPetByID = (req, res) =>{
    const query = `SELECT * FROM pets WHERE id_pet = ?`;
    db.query(query, [req.query.idPet], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
}
export const getAll = (req, res) =>{
    const query = `SELECT * FROM pets`;
    db.query(query, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
}
export const getPetFromPost = (req, res)=>{
    const query = `SELECT * FROM pets_post WHERE idpost = ?`;
    db.query(query, [req.query.idPost], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
}
export const addPet = async(req, res) => {
    const token = req.cookies.accessToken;
    const id = nanoid(10);
    const idPetWeight = nanoid(10);
    if (!token) return res.status(401).json("not logged in!");
    Jwt.verify(token, "secretkey", async(err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        
        const query = "INSERT INTO pets (`id_pet`, `iduser`, `name`, `age`, `avatar`, `date_create`, `gender`, `weight`, `description`, `crossbred`, `breed`) VALUES (?)";
        const values = [
            id,
            userInfo.id,
            req.body.name,
            req.body.age,
            req.body.avatar,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            req.body.gender,
            req.body.weight,
            req.body.description,
            req.body.crossbred,
            req.body.breed,  
          ];

        try {
            await db.query(query, [values]);
            const queryInsertWeight = "INSERT INTO petweight (`idpetweight`, `idpet`, `weight`, `description`, `date`) VALUES (?)";
            const valuesPetWeight = [
                idPetWeight,
                id,
                req.body.weight,
                null,
                moment().format('DD/MM/YYYY'),
            ];
            await db.query(queryInsertWeight, [valuesPetWeight]);
            const queryInsertFood = "INSERT INTO petfood (`idpetfood`, `idpet`, `isdried`, `iswet`, `issemiwet`, `ishomeCooked`, `isfresh`, `isvegetable`) VALUES (?)";
            const valuesPetFood = [
                idPetWeight,
                id,
                0,
                0,
                0,
                0,
                0,
                0,
            ];
            await db.query(queryInsertFood, [valuesPetFood]);
            return res.status(200).json("Create pet success!");
          } catch (error) {
            return res.status(500).json(error);
          }
    });
};

export const updatePet = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("not logged in!");
    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        
        const query = "UPDATE pets SET  `name` = ? , `age` = ?, `avatar`= ?, `gender` = ?, `weight` = ?, `description` = ?";

        const values = [
            req.body.name,
            req.body.age,
            req.body.avatar,
            req.body.gender,
            req.body.weight,
            req.body.description,
          ];
        db.query(query, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("pets has been update");
        });
    });
};
export const deletePet = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("not logged in!");
    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        
        const query = "DELETE FROM pets WHERE `id_pet` = ? AND `iduser` = ?";

        db.query(query, [ req.query.idPet, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Pets has been deleted");
        });
    });
};