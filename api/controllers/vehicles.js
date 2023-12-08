const Vehicle = require("../models/vehicles");

module.exports = {
  getAllVehicles: async (req, res) => {
    try {
      const page = req.query.$skip;
      const limit = req.query.$top;

      const vehiclesCount = await Vehicle.countDocuments({}).exec();

      const vehicles = await Vehicle.find()
        .sort({
          passedTestOnDate: 1,
        })
        .skip(page)
        .limit(limit);

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
  getVehiclesTestReminder: async (req, res) => {
    try {
      const vehicles = await Vehicle.find().sort({ passedTestOnDate: 1 });

      const today = new Date();
      const passedTestTime = new Date(today);
      passedTestTime.setDate(today.getDate() + 14);

      let needTest = [];

      for (let i = 0; i < vehicles.length; i++) {
        const vehicleDate = new Date(vehicles[i].passedTestOnDate);

        if (vehicleDate <= passedTestTime) {
          needTest.push(vehicles[i]);
        }
      }

      res.status(200).json({
        needTest,
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
  updateVehicle: async (req, res) => {
    try {
      const vehicleId = req.params.vehicleId;

      const vehicle = await Vehicle.findById(vehicleId);

      if (!vehicle) {
        return res.status(404).json({
          message: "Vehicle Not Found",
        });
      }

      await Vehicle.updateOne({ _id: vehicleId }, req.body);

      res.status(200).json({
        message: `UPDATE VEHICLE - ${vehicleId}`,
      });
    } catch (error) {
      res.status(500).json({
        error,
      });
    }
  },
  deleteVehicle: (req, res) => {
    const vehicleId = req.params.vehicleId;

    Vehicle.findByIdAndDelete({ _id: vehicleId })
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
  },
};
