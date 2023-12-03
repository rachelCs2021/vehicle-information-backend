const mongoose = require("mongoose");

const usereSchema = mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("user", usereSchema);
