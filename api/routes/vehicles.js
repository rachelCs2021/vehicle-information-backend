const express = require("express");
const router = express.Router();

const {
  getAllVehicles,
  getVehiclesTestReminder,
  getVehicle,
  createNewVehicle,
  updateVehicle,
  deleteVehicle,
} = require("../controllers/vehicles");

router.get("/", getAllVehicles);

router.get("/testReminder", getVehiclesTestReminder);

router.get("/:vehicleNumber", getVehicle);

router.post("/", createNewVehicle);

router.patch("/:vehicleId", updateVehicle);

router.delete("/:vehicleId", deleteVehicle);

module.exports = router;
