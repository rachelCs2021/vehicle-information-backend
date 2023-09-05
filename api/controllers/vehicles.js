const Vehicle = require("../models/vehicles");

module.exports = {
  getAllVehicles: (req, res) => {
    res.status(200).json({
      message: "get all vehicles",
    });
  },
  getVehicle: (req, res) => {
     res.status(200)
  },
  createNewVehicle: (req, res) => {
    const { carNumber, manufacturer, model, passedTestOnDate } = req.body;
    const vehicle = new Vehicle({
      carNumber,
      manufacturer,
      model,
      passedTestOnDate,
    });

    vehicle.save().then(() => {
      res
        .status(200)
        .json({
          message: "created vehicle",
        })
        .catch((error) => {
          res.status(500).json({
            error,
          });
        });
    });
  },
  updateVehicle: (req, res) => {
    const vehicleNumber = req.params.vehicleNumber;

    res.status(200).json({
      message: `update vehicle number ${vehicleNumber}`,
    });
  },
  deleteVehicle: (req, res) => {
    const vehicleNumber = req;

    res.status(200).json({
      message: `delete vehicle number ${vehicleNumber}`,
    });
  },
};
