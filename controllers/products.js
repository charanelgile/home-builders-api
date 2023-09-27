const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  // Destructure the request to get ONLY the properties that correspond to the Model
  const { name, brand, featured, filters, sort, fields } = req.query;

  // Define an empty object that will hold ONLY the valid query strings
  const queries = {};

  /*** Validate each property present in the request ***/
  if (name) {
    // Match the given name using the built-in mongoose regex
    // with an "i" option for case-insensitive matching
    queries.name = { $regex: name, $options: "i" };
  }

  if (brand) {
    queries.brand = { $regex: brand, $options: "i" };
  }

  if (featured) {
    queries.featured = featured === "true" ? true : false;
  }

  /*** Filter the results based on the specified conditions ***/
  if (filters) {
    // Map out the basic relational operators to their corresponding mongoose counterparts
    const operators = {
      ">=": "$gte",
      ">": "$gt",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };

    // RegEx Pattern to extract the relational operators from the request
    const regex = /\b(>=|>|=|<|<=)\b/g;

    // Replace any matching relational operator with a pattern that uses its mongoose counterpart: -${mongoose_counterpart}-
    let filterConditions = filters.replace(regex, (match) => {
      return `-${operators[match]}-`;
    });

    // Define the options on where the filter conditions can only be used
    const options = ["price", "rating"];

    // Split the filter conditions at every "," and then
    // Iterate over the resulting array of filter options
    filterConditions = filterConditions.split(",").forEach((filterOption) => {
      // Split the filter option at every "-" and then
      // Destructure them into field, operator, and value
      const [field, operator, value] = filterOption.split("-");

      // If the destructured field matches either of the defined options (price or rating)
      // add it as a valid property of the query strings
      if (options.includes(field)) {
        queries[field] = {
          [operator]: Number(value), // Example: queries.price: { $gte: 450 }
        };
      }
    });
  }

  // If no property was destructured from the request,
  // then find() method will only be receiving an empty object,
  // therefore returning all products, instead of throwing an error
  let results = Product.find(queries);

  const products = await results;

  res.status(200).json({
    hits: products.length,
    products,
  });
};

module.exports = getAllProducts;
