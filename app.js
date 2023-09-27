require("dotenv").config();
require("express-async-errors");

const express = require("express");
const connectToDatabase = require("./database/connectToDatabase");

const app = express();

const port = process.env.PORT || 3001;

// Parse JSON Data
app.use(express.json());

// Root Route
app.get("/", (req, res) => {
  res.send(`
    <h1>Home Builders API</h1>
    <br/>
    <h3>API for Home Construction Supplies built using Node, Express, and MongoDB</h3>
    <br/>
    <a href="/api/products">Go to Endpoint</a>
  `);
});

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
