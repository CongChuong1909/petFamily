import { db } from "../connectbd.js";
import Jwt from "jsonwebtoken";
import moment from "moment";
import { nanoid } from "nanoid";
export const getList = (req, res) => {
    const token = req.cookies.accessToken;
    // console.log(req.query.idpost);
    if (!token) return res.status(401).json("not logged in!");
    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        const query = `SELECT DISTINCT s.*, pp.*, u.idUser AS userId, u.name AS userName, u.avatar AS userAvatar, u.role AS userRole,
                userpost.name AS namePost, userpost.avatar AS avatarPost, c.slug AS categories
                FROM sharepost AS s 
                JOIN posts AS p ON s.idpost = p.idposts
                JOIN users AS u ON u.idUser = p.userid
                JOIN users AS userpost ON s.id_user = userpost.idUser
                LEFT JOIN friendlist AS fl ON p.userid = fl.user_followed
                LEFT JOIN categorypost AS pc ON p.idposts = pc.idpost
                LEFT JOIN category AS c ON pc.idcategory = c.idcategory
                JOIN posts AS pp ON s.idpostshare = pp.idposts
                WHERE ((fl.user_follower = ? AND p.post_status = 1) 
                OR (p.userId = ? AND p.post_method = 1 AND p.post_status = 1)) AND s.idpost = ?
 
        `;
        db.query(query, [userInfo.id, userInfo.id, req.query.idpost], (err, data) => {
            if (err) return res.status(500).json(err);
            // console.log(data);
            return res.status(200).json(data);
        });
    });
};


// export const addShare = (req, res) => {
//     const token = req.cookies.accessToken;
//     if (!token) return res.status(401).json("not logged in!");
//     const id = nanoid(10);
//     const idShare = nanoid(10);
//     const idnoti = nanoid(10);
//     Jwt.verify(token, "secretkey", (err, userInfo) => {
//         if (err) return res.status(403).json("Token is not valid");
//         const query =
//             "INSERT INTO posts (`idposts`, `textcontent`, `post_status`, `userid`, `post_method`, `date_create`, `post_bg`) VALUES (?)";
//         const values = [
//             id,
//             req.body.textContent,
//             1,
//             userInfo.id,
//             1,
//             moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
//             null,
//         ];
        
      
//         db.query(query, [values], (err, data) => {
//             if (err) return res.status(500).json(err);
//             else{
//                 const queryShare = "INSERT INTO sharepost (`idshare`, `idpost`, `date_create`, `id_user`, `idpostshare`) VALUES (?)";
//                 const valuesShare = [
//                     idShare,
//                     id,
//                     moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
//                     userInfo.id,
//                     req.body.idPostShare
//                 ];
//                 db.query(queryShare, [valuesShare], (err, data) => {
//                     if (err) return res.status(500).json(err);
//                     if (req.body.listCategory.length > 0) {

//                         const queryCate =
//                           "INSERT INTO categorypost (`idcategory`, `idpost`) VALUES (?)";
//                         for (const category of req.body.listCategory) {
//                           const valuesCate = [ category.id, id];
//                           await db.query(queryCate, [valuesCate]);
//                         }
//                       }
//                     if(req.body.listFriend.length>0)
//                     {
//                         const queryNoti = "INSERT INTO notification (`idnotification`, `idsender`, `iduser`, `content`, `description`, `type`,`status`, `created_at`) VALUES (?)";
//                             req.body.listFriend.map(async(item)=>{
//                                 const valuesNoti = [
//                                     idnoti,
//                                     userInfo.id,
//                                     item.user_follower,
//                                     `đã đăng một bài viết mới`,
//                                     id,
//                                     'post',
//                                     1,
//                                     moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
//                                 ];
//                                 console.log('ook');
//                                 await db.query(queryNoti, [valuesNoti]);
//                             })    
//                     }
//                     else return res.status(200).json("share has been created!");
//                 })
//             }
            
//         });
//     });
// };

// export const updateRating = (req, res) => {
//     const token = req.cookies.accessToken;
//     if (!token) return res.status(401).json("not logged in!");
//     Jwt.verify(token, "secretkey", (err, userInfo) => {
//         if (err) return res.status(403).json("Token is not valid");
//         const query =
//             "UPDATE customerfeedback SET `rating` = ?, `comment` = ?, `title` = ? WHERE idfeedback = ? AND iduser = ?";
//         const values = [
//             req.body.rating,
//             req.body.comment.replace(/'/g, "\\'"),
//             req.body.title,
//             req.body.idfeedback,
//             userInfo.id
//         ];
//         //////
//         ///status: 1: đang báo cáo
//         ///status: 2: bỏ qua
//         ///status: 0: xóa và thông báo
//         console.log(query);
//         db.query(query, values, (err, data) => {
//             if (err) return res.status(500).json(err);
//             return res.status(200).json("rating has been updated!");
//         });
//     });
// };
export const addShare = async (req, res) => {
    try {
        const token = req.cookies.accessToken;
        if (!token) return res.status(401).json("not logged in!");
        const id = nanoid(10);
        const idShare = nanoid(10);
        
        const userInfo = await new Promise((resolve, reject) => {
            Jwt.verify(token, "secretkey", (err, userInfo) => {
                if (err) reject("Token is not valid");
                resolve(userInfo);
            });
        });

        const query =
            "INSERT INTO posts (`idposts`, `textcontent`, `post_status`, `userid`, `post_method`, `date_create`, `post_bg`) VALUES (?)";
        const values = [
            id,
            req.body.textContent,
            1,
            userInfo.id,
            1,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            null,
        ];

        await new Promise((resolve, reject) => {
            db.query(query, [values], (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        });

        const queryShare =
            "INSERT INTO sharepost (`idshare`, `idpost`, `date_create`, `id_user`, `idpostshare`) VALUES (?)";
        const valuesShare = [
            idShare,
            id,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            req.body.idUserPost,
            req.body.idPostShare,
        ];

        await new Promise((resolve, reject) => {
            db.query(queryShare, [valuesShare], (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        });

        if (req.body.listCategory.length > 0) {
            const queryCate =
                "INSERT INTO categorypost (`idcategory`, `idpost`) VALUES (?)";
            for (const category of req.body.listCategory) {
                const valuesCate = [category.id, id];
                await new Promise((resolve, reject) => {
                    db.query(queryCate, [valuesCate], (err, data) => {
                        if (err) reject(err);
                        resolve(data);
                    });
                });
            }
        }

        if (req.body.listFriend.length > 0) {
            const queryNoti =
            "INSERT INTO notification (`idnotification`, `idsender`, `iduser`, `content`, `description`, `type`,`status`, `created_at`) VALUES (?)";
            for (const item of req.body.listFriend) {
                const idnoti = nanoid(10);
                const valuesNoti = [
                    idnoti,
                    userInfo.id,
                    item.user_follower,
                    "đã đăng một bài viết mới",
                    id,
                    "post",
                    1,
                    moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                ];
                await new Promise((resolve, reject) => {
                    db.query(queryNoti, [valuesNoti], (err, data) => {
                        if (err) reject(err);
                        resolve(data);
                    });
                });
            }
        }

        return res.status(200).json("share has been created!");
    } catch (error) {
        return res.status(500).json(error);
    }
};
