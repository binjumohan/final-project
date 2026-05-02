import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [search, setSearch] = useState(""); // ✅ search state
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    eventName: "",
    date: "",
    venue: "",
    category: "",
  });

  //  FILTER LOGIC
  const filteredEvents = events.filter((event) =>
    event.eventName.toLowerCase().includes(search.toLowerCase()) ||
    event.venue.toLowerCase().includes(search.toLowerCase()) ||
    event.category.toLowerCase().includes(search.toLowerCase())
  );

  //  Fetch Events
  const fetchEvents = async () => {
    try {
      const res = await API.get("/admin/events");
      setEvents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  //  Delete Event
  const deleteEvent = async (id) => {
    try {
      await API.delete(`/admin/events/${id}`);
      fetchEvents();
    } catch (err) {
      console.log(err);
    }
  };

  //  Open Edit Modal
  const handleEditClick = (event) => {
    setEditingEvent(event);
    setFormData({
      eventName: event.eventName,
      date: event.date?.slice(0, 10),
      venue: event.venue,
      category: event.category,
    });
  };

  //  Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //  Update Event
  const updateEvent = async () => {
    try {
      await API.put(`/admin/events/${editingEvent._id}`, formData);
      setEditingEvent(null);
      fetchEvents();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-6">Manage Events</h2>

      {/* 🔥 TOP BAR */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => navigate("/admin/addEvent")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add Event
        </button>

        {/* 🔍 Search Bar */}
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded w-64 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      {/* TABLE */}
      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3">Event</th>
            <th className="p-3">Date</th>
            <th className="p-3">Venue</th>
            <th className="p-3">Category</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredEvents.map((event) => (
            <tr key={event._id} className="text-center border-t">
              <td className="p-3">{event.eventName}</td>
              <td className="p-3">
                {new Date(event.date).toLocaleDateString()}
              </td>
              <td className="p-3">{event.venue}</td>
              <td className="p-3">{event.category}</td>

              <td className="p-3 flex justify-center gap-2">
                {/* EDIT */}
                <button
                  onClick={() => handleEditClick(event)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                {/* DELETE */}
                <button
                  onClick={() => deleteEvent(event._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/*  EDIT MODAL */}
      {editingEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="text-xl font-bold mb-4">Edit Event</h3>

            <input
              type="text"
              name="eventName"
              value={formData.eventName}
              onChange={handleChange}
              placeholder="Event Name"
              className="w-full border p-2 mb-3"
            />

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border p-2 mb-3"
            />

            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              placeholder="Venue"
              className="w-full border p-2 mb-3"
            />

            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
              className="w-full border p-2 mb-3"
            />

            <div className="flex justify-between">
              <button
                onClick={updateEvent}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Update
              </button>

              <button
                onClick={() => setEditingEvent(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageEvents;