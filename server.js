const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const colors = require("colors");
const productsRoutes = require("./routes/productsRoutes");
const customersRoutes = require("./routes/customersRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const cors = require("cors");
//Environtment Setup
dotenv.config();
const PORT = process.env.PORT || 4000;

//Express Init
const app = express();

//Data Mange
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//Static Folder
app.use(express.static("public"));

//Routes
app.use("/api/v1/products", productsRoutes);
app.use("/api/v1/customers", customersRoutes);
app.use("/api/v1/categories", categoryRoutes);

//Lister Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.bgGreen.white);
});
