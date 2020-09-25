const usersController = {};
const UserModel = require("../models/User");
const User = require("../models/User");

usersController.getUsers = async (req, res) => {
  const users = await UserModel.find();
  res.json(users);
};

usersController.createUser = async (req, res) => {
  const { username } = req.body;
  const newUser = new User({ username });
  await newUser.save();
  res.json({ message: "POST - User saved" });
};

usersController.getUser = async (req, res) => {
  console.log(req.params.id);
  const getUserOne = await UserModel.findById(req.params.id);
  res.json(getUserOne);
};

/*     usersController.updateUser = async (req, res) => {
    res.json({ message: "PUT - Users route" });
    }; */

usersController.deleteUser = async (req, res) => {
  const DeleteUserOne = await UserModel.findByIdAndDelete(req.params.id);
  res.json({ message: "DELETE - Users route" });
};

module.exports = usersController;
