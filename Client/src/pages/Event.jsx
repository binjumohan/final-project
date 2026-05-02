import React from "react";
import { Link } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace("/api", "")
  : "";
const Event = ({
  id,
  eventName,
  description,
  venue,
  image,
  date,
  timeFrom,
  timeTo,
  eventCoordinator,
  category,
  price,
}) => {
  return (
    <div
      className="bg-gray-900 border border-yellow-600 rounded-2xl
      overflow-hidden shadow-lg hover:shadow-yellow-600/30
      transform hover:-translate-y-2 transition duration-300"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={`${BASE_URL}/${image}`}
          alt={eventName}
        
          className="w-full h-full object-cover hover:scale-105 transition duration-300"
        />

        {/* Category Badge */}
        <span className="absolute top-3 left-3 bg-yellow-500 text-black
          text-xs font-bold px-3 py-1 rounded-full">
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <h2 className="text-xl font-bold text-yellow-400">
          {eventName}
        </h2>

        <p className="text-sm text-yellow-100 line-clamp-3">
          {description}
        </p>

        {/* Date */}
        <p className="text-sm">
          📅{" "}
          {new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>

        {/* Price */}
        <p className="text-sm font-semibold text-yellow-300">
          {/* 💰 {price === 0 ? "Free" : `₹${price}`} */}
          <span>📍 {venue}</span>
        </p>



        {/* Footer */}
        <div className="pt-4 border-t border-yellow-700 flex justify-between items-center">
          <span className="text-sm text-yellow-400">
            👤 {eventCoordinator}
          </span>

          <Link to={`/events/${id}`}>
            <button
              className="px-4 py-2 rounded-lg bg-yellow-500 text-black
              font-semibold hover:bg-yellow-400 transition"
            >
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Event;