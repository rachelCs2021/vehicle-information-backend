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

router.post("/newVehicle", createNewVehicle);

router.patch("/:vehicleNumber", updateVehicle);

router.delete("/:vehicleNumber", deleteVehicle);

module.exports = router;
