import { nanoid } from "nanoid";
import { db } from "../connectbd.js";
import Jwt from "jsonwebtoken";
import moment from "moment/moment.js";
////post method:
// 0 : private
// 1 : public
////status:
// 0 : hidden
// 1 : visible
////post category
// 0 : admin
// 1 : user
// 2 : veterinaran
// console.log(req.cookies.accessToken);
export const getPosts = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("not logged in!");
    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        const query = `SELECT DISTINCT p.*, idUser, name, avatar FROM posts AS p 
        JOIN users AS u ON (u.idUser = p.userid) 
        JOIN friendlist AS fl ON (p.userid = fl.user_id_2 OR fl.user_id_1 = ?) 
        WHERE (p.post_method = 1 AND p.post_status = 1)
        ORDER BY p.date_create DESC `;
        db.query(query, [userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    });
};

export const addPosts = async (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("not logged in!");
    Jwt.verify(token, "secretkey", async (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid");
      const id = nanoid(10);
      console.log(req.body.textContent);
      const query =
        "INSERT INTO posts (`idposts`, `textcontent`, `post_status`, `userid`, `post_category`, `post_method`, `date_create`, `post_bg`) VALUES (?)";
      const values = [
        id,
        req.body.textContent,
        req.body.postStatus,
        userInfo.id,
        req.body.postCategory,
        req.body.methodPost,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        req.body.postBg,
      ];
  
      try {
        await db.query(query, [values]);
  
        if (req.body.images.length > 0) {
          const queryImage =
            "INSERT INTO images (`idimages`, `id_post`, `url`) VALUES (?)";
          for (const image of req.body.images) {
            console.log(image);
            const idimage = nanoid(10);
            const valuesImage = [idimage, id, image];
            await db.query(queryImage, [valuesImage]);
          }
        }
  
        if (req.body.videos.length > 0) {
          const queryVideo =
            "INSERT INTO videos (`idVideo`, `idPost`, `url`) VALUES (?)";
          for (const video of req.body.videos) {
            const idVideo = nanoid(10);
            const valuesVideos = [idVideo, id, video];
            await db.query(queryVideo, [valuesVideos]);
          }
        }
  
        return res.status(200).json("Create post success!");
      } catch (error) {
        return res.status(500).json(error);
      }
    });
  };
  