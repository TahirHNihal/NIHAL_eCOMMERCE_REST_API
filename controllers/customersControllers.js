const express = require("express");
const path = require("path");
const { readFileSync, writeFileSync } = require("fs");

/**
 * @description get all customers data
 * @name GET /api/v1/customers
 * @access public
 */
const getAllCustomers = (req, res) => {
  //Get all customers data from json db
  const customers = JSON.parse(
    readFileSync(path.join(__dirname, "../db/customers.json"))
  );

  res.status(200).json(customers);
};



/**
 * @description add a new customer
 * @name POST /api/v1/customers
 * @access public
 */
const addCustomer = (req, res) => {
  //Get all customers data from json db
  const customers = JSON.parse(
    readFileSync(path.join(__dirname, "../db/customers.json"))
  );
  const { name, email, cell, location, zipCode, shippingAdd, billingAdd } =
    req.body;
  //Data Validation
  if (
    !name ||
    !email ||
    !cell ||
    !location ||
    !zipCode ||
    !shippingAdd ||
    !billingAdd
  ) {
    res.status(400).json({
      message: "All fields are required!",
    });
  } else {
    //Push New Data to JSON DB
    customers.push({
      id: Math.floor(Math.random() * 1000000000).toString(),
      name: name,
      email: email,
      cell: cell,
      location: location,
      zipCode: zipCode,
      shippingAdd: shippingAdd,
      billingAdd: billingAdd,
    });
    //Write New Data to JSON DB
    writeFileSync(
      path.join(__dirname, "../db/customers.json"),
      JSON.stringify(customers)
    );
    res.status(201).json({
      message: "Customer add successful",
    });
  }
};


/**
 * @description get single customer
 * @name GET /api/v1/customers/:id
 * @access public
 */
const getSingleCustomer = (req, res) => {
  //Get all customers data from json db
  const customers = JSON.parse(
    readFileSync(path.join(__dirname, "../db/customers.json"))
  );
  const singleCustomer = customers.find((data) => data.id == req.params.id);
  if (singleCustomer) {
    res.status(200).json(singleCustomer);
  } else {
    res.status(404).json({
      message: "Single customer data not found",
    });
  }
};


/**
 * @description delete customer
 * @name DELETE /api/v1/customers/:id
 * @access public
 */
 const deleteCustomer = (req, res) => {
  //Get all customers data from json db
  const customers = JSON.parse(
    readFileSync(path.join(__dirname, "../db/customers.json"))
  );

  if (customers.some((data) => data.id == req.params.id)) {
    newCustomersData = customers.filter((data) => data.id !== req.params.id);
    //Write New Data to JSON DB
    writeFileSync(
      path.join(__dirname, "../db/customers.json"),
      JSON.stringify(newCustomersData)
    );
    res.status(200).json({
      message: "Customer delete successful",
    });
  } else {
    res.status(404).json({
      message: "Customer data not found for delete",
    });
  }
};



/**
 * @description update customer
 * @name PUT/PATCH  /api/v1/customers/:id
 * @access public
 */
 const updateCustomer = (req, res) => {
  //Get all customers data from json db
  const customers = JSON.parse(
    readFileSync(path.join(__dirname, "../db/customers.json"))
  );

  if (customers.some((data) => data.id == req.params.id)) {
    customers[customers.findIndex((data) => data.id == req.params.id)] = {
      ...customers[customers.findIndex((data) => data.id == req.params.id)],
      ...req.body,
    };

    //Write New Data to JSON DB
    writeFileSync(
      path.join(__dirname, "../db/customers.json"),
      JSON.stringify(customers)
    );
    res.status(200).json({
      message: "Customer update successful",
    });
  } else {
    res.status(404).json({
      message: "Customer data not found for delete",
    });
  }
};





//Export Modules
module.exports = {
  getAllCustomers,
  addCustomer,
  getSingleCustomer,
  deleteCustomer,
  updateCustomer
};
