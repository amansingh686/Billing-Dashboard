const mongoose = require("mongoose");

const itemsSchema = new mongoose.Schema({
  item_name: {
    type: String,
  },
  price: {
    type: String,
  },
  status: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("items", itemsSchema);
