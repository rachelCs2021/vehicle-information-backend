const Vehicle = require("../models/vehicles");

module.exports = {
  getAllVehicles: async (req, res) => {
    try {
      const page = req.query.$skip;
      const limit = req.query.$top;

      const vehiclesCount = await Vehicle.countDocuments({}).exec();

      const vehicles = await Vehicle.find(null, null, {
        skip: page,
        limit: limit,
      });
      
      res.status(200).json({
        vehicles,
        count: vehiclesCount,
      });
    } catch (error) {
      res.status(500).json({
        error,
      });
    }
  },
  getVehicle: async (req, res) => {
    try {
      const vehicleNumber = req.params.vehicleNumber;
      const page = req.query.$skip;
      const limit = req.query.$top;

      const resultsCount = await Vehicle.countDocuments({
        carNumber: { $regex: vehicleNumber },
      });

      const vehicles = await Vehicle.find({
        carNumber: { $regex: vehicleNumber },
      })
        .skip(page)
        .limit(limit);

      res.status(200).json({
        vehicles,
        count: resultsCount,
      });
    } catch (error) {
      res.status(500).json({
        error,
      });
    }
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
