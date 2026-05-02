import React, { useState, useEffect } from "react";
import API from "../services/api";
import Event from "./Event";
// const BASE_URL = import.meta.env.VITE_API_URL.replace("/api", "");

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  //  Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get("/events");
        setEvents(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  //  Filtering logic
  const filteredEvents = events.filter((e) => {
    const matchesSearch = e.eventName
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchesLocation =
      !location ||
      e.venue?.toLowerCase().includes(location.toLowerCase());

    const matchesPrice =
      !price ||
      (price === "Free" && e.price === 0) ||
      (price === "Paid" && e.price > 0);

    const eventDate = new Date(e.date);
    const matchesStartDate =
      !startDate || eventDate >= new Date(startDate);
    const matchesEndDate =
      !endDate || eventDate <= new Date(endDate);

    return (
      matchesSearch &&
      matchesLocation &&
      matchesPrice &&
      matchesStartDate &&
      matchesEndDate
    );
  });

  //  Loading state
  if (loading) {
    return (
      <div className="text-center mt-20 text-yellow-400">
        Loading events...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-yellow-50 px-6 py-10 pt-20">
      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-10
        bg-linear-to-r from-yellow-400 to-yellow-600 text-transparent bg-clip-text">
        Upcoming Events
      </h1>

      {/* Filters */}
      <div className="max-w-6xl mx-auto mb-10">
  <div className="bg-slate-800 rounded-2xl p-5 flex flex-col lg:flex-row gap-4 items-center justify-between shadow-md">

    {/* LEFT SIDE - FILTERS */}
    <div className="flex flex-wrap gap-3 w-full lg:w-auto">

      {/* Search */}
      <input
        type="text"
        placeholder="Search events..."
        className="px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-gray-400 focus:outline-none"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Location */}
      <input
        type="text"
        placeholder="Location"
        className="px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-gray-400 focus:outline-none"
        onChange={(e) => setLocation(e.target.value)}
      />

      {/* Price */}
      <select
        className="px-4 py-2 rounded-lg bg-slate-700 text-white"
        onChange={(e) => setPrice(e.target.value)}
      >
        <option value="">All Prices</option>
        <option value="Free">Free</option>
        <option value="Paid">Paid</option>
      </select>

      {/* Start Date */}
      <input
        type="date"
        className="px-3 py-2 rounded-lg bg-slate-700 text-white"
        onChange={(e) => setStartDate(e.target.value)}
      />

      {/* End Date */}
      <input
        type="date"
        className="px-3 py-2 rounded-lg bg-slate-700 text-white"
        onChange={(e) => setEndDate(e.target.value)}
      />
    </div>

    {/* RIGHT SIDE - CLEAR BUTTON */}
    <button
      onClick={() => {
        setSearch("");
        setLocation("");
        setPrice("");
        setStartDate("");
        setEndDate("");
      }}
      className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300"
    >
      Clear
    </button>
  </div>
</div>

      {/* Search */}
      <div className="flex justify-end mb-6">
        <input
          type="text"
          placeholder="Search events..."
          className="w-full max-w-md px-4 py-3 rounded-xl
          bg-gray-900 border border-yellow-500
          text-yellow-100 placeholder-yellow-300
          focus:outline-none focus:ring-2 focus:ring-yellow-500"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.map((e) => (
          <Event
            key={e._id}
            id={e._id}
            eventName={e.eventName}
            description={e.description}
            venue={e.venue}
            image={e.image}
            date={e.date}
            timeFrom={e.timeFrom}
            timeTo={e.timeTo}
            eventCoordinator={e.eventCoordinator}
            category={e.category}
            price={e.price}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <p className="text-center text-yellow-400 mt-16">
          No events found 🗓️
        </p>
      )}
    </div>
  );
};

export default Events;