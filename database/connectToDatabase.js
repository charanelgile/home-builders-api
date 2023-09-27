const mongoose = require("mongoose");

const connectToDatabase = async (url) => {
  await mongoose.connect(url, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
  });

  console.log(`\nDatabase Connection: Successful`);
};

module.exports = connectToDatabase;
