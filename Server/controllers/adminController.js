const User = require("../models/User");
const Event = require("../models/Event");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    console.log("USER OBJECT:", user);
    console.log("REQ PASSWORD:", password);
    console.log("DB PASSWORD:", user?.password); // 👈 IMPORTANT
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
    console.log("REQ PASSWORD:", password);
    console.log("DB PASSWORD:", user.password);
    //  SAVE TOKEN IN COOKIE




        res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

   
   res.json({
  message: "Login successful",
  role: user.role, 
});



  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//  ADD event
exports.addEvents = async (req, res) => {
  try {
    const {
      eventName,
      description,
      venue,
      date,
      timeFrom,
      timeTo,
      eventCoordinator,
      category,
      price,
      lat,
      lng,
    } = req.body;

    //  GET IMAGE FROM MULTER
   const imageUrl = req.file ? req.file.path : null;

    console.log("FILE:", req.file); 
    const newEvent = new Event({
      eventName,
      description,
      venue,
      image: imageUrl,
      date,
      timeFrom,
      timeTo,
      eventCoordinator,
      category,
      price,
      lat,
      lng,
      createdBy: req.user?.id,
    });

    const savedEvent = await newEvent.save();

    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  GET all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// DELETE user
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  GET all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  DELETE event
exports.deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Event
exports.updateEvent = async (req, res) => {
  try {
    let updatedData = { ...req.body };

    //  If new image uploaded
    if (req.file) {
     updatedData.image = req.file.path;
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.json(updatedEvent);
  } catch (err) {
    res.status(500).json(err);
  }
};