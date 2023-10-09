const mongoose = require("mongoose");

const vehicleSchema = mongoose.Schema({
  carNumber: { type: String, required: true },
  manufacturer: { type: String, required: true },
  model: { type: String, required: true },
  passedTestOnDate: { type: Date, required: true },
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
