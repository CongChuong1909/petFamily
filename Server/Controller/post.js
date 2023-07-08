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
        const query = `SELECT DISTINCT p.*, idUser, name, avatar, role, GROUP_CONCAT(c.slug) AS categories
        FROM posts AS p
        JOIN users AS u ON (u.idUser = p.userid)
        LEFT JOIN friendlist AS fl ON (p.userid = fl.user_followed)
        LEFT JOIN categorypost AS pc ON (p.idposts = pc.idpost)
        LEFT JOIN category AS c ON (pc.idcategory = c.idcategory)
        WHERE ((fl.user_follower = ? AND p.post_status = 1) OR (p.userId = ? AND p.post_method = 1 AND p.post_status = 1))
        GROUP BY p.idposts
        ORDER BY p.date_create DESC`;
        db.query(query, [userInfo.id, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    });
};
export const getPostsPagination = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("not logged in!");
    Jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid");
  
      const page = parseInt(req.query.page) || 1; // Trang hiện tại, mặc định là trang 1
      const limit = 10; // Số lượng bài viết trên mỗi trang
      const offset = (page - 1) * limit; // Vị trí bắt đầu lấy dữ liệu
  
      const query = `SELECT DISTINCT p.*, idUser, name, avatar, role, GROUP_CONCAT(c.slug) AS categories
        FROM posts AS p
        JOIN users AS u ON (u.idUser = p.userid)
        LEFT JOIN friendlist AS fl ON (p.userid = fl.user_followed)
        LEFT JOIN categorypost AS pc ON (p.idposts = pc.idpost)
        LEFT JOIN category AS c ON (pc.idcategory = c.idcategory)
        WHERE ((fl.user_follower = ? AND p.post_status = 1) OR (p.userId = ? AND p.post_method = 1 AND p.post_status = 1))
        GROUP BY p.idposts
        ORDER BY p.date_create DESC
        LIMIT ?, ?`;
  
      db.query(query, [userInfo.id, userInfo.id, offset, limit], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
      });
    });
  };
  




export const getAll = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("not logged in!");
    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        const query = `SELECT p.*, u.name, u.avatar, u.idUser, COUNT(l.idpost) AS like_count, COUNT(c.idpost) AS comment_count
        FROM posts AS p
        JOIN users AS u ON p.userid = u.idUser
        LEFT JOIN likepost AS l ON p.idposts = l.idpost
        LEFT JOIN comment AS c ON p.idposts = c.idpost
        GROUP BY p.idposts`;
        db.query(query, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    });
};
export const getByCategory = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("not logged in!");
    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        const query = `SELECT *, u.avatar, u.name FROM posts AS p 
        JOIN users AS u ON p.userid = u.idUser 
        LEFT JOIN categorypost AS pc ON (p.idposts = pc.idpost)
        LEFT JOIN category AS c ON (pc.idcategory = c.idcategory)
        WHERE c.slug = ?`;
        db.query(query, [req.query.slug], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    });
};

export const getPostByPet = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("not logged in!");
    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        const query = `SELECT * FROM posts as p JOIN pets_post as pp ON p.idposts = pp.idpost WHERE pp.idpets = ?`;
        db.query(query, [req.query.idpet], (err, data) => {
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
      const idnoti = nanoid(10)
      const query =
        "INSERT INTO posts (`idposts`, `textcontent`, `post_status`, `userid`, `post_method`, `date_create`, `post_bg`) VALUES (?)";
      const values = [
        id,
        req.body.textContent,
        req.body.postStatus,
        userInfo.id,
        req.body.methodPost,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        req.body.postBg,
      ];
      
     
      try {
        await db.query(query, [values]);
            const listpets = req.body.idpets;
        listpets.forEach(async(pet) => {
            const queryInsertPet = "INSERT INTO pets_post (`idpost`, `idpets`, `name`, `avatar`) VALUES (?)";
            const valuesPet = [
                id,
                pet.id_pet,
                pet.name,
                pet.avatar
            ];
        await db.query(queryInsertPet, [valuesPet]);
        });
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
  
        if (req.body.listCategory.length > 0) {

          const queryCate =
            "INSERT INTO categorypost (`idcategory`, `idpost`) VALUES (?)";
          for (const category of req.body.listCategory) {
            const valuesCate = [ category.id, id];
            await db.query(queryCate, [valuesCate]);
          }
        }
        if(req.body.listFriend.length>0)
        {
            
            const queryNoti = "INSERT INTO notification (`idnotification`, `idsender`, `iduser`, `content`, `description`, `type`,`status`, `created_at`) VALUES (?)";
                req.body.listFriend.map(async(item)=>{
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
                    console.log('ook');
                    await db.query(queryNoti, [valuesNoti]);
                })    
                
        }
  
        return res.status(200).json("Create post success!");
      } catch (error) {
        return res.status(500).json(error);
      }
    });
  };

 export const getAllPostByUser = (req, res) =>{

        const query = `SELECT DISTINCT p.*, idUser, name, avatar FROM posts AS p
        JOIN users AS u ON (u.idUser = p.userid)
        LEFT JOIN sharepost AS s ON s.idpost = p.idposts
        WHERE p.userid = ? AND p.post_status = 1 and s.id_user = ?
        
        ORDER BY p.date_create DESC `;
        db.query(query, [req.query.idUser, req.query.idUser], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
  }
  export const getPostByIdPost = (req, res) =>{

    const query = `SELECT *, u.avatar, u.name FROM posts AS p JOIN users AS u ON p.userid = u.idUser WHERE idposts = ? `;
    db.query(query, [req.query.idPost], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
}
  export const updatePost = (req, res) =>{
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("not logged in!");
    Jwt.verify(token, "secretkey", async (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid");
      const id = nanoid(10);
      const query =
        "UPDATE posts set (`idposts`, `textcontent`, `post_status`, `userid`, `post_category`, `post_method`, `date_create`, `post_bg`) VALUES (?)";
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
            "UPDATE posts set (`idposts`, `textcontent`, `post_status`, `userid`, `post_category`, `post_method`, `date_create`, `post_bg`) VALUES (?)";
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
  
        return res.status(200).json("Update post success!");
      } catch (error) {
        return res.status(500).json(error);
      }
    });
  }
  

  ////postStatus::: 0 hidden, 1 view
  export const hiddenPost = (req, res) =>{
        const token = req.cookies.accessToken;
        if (!token) return res.status(401).json("not logged in!");
        Jwt.verify(token, "secretkey", (err, userInfo) => {
            if (err) return res.status(403).json("Token is not valid");
            
            const query = "UPDATE posts set post_status = ? WHERE idposts = ? AND userid = ?";         
            db.query(query, [0, req.body.idPost, userInfo.id], (err, data) => {
                if (err) return res.status(500).json(err);
                return res.status(200).json("Hidden Post success");
            });
        });
  };
  