import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import API from "../services/api"; // ✅ API added
import L from "leaflet";

// Fix marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const center = [10.0, 76.3];

const Map = () => {
  const [events, setEvents] = useState([]); // ✅ DB events
  const [selectedEvent, setSelectedEvent] = useState(null);

  //  Fetch from backend
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

  return (
    <div className="min-h-screen bg-black text-yellow-50 px-6 py-6 pt-20">
      <h1 className="text-4xl font-extrabold text-center mb-6 text-yellow-400">
        Events Map
      </h1>

      <MapContainer
        center={center}
        zoom={8}
        className="w-full h-[80vh] rounded-xl border border-yellow-600"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/*  Use DB events instead of eventdata */}
        {events.map((event) => (
          <Marker
            key={event._id} // ⚠️ important change
            position={[event.lat, event.lng]} // make sure DB has lat/lng
            eventHandlers={{
              click: () => setSelectedEvent(event),
            }}
          />
        ))}

        {/* Popup */}
        {selectedEvent && (
          <Popup
            position={[selectedEvent.lat, selectedEvent.lng]}
            onClose={() => setSelectedEvent(null)}
          >
            <div className="text-black space-y-2 max-w-[200px]">
              <h3 className="font-bold text-sm">
                {selectedEvent.eventName}
              </h3>

              <p className="text-xs">📍 {selectedEvent.venue}</p>

              <p className="text-xs">
                💰{" "}
                {selectedEvent.price === 0
                  ? "Free"
                  : `₹${selectedEvent.price}`}
              </p>

              <Link
                to={`/events/${selectedEvent._id}`} // ⚠️ important change
                className="inline-block mt-2 text-xs font-semibold
                bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-300"
              >
                View Details
              </Link>
            </div>
          </Popup>
        )}
      </MapContainer>
    </div>
  );
};

export default Map;