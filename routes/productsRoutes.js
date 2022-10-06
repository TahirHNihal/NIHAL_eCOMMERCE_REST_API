const express = require("express");
const {
  getAllProducts,
  createProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productsControllers");
const {productMulter}= require("../utility/allStorage")

//Router Config
const router = express.Router();



//Products Routes
router.route("/").get(getAllProducts).post(productMulter(),createProduct);
router
  .route("/:id")
  .get(getSingleProduct)
  .delete(deleteProduct)
  .put(updateProduct)
  .patch(updateProduct);

//Export Modules
module.exports = router;
