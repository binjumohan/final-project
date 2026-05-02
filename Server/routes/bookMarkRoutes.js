const express = require("express");
const router = express.Router();
const bookmarkController = require("../controllers/bookmarkController");
const authMiddleware = require("../middleware/authMiddleware");

//  Add bookmark
router.post("/:eventId", authMiddleware, bookmarkController.addBookmark);

//  Remove bookmark
router.delete("/:eventId", authMiddleware, bookmarkController.removeBookmark);

//  Get all bookmarks (logged-in user)
router.get("/", authMiddleware, bookmarkController.getUserBookmarks);

//  Check bookmarked or not
router.get("/check/:eventId", authMiddleware, bookmarkController.isBookmarked);



module.exports = router;