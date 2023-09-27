const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  res.send(`Get All Products`);
};

module.exports = getAllProducts;
