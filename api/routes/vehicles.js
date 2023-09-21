const express = require("express");
const router = express.Router();

const {
  getAllVehicles,
  getVehicle,
  createNewVehicle,
  updateVehicle,
  deleteVehicle,
} = require("../controllers/vehicles");

router.get("/", getAllVehicles);

router.get("/:vehicleNumber", getVehicle);

router.post("/", createNewVehicle);

router.patch("/:vehicleId", updateVehicle);

router.delete("/:vehicleId", deleteVehicle);

module.exports = router;
