const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Register
exports.register = async (req, res) => {
  try {
    const { username, phone, gender, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      phone,
      gender,
      email,
      password: hashedPassword,
      role
    });



    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json("User not found");
    }
    if (!user || !user.password) {
      return res.status(400).json("Password not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json("Invalid credentials");
    }

    //  CREATE TOKEN
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log("TOKEN CREATED:", token);

    //  SAVE TOKEN IN COOKIE
    res.cookie("token", token, {
      httpOnly: true,
    });

    const { password: _, ...userData } = user.toObject();

    res.json({
      message: "Login successful",
      token,
      user: userData,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};