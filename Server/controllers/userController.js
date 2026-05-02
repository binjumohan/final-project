const User = require("../models/User");

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    //  Only admin allowed
    if (req.user.role !== "admin") {
      return res.status(403).json("Access denied");
    }

    const users = await User.find().select("-password");

    res.json(users);
  } catch (err) {
    res.status(500).json("Error fetching users");
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json("User deleted");
};