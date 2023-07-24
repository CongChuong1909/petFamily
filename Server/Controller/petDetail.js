// export const addWeight = (req, res) => {
//     const idPetWeight = nanoid(10);
//     const token = req.cookies.accessToken;
//     if (!token) return res.status(401).json("not logged in!");
//     Jwt.verify(token, "secretkey", (err, userInfo) => {
//         if (err) return res.status(403).json("Token is not valid");
//         const query = "UPDATE petweight set `weight` = ?, description = ?, date = ? WHERE idpetweight = ?";
//         db.query(query, [req.body.weight, req.body.desccription, req.body.date, req.body.idpetweight], (err, data) => {
//             if (err) return res.status(500).json(err);
//             return res.status(200).json("weight pet has been update!");
//         });
//     });
// };

// export const addMedicine = (req, res) => {
//     const idPetMedicine = nanoid(10);
//     const token = req.cookies.accessToken;
//     if (!token) return res.status(401).json("not logged in!");
//     Jwt.verify(token, "secretkey", (err, userInfo) => {
//         if (err) return res.status(403).json("Token is not valid");
//         const queryInsertMedicine = "INSERT INTO petmedicine (`idpetmedicine`, `idpet`, `description`, `date`) VALUES (?)";
//         const valuesPetMedicine = [idPetMedicine, id, null, null];
//         db.query(queryInsertMedicine, [valuesPetMedicine], (err, data) => {
//             if (err) return res.status(500).json(err);
//             return res.status(200).json("medicine pet has been update!");
//         });
//     });
// };

// export const addVaccination = (req, res) => {
//     const idPetVaccine = nanoid(10);
//     const token = req.cookies.accessToken;
//     if (!token) return res.status(401).json("not logged in!");
//     Jwt.verify(token, "secretkey", (err, userInfo) => {
//         if (err) return res.status(403).json("Token is not valid");
//         const queryInsertVaccination = "INSERT INTO petvaccination (`idpetvaccination`, `idpet`, `description`, `date`) VALUES (?)";
//             const valuesPetVaccination = [ idPetVaccine, id, null, null];
//         db.query(queryInsertVaccination, [valuesPetVaccination], (err, data) => {
//             if (err) return res.status(500).json(err);
//             return res.status(200).json("vaccination pet has been update!");
//         });
//     });
// };

// export const addFood = (req, res) => {
//     const idPetFood = nanoid(10);
//     const token = req.cookies.accessToken;
//     if (!token) return res.status(401).json("not logged in!");
//     Jwt.verify(token, "secretkey", (err, userInfo) => {
//         if (err) return res.status(403).json("Token is not valid");
//         const queryInsertFood = "INSERT INTO petfood (`idpetfood`, `idpet`, `description`, `date`) VALUES (?)";
//             const valuesPetFood = [ idPetFood, id, null, null];
//             db.query(queryInsertFood, [valuesPetFood], (err, data) => {
//                 if (err) return res.status(500).json(err);
//                 return res.status(200).json("food pet has been update!");
//             });
//     });
// };

// export const addHealth = (req, res) => {
//     const idPethealth = nanoid(10);
//     const token = req.cookies.accessToken;
//     if (!token) return res.status(401).json("not logged in!");
//     Jwt.verify(token, "secretkey", (err, userInfo) => {
//         if (err) return res.status(403).json("Token is not valid");
//         const queryInsertHealth = "INSERT INTO pethealth (`idpethealth`, `idpet`, `description`, `date`) VALUES (?)";
//             const valuesPetHealth = [ idPethealth, id, null, null];
//             db.query(queryInsertHealth, [valuesPetHealth], (err, data) => {
//                 if (err) return res.status(500).json(err);
//                 return res.status(200).json("health pet has been update!");
//             });
//     });
// };

// export const addAllgergy = (req, res) => {
//     const idPetAllergy = nanoid(10);
//     const token = req.cookies.accessToken;
//     if (!token) return res.status(401).json("not logged in!");
//     Jwt.verify(token, "secretkey", (err, userInfo) => {
//         if (err) return res.status(403).json("Token is not valid");
//         const queryInsertAllgergy = "INSERT INTO petallgergy (`idpetallgergy`, `idpet`, `description`, `date`) VALUES (?)";
//             const valuesPetAllgergy = [ idPetAllergy, id, null, null];
//             db.query(queryInsertAllgergy, [valuesPetAllgergy], (err, data) => {
//                 if (err) return res.status(500).json(err);
//                 return res.status(200).json("allgergy pet has been update!");
//             });
//     });
// };
import { nanoid } from "nanoid";
import { db } from "../connectbd.js";
import Jwt from "jsonwebtoken";
import moment from "moment/moment.js";

export const addData = (req, res) => {
    const id = nanoid(10);
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("not logged in!");

    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");

        let tableName = "";
        let query = "";
        let values = [];

        switch (req.params.collection) {
            case "weight":
                tableName = "petweight";
                query = "INSERT INTO petweight (`idpetweight`, `idpet`, `weight`, `description`, `date`) VALUES (?, ?, ?, ?, ?)";
                values = [id, req.body.idpet, req.body.weight, req.body.description, req.body.date];
                break;
            case "medicine":
                tableName = "petmedicine";
                query = "INSERT INTO petmedicine (`idpetmedicine`, `idpet`, `description`, `date`) VALUES (?, ?, ?, ?)";
                values = [id, req.body.idpet, req.body.description, req.body.date];
                break;
            case "vaccination":
                tableName = "petvaccination";
                query = "INSERT INTO petvaccination (`idpetvaccination`, `idpet`, `description`, `date`) VALUES (?, ?, ?, ?)";
                values = [id, req.body.idpet, req.body.description, req.body.date];
                break;
            case "food":
                tableName = "petfood";
                query = "INSERT INTO petfood (`idpetfood`, `idpet`, `isdried`, `iswet`, `issemiwet`, `ishomeCooked`, `isfresh`, `isvegetable`) VALUES (?)";
                values = [id, req.body.idpet, req.body.isdried, req.body.iswet, req.body.issemiwet, req.body.ishomeCooked, req.body.isfresh, req.body.isvegetable];
                break;
            case "allgergy":
                tableName = "petallgergy";
                query = "INSERT INTO petallgergy (`idpetallgergy`, `idpet`, `description`, `date`) VALUES (?, ?, ?, ?)";
                values = [id, req.body.idpet, req.body.description, req.body.date];
                break;
            default:
                return res.status(404).json("Collection not found");
        }

        db.query(query, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(`${req.params.collection} pet has been created!`);
        });
    });
};

export const updateFood = (req, res)=>{
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("not logged in!");
    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        const query = "UPDATE petfood set `isdried` = ?, `iswet` = ?, `issemiwet` = ?, `ishomeCooked` = ?, `isfresh` = ?, `isvegetable` = ? WHERE idpet = ? ";
        const values = [req.body.isdried,
                req.body.iswet,
                req.body.issemiwet,
                req.body.ishomeCooked,
                req.body.isfresh,
                req.body.isvegetable,
                req.body.idpet];
        db.query(query, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("pet food has been update!");
        });
    });
}

export const deleteById = (req, res) => {
    const { id, collection } = req.params;
    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("not logged in!");

    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");

        let tableName = "";

        switch (collection) {
            case "weight":
                tableName = "petweight";
                break;
            case "medicine":
                tableName = "petmedicine";
                break;
            case "vaccination":
                tableName = "petvaccination";
                break;
            case "food":
                tableName = "petfood";
                break;
            case "allgergy":
                tableName = "petallgergy";
                break;
            default:
                return res.status(404).json("Collection not found");
        }

        const queryDelete = `DELETE FROM ${tableName} WHERE id${tableName} = ?`;

        db.query(queryDelete, [id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(`${collection} pet has been deleted!`);
        });
    });
};


export const getFoodByID = (req, res) => {
    const token = req.cookies.accessToken;
    // console.log(req.query);
    if (!token) return res.status(401).json("not logged in!");
    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        const query = `SELECT * FROM petfood WHERE idpet = ?`;
        db.query(query, [req.query.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    });
};


export const getCharacterByID = (req, res) => {
    const token = req.cookies.accessToken;
    // console.log(req.query);
    if (!token) return res.status(401).json("not logged in!");
    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        const query = `SELECT * FROM petcharacter WHERE idpet = ?`;
        db.query(query, [req.query.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    });
};

export const updateCharacter = (req, res)=>{
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("not logged in!");
    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        const query = "UPDATE petcharacter set `isFriendlyWithDog` = ?, `isFriendlyWithCat` = ?, `isFriendlyWithChild` = ?, `isToiletRightPlace` = ?, `isActive` = ?, `isShy` = ? WHERE idpet = ? ";
        const values = [
                req.body.isFriendlyWithDog,
                req.body.isFriendlyWithCat,
                req.body.isFriendlyWithChild,
                req.body.isToiletRightPlace,
                req.body.isActive,
                req.body.isShy,
                req.body.idpet];
        db.query(query, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("pet character has been update!");
        });
    });
}



export const getByID = (req, res) => {
    const { id, collection } = req.params;
    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("not logged in!");

    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");

        let tableName = "";

        switch (collection) {
            case "weight":
                tableName = "petweight";
                break;
            case "medicine":
                tableName = "petmedicine";
                break;
            case "vaccination":
                tableName = "petvaccination";
                break;
            case "food":
                tableName = "petfood";
                break;
            case "health":
                tableName = "pethealth";
                break;
            case "allgergy":
                tableName = "petallgergy";
                break;
            default:
                return res.status(404).json("Collection not found");
        }

        const query = `SELECT * FROM ${tableName} WHERE idpet = ? ORDER BY date ASC`;

        db.query(query, [id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    });
};


