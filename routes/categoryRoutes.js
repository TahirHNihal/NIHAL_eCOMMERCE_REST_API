const express = require("express");
const {
  getAllCategories,
  addCategory,
  getSingleCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/categoryControllers");
const {categoryMulter} = require('../utility/allStorage')

//Router Config
const router = express.Router();

//Products Routes
router.route("/").get(getAllCategories).post(categoryMulter(),addCategory);
router.route("/:id").get(getSingleCategory).delete(deleteCategory).put(updateCategory).patch(updateCategory);

//Export Modules
module.exports = router;
