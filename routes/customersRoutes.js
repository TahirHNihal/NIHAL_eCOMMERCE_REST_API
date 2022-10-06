const express = require("express");
const {
  getAllCustomers,
  addCustomer,
  getSingleCustomer,
  deleteCustomer,
  updateCustomer,
} = require("../controllers/customersControllers");

//Router Config
const router = express.Router();

//Products Routes
router.route("/").get(getAllCustomers).post(addCustomer);
router.route("/:id").get(getSingleCustomer).delete(deleteCustomer).put(updateCustomer).patch(updateCustomer);

//Export Modules
module.exports = router;
