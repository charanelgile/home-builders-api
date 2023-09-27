/*** ONE-TIME EXECUTION ONLY, TO POPULATE THE DATABASE WITH SAMPLE DATA ***/

require("dotenv").config();

const connectToDatabase = require("./connectToDatabase");

const Product = require("../models/product");

const products = require("../data.json");

const populateDatabase = async () => {
  try {
    await connectToDatabase(process.env.MONGO_URI);

    // Empty the collection first
    await Product.deleteMany();
    // Populate the collection with the data from "products"
    await Product.create(products);

    console.log(`\nDatabase successfully populated with sample data\n`);

    // End Process with Exit Code 0 for Success
    process.exit(0);
  } catch (error) {
    console.log(`\nDatabase Connection: Failed\n${error}\n`);

    // End Process with Exit Code 1 for Error
    process.exit(1);
  }
};

populateDatabase();
