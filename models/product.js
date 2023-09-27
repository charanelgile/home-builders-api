const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name must be provided"],
  },
  price: {
    type: Number,
    required: [true, "Product price must be provided"],
  },
  brand: {
    type: String,
    enum: {
      values: [
        "Ikea",
        "Salem",
        "Uratex",
        "Mandaue Foam",
        "Global Home",
        "Modern Bamboo",
        "Eurotiles",
        "Panasonic",
        "Condura",
        "LG",
      ],
      message: `{VALUE} brand is not supported`,
    },
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 1,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Product", ProductSchema);
