const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

module.exports = {
  getAllUsers: async (req, res) => {
    let users = await User.find({});
    res.send(users);
  },
  getUser: async (req, res) => {
    try {
      console.log('req', req.body);
      const user = await User.findOne({ userName: req.body.userName });
      if (!user)
        return res.status(400).json({ message: "user does not exist" });
      const match = await bcrypt.compare(req.body.password, user.password);

      if (match) {
        const accessToken = jwt.sign(
          JSON.stringify(user),
          process.env.TOKEN_SECRET
        );
        res.json({ accessToken });
      } else {
        console.log("error");
        res.status(400).json({ message: "user or password not valid" });
      }
    } catch (error) {
      res.status(500).json({ error: "internal server error" });
    }
  },
  createNewUser: async (req, res) => {
    try {
      const userAlreadyExists = await User.findOne({
        userName: req.body.userName,
      });
      if (userAlreadyExists) {
        return res.status(401).send("user name already Exists");
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = new User({
        userName: req.body.userName,
        password: hashedPassword,
      });

      const savedUser = await user.save();

      savedUser.password = undefined;
      const accessToken = jwt.sign(
        JSON.stringify(savedUser),
        process.env.TOKEN_SECRET
      );
      res.json({ accessToken });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "internal server error" });
    }
  },
  updateUser: async (req, res) => {
    try {
      const userId = req.params.userId;

      const findUser = await User.findById(userId);

      if (!findUser) {
        return res.status(404).json({
          message: "User Not Found",
        });
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      req.body.password = hashedPassword;

      await User.updateOne({ _id: userId }, req.body);

      res.status(200).json({
        message: `UPDATE USER - ${userId}`,
      });
    } catch (error) {
      res.status(500).json({
        error,
      });
    }
  },
  deleteUser: (req, res) => {
    const userId = req.params.userId;

    User.findByIdAndDelete({ _id: userId })
      .then(() => {
        res.status(200).json({
          message: `DELETE USER - ${userId}`,
        });
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
  },
};
