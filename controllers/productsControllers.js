const express = require("express");
const path = require("path");
const { readFileSync, writeFileSync } = require("fs");
const { abort } = require("process");

/**
 * @description get all products data
 * @name GET /api/v1/products
 * @access public
 */
const getAllProducts = (req, res) => {
  //Get all products data from json db
  const products = JSON.parse(
    readFileSync(path.join(__dirname, "../db/products.json"))
  );
  res.status(200).json(products);
};

/**
 * @description create a new product
 * @name POST /api/v1/products
 * @access public
 */
const createProduct = (req, res) => {
  //Get all products data from json db
  const products = JSON.parse(
    readFileSync(path.join(__dirname, "../db/products.json"))
  );

  // const {name,slug,regPrice,salePrice,stock,shortDes,longDes,category,tag,} = req.body;

  //Get Product Image from Arry Data
  let productImg = [];
  req.files?.forEach((item) => {
    productImg.push(item?.filename);
  });
    //Get Slug From Name
  const slug = req.body.name.toLowerCase().replace(/[^\w-]+/g, "_");

  //Validation
  if (!req.body) {
    res.status(400).json({
      message: "All fields are required!",
    });
  } else {
    //Push New Data to JSON DB
    products.push({
      id: Math.floor(Math.random() * 1000000000).toString(),
      ...req.body,
      slug:slug,
      productImages: req.files ? productImg : "ab.png",
    });
    //Write New Data to JSON DB
    writeFileSync(
      path.join(__dirname, "../db/products.json"),
      JSON.stringify(products)
    );

    //Get Single Image From Product Images
    products.map(item=>{
      console.log(item.productImages[1]);
    })

    res.status(201).json({
      message: "Product create successful",
    });
  }
};

/**
 * @description get single product
 * @name GET /api/v1/products/:id
 * @access public
 */
const getSingleProduct = (req, res) => {
  //Get all products data from json db
  const products = JSON.parse(
    readFileSync(path.join(__dirname, "../db/products.json"))
  );
  const singleProduct = products.find((data) => data.id == req.params.id);
  if (singleProduct) {
    res.status(200).json(singleProduct);
  } else {
    res.status(404).json({
      message: "Single product data not found",
    });
  }
};

/**
 * @description delete product
 * @name DELETE /api/v1/products/:id
 * @access public
 */
const deleteProduct = (req, res) => {
  //Get all products data from json db
  const products = JSON.parse(
    readFileSync(path.join(__dirname, "../db/products.json"))
  );

  if (products.some((data) => data.id == req.params.id)) {
    newProductsData = products.filter((data) => data.id !== req.params.id);
    //Write New Data to JSON DB
    writeFileSync(
      path.join(__dirname, "../db/products.json"),
      JSON.stringify(newProductsData)
    );
    res.status(200).json({
      message: "Product delete successful",
    });
  } else {
    res.status(404).json({
      message: "Product data not found for delete",
    });
  }
};

/**
 * @description update product
 * @name PUT/PATCH  /api/v1/products/:id
 * @access public
 */
const updateProduct = (req, res) => {
  //Get all products data from json db
  const products = JSON.parse(
    readFileSync(path.join(__dirname, "../db/products.json"))
  );

  if (products.some((data) => data.id == req.params.id)) {
    products[products.findIndex((data) => data.id == req.params.id)] = {
      ...products[products.findIndex((data) => data.id == req.params.id)],
      ...req.body,
    };

    //Write New Data to JSON DB
    writeFileSync(
      path.join(__dirname, "../db/products.json"),
      JSON.stringify(products)
    );
    res.status(200).json({
      message: "Product update successful",
    });
  } else {
    res.status(404).json({
      message: "Product data not found for update",
    });
  }
};

//Export Modules
module.exports = {
  getAllProducts,
  createProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
};
