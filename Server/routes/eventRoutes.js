const router = require("express").Router();

const {
  createEvent,
  getEvents,
  deleteEvent,
  getEventById
} = require("../controllers/eventController");

const { addBookmark } = require("../controllers/bookmarkController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const upload = require("../middleware/upload");

// Public routes
router.get("/", getEvents);
router.get("/:id", getEventById);

// Admin routes
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  createEvent
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteEvent
);

// Bookmark
router.post("/:eventId/bookmark", authMiddleware, addBookmark);

module.exports = router;