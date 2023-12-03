const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUser,
  createNewUser,
  updateUser,
  deleteUser
} = require("../controllers/users");

router.get("/", getAllUsers);

router.post("/login", getUser);

router.post("/register", createNewUser);

router.patch("/:userId", updateUser);

router.delete("/:userId", deleteUser);

module.exports = router;
