
import fs from "fs";

export const uploadCloud = async function (req, res, next) {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ msg: "No files were uploaded." });
      }
  
      const files = req.files.image;
  
      // Kiểm tra nếu chỉ có một ảnh
      if (!Array.isArray(files)) {
        const file = files;
  
        if (file.size > 5120 * 5120) {
          removeTmp(file.tempFilePath);
          return res.status(400).json({ msg: "Size too large." });
        }
  
        if (
          file.mimetype !== "image/jpg" &&
          file.mimetype !== "image/png" &&
          file.mimetype !== "image/jpeg"
        ) {
          removeTmp(file.tempFilePath);
          return res.status(400).json({ msg: "File format is incorrect." });
        }
  
        // Tiếp tục middleware khi chỉ có một ảnh
        return next();
      }
  
      // Xử lý khi có nhiều ảnh
      const filePromises = files.map((file) => {
        return new Promise((resolve, reject) => {
          if (file.size > 10240 * 10240) {
            removeTmp(file.tempFilePath);
            reject(new Error("Size too large."));
          } // 10mb
  
          if (
            file.mimetype !== "image/jpg" &&
            file.mimetype !== "image/png" &&
            file.mimetype !== "image/jpeg"
          ) {
            removeTmp(file.tempFilePath);
            reject(new Error("File format is incorrect."));
          }
  
          resolve();
        });
      });
  
      Promise.all(filePromises)
        .then(() => {
          next();
        })
        .catch((error) => {
          return res.status(400).json({ msg: error.message });
        });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  };
  

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};




