const Bookmark = require("../models/Bookmark");
const Event = require("../models/Event");

//  ADD BOOKMARK
exports.addBookmark = async (req, res) => {
  try {
    if (req.user.role !== "user") {
      return res.status(403).json({ message: "Admins cannot bookmark" });
    }

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



//  REMOVE BOOKMARK
exports.removeBookmark = async (req, res) => {
  try {
    const { eventId } = req.params;

    const bookmark = await Bookmark.findOneAndDelete({
      user: req.user.id,
      event: eventId,
    });

    if (!bookmark) {
      return res.status(404).json({ message: "Bookmark not found" });
    }

    res.json({ message: "Bookmark removed successfully" });
  } catch (err) {
    console.error("REMOVE BOOKMARK ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};



//  GET ALL BOOKMARKS OF LOGGED-IN USER
exports.getUserBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ user: req.user.id })
      .populate("event"); 

    res.json(bookmarks);
  } catch (err) {
    console.error("GET BOOKMARKS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};



//  CHECK IF EVENT IS BOOKMARKED (Useful for UI toggle)
exports.isBookmarked = async (req, res) => {
  try {
    const { eventId } = req.params;

    const bookmark = await Bookmark.findOne({
      user: req.user.id,
      event: eventId,
    });

    res.json({ isBookmarked: !!bookmark });
  } catch (err) {
    console.error("CHECK BOOKMARK ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};