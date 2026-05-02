const Event = require("../models/Event");
const multer = require("multer");
const BASE_URL = "http://localhost:5000";

// Create Event
exports.createEvent = async (req, res) => {
  try {
    console.log("FILE:", req.file); 

    const imageUrl = req.file
      ? `/uploads/${req.file.filename}`
      : null;

    const event = await Event.create({
      ...req.body,
      image: imageUrl, 
      createdBy: req.user.id,
    });

    res.json(event);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
// Get All Events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("createdBy", "username");
    res.json(events);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete Event
exports.deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json("Event deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET single event
exports.getEventById =async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: "Error fetching event" });
  }
};



const Bookmark = require("../models/Bookmark");

// Save bookmark
exports.addBookmark = async (req, res) => {
  try {
    const exists = await Bookmark.findOne({
      user: req.user.id,
      event: req.params.eventId,
    });

    if (exists) {
      return res.json({ message: "Already bookmarked" });
    }

    const bookmark = await Bookmark.create({
      user: req.user.id,
      event: req.params.eventId,
    });

    res.json(bookmark);
  } catch (err) {
    res.status(500).json(err);
  }
};
