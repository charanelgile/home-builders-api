require("dotenv").config();
require("express-async-errors");

const express = require("express");
const connectToDatabase = require("./database/connectToDatabase");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");
const productsRoute = require("./routes/products");

const app = express();

const port = process.env.PORT || 3001;

// Parse JSON Data
app.use(express.json());

// Serve Static Contents
app.use(express.static("./public"));

// Root Route
app.get("/", (req, res) => {
  res.sendFile("./public/index.html");
});

// Products Route
app.use("/api/v1/products", productsRoute);

// Error Handler
app.use(errorHandler);

// Not Found
app.use(notFound);

const connectDBstartServer = async () => {
  try {
    await connectToDatabase(process.env.MONGO_URI);

    app.listen(
      port,
      console.log(
        `Starting the Server: Successful\nhttp://127.0.0.1:${port} \n`
      )
    );
  } catch (error) {
    console.log(
      `\nDatabase Connection: Failed\nStarting the Server: Failed\n${error}\n`
    );
  }
};

connectDBstartServer();
