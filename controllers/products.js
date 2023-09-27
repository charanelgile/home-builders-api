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

  /*** Sort the results based on the specified field and order ***
   *** Otherwise, set "dateCreated" as the default sort order  ***/
  if (sort) {
    const sortFieldsAndOrder = sort.split(",").join(" ");
    results = results.sort(sortFieldsAndOrder);
  } else {
    results = results.sort("dateCreated");
  }

  /*** Show only specific fields in the results ***/
  if (fields) {
    const fieldsSelected = fields.split(",").join(" ");
    results = results.select(fieldsSelected);
  }

  /*** Set pagination and limit ***/
  const page = Number(req.query.page) || 1; // Set Page (defaults to 1, when not specified)
  const limit = Number(req.query.limit) || 10; // Set Limit (defaults to 10, when not specified)

  // Calculate how many items will be skipped, depending on the specified page and limit
  // This will determine the pagination
  const skip = (page - 1) * limit;

  results = results.skip(skip).limit(limit);

  const products = await results;

  res.status(200).json({
    hits: products.length,
    products,
  });
};

module.exports = getAllProducts;
