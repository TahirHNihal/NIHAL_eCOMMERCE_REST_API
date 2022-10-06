const express = require("express");
const path = require("path");
const { readFileSync, writeFileSync } = require("fs");

/**
 * @description get all categories data
 * @name GET /api/v1/categories
 * @access public
 */
const getAllCategories = (req, res) => {
  //Get all categories data from json db
  const categories = JSON.parse(
    readFileSync(path.join(__dirname, "../db/categories.json"))
  );

  res.status(200).json(categories);
};

/**
 * @description add a new category
 * @name POST /api/v1/categories
 * @access public
 */
const addCategory = (req, res) => {
  //Get all categories data from json db
  const categories = JSON.parse(
    readFileSync(path.join(__dirname, "../db/categories.json"))
  );
  //Get Slug From Name
  const slug = req.body.name.toLowerCase().replace(/[^\w-]+/g, "_");

  //Data Validation
  if (!req.body) {
    res.status(400).json({
      message: "All fields are required!",
    });
  } else {
    //Push New Data to JSON DB
    categories.push({
      id: Math.floor(Math.random() * 1000000000).toString(),
      ...req.body,
      slug:slug,
      categoryImages : req.file ? req.file.filename : "ab.png"
    });
    //Write New Data to JSON DB
    writeFileSync(
      path.join(__dirname, "../db/categories.json"),
      JSON.stringify(categories)
    );
    res.status(201).json({
      message: "Category add successful",
    });
  }
};

/**
 * @description get single category
 * @name GET /api/v1/categories/:id
 * @access public
 */
const getSingleCategory = (req, res) => {
  //Get all categories data from json db
  const categories = JSON.parse(
    readFileSync(path.join(__dirname, "../db/categories.json"))
  );
  const singleCategory = categories.find((data) => data.id == req.params.id);
  if (singleCategory) {
    res.status(200).json(singleCategory);
  } else {
    res.status(404).json({
      message: "Single category data not found",
    });
  }
};

/**
 * @description delete category
 * @name DELETE /api/v1/categories/:id
 * @access public
 */
const deleteCategory = (req, res) => {
  //Get all categories data from json db
  const categories = JSON.parse(
    readFileSync(path.join(__dirname, "../db/categories.json"))
  );

  if (categories.some((data) => data.id == req.params.id)) {
    newCategoriesData = categories.filter((data) => data.id !== req.params.id);
    //Write New Data to JSON DB
    writeFileSync(
      path.join(__dirname, "../db/categories.json"),
      JSON.stringify(newCategoriesData)
    );
    res.status(200).json({
      message: "Category delete successful",
    });
  } else {
    res.status(404).json({
      message: "Category data not found for delete",
    });
  }
};

/**
 * @description update category
 * @name PUT/PATCH  /api/v1/categories/:id
 * @access public
 */
const updateCategory = (req, res) => {
  //Get all categories data from json db
  const categories = JSON.parse(
    readFileSync(path.join(__dirname, "../db/categories.json"))
  );

  if (categories.some((data) => data.id == req.params.id)) {
    categories[categories.findIndex((data) => data.id == req.params.id)] = {
      ...categories[categories.findIndex((data) => data.id == req.params.id)],
      ...req.body,
    };

    //Write New Data to JSON DB
    writeFileSync(
      path.join(__dirname, "../db/categories.json"),
      JSON.stringify(categories)
    );
    res.status(200).json({
      message: "Category update successful",
    });
  } else {
    res.status(404).json({
      message: "Category data not found for delete",
    });
  }
};

//Export Modules
module.exports = {
  getAllCategories,
  addCategory,
  getSingleCategory,
  deleteCategory,
  updateCategory,
};
