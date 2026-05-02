const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  getAllUsers,
  deleteUser,
  getAllEvents,
  deleteEvent,
  updateEvent,
  addEvents,
  login
} = require("../controllers/adminController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// LOGIN
router.post("/login", login);

// USERS
router.get("/users", authMiddleware, getAllUsers);
router.delete("/users/:id", authMiddleware, adminMiddleware, deleteUser);

// EVENTS
router.post(
  "/events",
  authMiddleware,
  adminMiddleware,
  upload.single("image"), // ✅ Cloudinary upload
  addEvents
);

router.get("/events", authMiddleware, adminMiddleware, getAllEvents);

router.delete(
  "/events/:id",
  authMiddleware,
  adminMiddleware,
  deleteEvent
);

router.put(
  "/events/:id",
  authMiddleware,
  adminMiddleware,
  upload.single("image"), // ✅ Cloudinary upload
  updateEvent
);

module.exports = router;