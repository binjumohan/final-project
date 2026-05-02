const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
    },

    description: String,

    venue: String,

    image: String,

    date: {
      type: String,
      required: true,
    },

    timeFrom: String,

    timeTo: String,

    eventCoordinator: String,

    category: String,

    price: {
      type: Number,
      default: 0,
    },

    lat: Number,

    lng: Number,

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);