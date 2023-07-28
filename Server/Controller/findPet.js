import { nanoid } from "nanoid";
import { db } from "../connectbd.js";
import Jwt from "jsonwebtoken";
import moment from "moment/moment.js";
import axios from "axios";
// status lost:
// 0: normal
// 1: lost
// 2: isfind
const checkDistance = async (address1, address2) => {
    console.log(address1, address2);
    try {
      const response = await axios.get(
        `https://api.mapbox.com/directions/v5/mapbox/cycling/${address1.longitude},${address1.latitude};${address2.longitude},${address2.latitude}?geometries=geojson&access_token=pk.eyJ1IjoiY29uZ2NodW9uZyIsImEiOiJjbGs5OThpNjEwbWxmM2ZxaWEweGF0bzdsIn0.i6C4TMolt4phtGR7w9dXJw`
      );
  
      const distance = response.data.routes[0].distance / 1000;
      if (distance > 5) return false;
      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  };

export const addPostFind = async (req, res) => {
    // console.log(req.body);
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("not logged in!");
    Jwt.verify(token, "secretkey", async (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid");
      const id = nanoid(10);
      
      const query =
        "SELECT * FROM pets WHERE id_pet = ?";
        db.query(query, [req.body.idpet], async(err, data) => {
            if (err) return res.status(500).json(err);
            try {
                const queryChangeStatusPet = "UPDATE pets SET status_lost = 1 WHERE id_pet = ?"
                await db.query(queryChangeStatusPet, [req.body.idpet]);
                const queryAddPost = "INSERT INTO posts (`idposts`, `textcontent`, `post_status`, `userid`, `post_method`, `date_create`, `post_bg`) VALUES (?)"
                const valuesAddPost = [
                    id,
                    req.body.textContent,
                    1,
                    userInfo.id,
                    req.body.methodPost,
                    moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                    null,
                ];
                await db.query(queryAddPost, [valuesAddPost])
                
                const queryUser = "SELECT * FROM users";
                db.query(queryUser, async(err, data)=>{
                    data.map(async (item) => {
                        // console.log(item.address);
                        const response = await axios.get(
                            `https://api.mapbox.com/geocoding/v5/mapbox.places/${item.address}.json?access_token=pk.eyJ1IjoiY29uZ2NodW9uZyIsImEiOiJjbGs5OThpNjEwbWxmM2ZxaWEweGF0bzdsIn0.i6C4TMolt4phtGR7w9dXJw`
                        );
                        const coordinates = {
                            longitude: response.data.features[0].center[0],
                            latitude: response.data.features[0].center[1]
                        }
                        const resuleCheck = await checkDistance(req.body.addressCoordinates, coordinates)

                        if(resuleCheck)
                        {
                            const queryAddUserToListUser = 'INSERT INTO listuserviewfindpet (`iduser`, `idpost`) VALUE (?)'
                            const valuesAddUserToListUser = [
                                item.idUser,
                                id
                            ]
                            await db.query(queryAddUserToListUser, [valuesAddUserToListUser])
                        }
                    })
                })
                
                if (req.body.images.length > 0) {
                  const queryImage =
                    "INSERT INTO images (`idimages`, `id_post`, `url`) VALUES (?)";
                  for (const image of req.body.images) {
                    const idimage = nanoid(10);
                    const valuesImage = [idimage, id, image];
                    await db.query(queryImage, [valuesImage]);
                  }
                }

                  const queryCate =
                    "INSERT INTO categorypost (`idcategory`, `idpost`) VALUES (?)";
                    const valuesCate = [ 12, id];
                    await db.query(queryCate, [valuesCate]);
                    const idLostPet = nanoid(10)
                    const querylostpet =
                    "INSERT INTO lostpet (`idlostPet`, `idpet`, `idpost`, `status`) VALUES (?)";
                    const valueLostPet = [ idLostPet, req.body.idpet, id, `Chưa tìm thấy`];
                    await db.query(querylostpet, [valueLostPet]);
                if(req.body.listFriend.length>0)
                {
                    const queryNoti = "INSERT INTO notification (`idnotification`, `idsender`, `iduser`, `content`, `description`, `type`,`status`, `created_at`) VALUES (?)";
                        req.body.listFriend.map(async(item)=>{
                            const idnoti = nanoid(10)
                            const valuesNoti = [
                                idnoti,
                                userInfo.id,
                                item.user_follower,
                                `đã đăng một bài viết mới`,
                                id,
                                'post',
                                1,
                                moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
                            ];
                            await db.query(queryNoti, [valuesNoti]);
                        })    
                        
                }
          
                return res.status(200).json("Create post success!");
              } catch (error) {
                return res.status(500).json(error);
              }
        });
      
    });
  };

  export const updateStatus = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("not logged in!");
    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        const queryGetIdPost = "SELECT * FROM lostpet WHERE idpet = ?"
        db.query(queryGetIdPost, [req.body.idPet], (err, dataLostPet) => {
            console.log(dataLostPet);
        if(req.body.method === 'isfind')
        {
            const query = "UPDATE pets set `status_lost` = 0 WHERE id_pet = ?";
            db.query(query, [req.body.idPet], (err, data) => {
                if (err) return res.status(500).json(err);
                const queryDeleleListUser = "DELETE fROM listuserviewfindpet WHERE idpost = ?";
                db.query(queryDeleleListUser, [dataLostPet[0].idpost], (err, data) => {
                    if (err) return res.status(500).json(err);
                        const queryUpdatePost = "UPDATE posts set post_status = ? WHERE idposts = ? AND userid = ?";         
                        db.query(queryUpdatePost, [0, dataLostPet[0].idpost, userInfo.id], (err, data) => {
                            if (err) return res.status(500).json(err);
                            const queryUpdatelostpet = "UPDATE lostpet set status = ? WHERE idpet = ?";
                            db.query(queryUpdatelostpet, ['Đã tìm thấy', req.body.idPet], (err, data) => {
                                if (err) return res.status(500).json(err);
                                return res.status(200).json("Change status success");
                            })
                            
                        });
                });
            });
            
        }
        if (req.body.method === 'isDeletePostLost')
        {
            const query = "UPDATE pets set `status_lost` = 0 WHERE id_pet = ?";
            db.query(query, [req.body.idPet], (err, data) => {
                if (err) return res.status(500).json(err);
                const queryDeleleListUser = "DELETE fROM listuserviewfindpet WHERE idpost = ?";
                db.query(queryDeleleListUser, [dataLostPet[0].idpost], (err, data) => {
                    if (err) return res.status(500).json(err);
                        const queryUpdatePost = "UPDATE posts set post_status = ? WHERE idposts = ? AND userid = ?";         
                        db.query(queryUpdatePost, [0, dataLostPet[0].idpost, userInfo.id], (err, data) => {
                            if (err) return res.status(500).json(err);
                            const queryUpdatelostpet = "UPDATE lostpet set status = ? WHERE idpet = ?";
                            db.query(queryUpdatelostpet, ['Không tìm thấy', req.body.idPet], (err, data) => {
                                if (err) return res.status(500).json(err);
                                return res.status(200).json("Change status success");
                            })
                            
                        });
                });
            });
        }
    })
        
    });
};