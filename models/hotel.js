const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hotelSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  rating: { type: String, required: true },
  cost: { type: String, required: true },
  text: { type: String, required: true },
  www: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;

