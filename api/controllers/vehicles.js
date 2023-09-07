const Vehicle = require("../models/vehicles");

module.exports = {
  getAllVehicles: (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    console.log('query', page, limit);

    Vehicle.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .then((vehicles) => {
        res.status(200).json({
          vehicles,
        });
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
  },
  getVehicle: (req, res) => {
    const vehicleId = req.params.vehicleId;

    Vehicle.findById(vehicleId)
      .then((vehicle) => {
        res.status(200).json({
          vehicle,
        });
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
  },
  createNewVehicle: (req, res) => {
    const { carNumber, manufacturer, model, passedTestOnDate } = req.body;

    const vehicle = new Vehicle({
      carNumber,
      manufacturer,
      model,
      passedTestOnDate,
    });
    console.log("new vehicle", vehicle);

    vehicle
      .save()
      .then(() => {
        res.status(200).json({
          message: "created vehicle",
        });
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
  },
  updateVehicle: (req, res) => {
    const vehicleId = req.params.vehicleId;

    Vehicle.findById(vehicleId)
      .then((vehicle) => {
        console.log("vehicle:", vehicle);
        if (!vehicle) {
          return res.status(404).json({
            message: "Vehicle Not Found",
          });
        }
      })
      .then(() => {
        Vehicle.updateOne({ _id: vehicleId }, req.body)
          .then(() => {
            res.status(200).json({
              message: `UPDATE VEHICLE - ${vehicleId}`,
            });
          })
          .catch((error) => {
            res.status(500).json({
              error,
            });
          });
      });
  },
  deleteVehicle: (req, res) => {
    const vehicleId = req.params.vehicleId;

    Vehicle.findById(vehicleId)
      .then((vehicle) => {
        if (!vehicle) {
          return res.status(404).json({
            message: "vehicle Not Found",
          });
        }
      })
      .then(() => {
        Vehicle.deleteOne({ _id: vehicleId })
          .then(() => {
            res.status(200).json({
              message: `DELETE VEHICLE - ${vehicleId}`,
            });
          })
          .catch((error) => {
            res.status(500).json({
              error,
            });
          });
      });
  },
};
