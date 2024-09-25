const mongoose = require("mongoose");
const validator = require("validator");

const customersSchema = new mongoose.Schema({
  customer_name: {
    type: String,
    required: [true, "Please enter your name"],
    trim: true,
  },
  pan_card: {
    type: String,
    required: [true, "Please enter your pan card number"],
    unique: true,
  },
  gst_number: {
    type: String,
    required: [true, "Please enter your gst number"],
    unique: true,
  },
  address: {
    type: String,
    required: [true, "Please enter address"],
  },
  status: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("customers", customersSchema);
