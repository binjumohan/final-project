import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  //  Current month & year
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const [selectedEvents, setSelectedEvents] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get("/events");
        setEvents(res.data);
      } catch (err) {
        console.error("Error fetching events", err);
      }
    };

    fetchEvents();
  }, []);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const getEventsByDate = (date) => {
    return events.filter((event) => event.date === date);
  };

  const handleDateClick = (events) => {
    if (events.length === 1) {
      navigate(`/events/${events[0]._id}`); // ⚠️ FIX HERE TOO
    } else if (events.length > 1) {
      setSelectedEvents(events);
      setShowPopup(true);
    }
  };

  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 relative pt-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={goToPrevMonth} className="text-xl font-bold hover:text-yellow-500">←</button>

        <h2 className="text-2xl font-bold">
          {monthNames[currentMonth]} {currentYear}
        </h2>

        <button onClick={goToNextMonth} className="text-xl font-bold hover:text-yellow-500">→</button>
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 text-center font-semibold mb-2">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
          const eventsToday = getEventsByDate(dateStr);

          return (
            <div
              key={day}
              className={`relative h-16 border rounded-lg flex items-center justify-center
                ${eventsToday.length > 0 ? "cursor-pointer hover:bg-yellow-100" : "opacity-40"}`}
              onClick={() => handleDateClick(eventsToday)}
            >
              <span className="font-medium">{day}</span>

              {eventsToday.length > 0 && (
                <span className="absolute bottom-1 right-1 bg-black text-yellow-400 text-xs px-1.5 rounded-full">
                  {eventsToday.length}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-80">
            <h3 className="text-lg font-bold mb-4">Events on this day</h3>

            <ul className="space-y-3">
              {selectedEvents.map((event) => (
                <li
                  key={event._id} // ⚠️ FIX HERE
                  className="p-3 border rounded-lg cursor-pointer hover:bg-yellow-100"
                  onClick={() => navigate(`/events/${event._id}`)}
                >
                  {event.eventName}
                </li>
              ))}
            </ul>

            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 w-full bg-black text-yellow-400 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;