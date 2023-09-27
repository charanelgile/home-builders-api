const errorHandler = async (err, req, res, next) => {
  console.log(`\nAn error has been encountered:\n${err}`);

  return res.status(500).send(`Something went wrong, please try again`);
};

module.exports = errorHandler;
