const multer = require("multer");
const path = require("path");

//Product Multer Config
const productMulter = () => {
  //Product Multer Storage
  const productStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "../public/images/productImages/"));
    },
    filename: (req, file, cb) => {
      cb(
        null,
        (
          Math.floor(Math.random() * 100000000) +
          "_" +
          file.originalname
        ).toLowerCase()
      );
    },
  });
  return multer({
    storage: productStorage,
  }).array("productImages", 7);
};

//Category Multer Config
const categoryMulter = () => {
  //Product Multer Storage
  const categoryStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "../public/images/categoryImages/"));
    },
    filename: (req, file, cb) => {
      cb(
        null,
        (
          Math.floor(Math.random() * 100000000) +
          "_" +
          file.originalname
        ).toLowerCase()
      );
    },
  });
  return multer({
    storage: categoryStorage,
  }).single("categoryImages");
};

//Brand Multer Config
const brandMulter = () => {
  //Product Multer Storage
  const brandStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "../public/images/brandImages/"));
    },
    filename: (req, file, cb) => {
      cb(
        null,
        (
          Math.floor(Math.random() * 100000000) +
          "_" +
          file.originalname
        ).toLowerCase()
      );
    },
  });
  return multer({
    storage: brandStorage,
  }).single("brandImages");
};

// Multer Module Export
module.exports = {
  productMulter,
  categoryMulter,
  brandMulter,
};
