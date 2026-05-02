import { useEffect, useState } from "react";
import API from "../services/api";

const MyBookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [message, setMessage] = useState("");

  // ✅ Fetch bookmarks
  const fetchBookmarks = async () => {
    try {
      const res = await API.get("/bookmark"); // cookie auth works automatically
      setBookmarks(res.data);
    } catch (err) {
      setMessage("❌ Failed to load bookmarks");
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  //  Remove bookmark
  const handleRemove = async (eventId) => {
    try {
      await API.delete(`/bookmark/${eventId}`);
      setBookmarks(bookmarks.filter(b => b.event._id !== eventId));
    } catch (err) {
      setMessage("❌ Failed to remove bookmark");
    }
  };
  const role = localStorage.getItem("role");

if (!role) {
  return <p>⚠️ Please login to view bookmarks</p>;
}
  return (
    <div style={{ padding: "20px" }}>
      <h2>📌 My Bookmarked Events</h2>

      {message && <p>{message}</p>}

      {bookmarks.length === 0 ? (
        <p>No bookmarks yet 😔</p>
      ) : (
        bookmarks.map((item) => (
          <div
            key={item._id}
            style={{
              border: "1px solid #ccc",
              margin: "10px 0",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <h3>{item.event.eventName}</h3>
            <p>{item.event.description}</p>
            <p>📍 {item.event.venue}</p>
            <p>📅 {item.event.date}</p>

            {item.event.image && (
              <img
                src={`http://localhost:5000${item.event.image}`}
                alt="event"
                width="200"
              />
            )}

            <br />

            <button onClick={() => handleRemove(item.event._id)}>
              ❌ Remove Bookmark
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default MyBookmarks;