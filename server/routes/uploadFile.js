require("dotenv").config();
const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// import upload file
const sharp = require("sharp");
const multer = require("multer");
const router = new express.Router();

// ===== Upload Image Management =====
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    // console.log(file);
    // You could rename the file name
    cb(null, file.fieldname + "-" + uuidv4() + path.extname(file.originalname));

    // You could use the original name
    // cb(null, file.originalname.toLowerCase().replace(/\s/g, "-"));
  },
});
upload;

var upload = multer({ storage: storage });

router.post("/upload/images", upload.single("file"), (req, res) => {
  sharp("./" + req.file.path)
    .toBuffer()
    .then((data) => {
      sharp(data)
        // .resize(324, 200)
        .toFile("./" + req.file.path, () => {
          return res.json({
            data: req.file.filename,
          });
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/upload/image/editorjs", upload.single("image"), (req, res) => {
  sharp("./" + req.file.path)
    .toBuffer()
    .then((data) => {
      sharp(data).toFile("./" + req.file.path, () => {
        return res.json({
          success: 1,
          file: {
            url: `http://localhost:3500/${req.file.path}`,
          },
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
