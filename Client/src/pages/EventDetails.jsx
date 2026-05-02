import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";


const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [message, setMessage] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);

  //  Fetch event
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await API.get(`/events/${id}`);
        setEvent(res.data);
      } catch (err) {
        console.error("Error fetching event:", err);
      }
    };

    fetchEvent();
  }, [id]);

// check bookmark
  useEffect(() => {
  const checkBookmark = async () => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const res = await API.get(`/bookmarks/check/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIsBookmarked(res.data.isBookmarked);
    } catch (err) {
      console.log(err);
    }
  };

  checkBookmark();
}, [id]);

  //  Countdown
  useEffect(() => {
    if (!event) return;

    const eventDateTime = new Date(`${event.date} ${event.timeFrom}`);

    const timer = setInterval(() => {
      const now = new Date();
      const diff = eventDateTime - now;

      if (diff <= 0) {
        clearInterval(timer);
        setTimeLeft(null);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [event]);

  //  Share
  const handleShare = async () => {
    try {
      await navigator.share({
        title: event?.eventName,
        text: "Join this event with me!",
        url: window.location.href,
      });
    } catch (error) {
      console.log("Sharing cancelled");
    }
  };

 

  //  Handle Bookmark Click
const handleBookmark = async () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    setMessage("⚠️ Please login");
    return;
  }

  if (user?.role !== "user") {
    setMessage("⚠️ Only users can bookmark");
    return;
  }

  try {
    await API.post(
      `/bookmarks/${event._id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setIsBookmarked(true); // 🔥 update UI instantly
    setMessage("✅ Bookmarked");
  } catch (err) {
    console.log(err);
    setMessage("❌ Failed to bookmark");
  }
};

  //  Loading
  if (!event) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-yellow-400 text-xl">Loading event... ⏳</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-red-50 px-6 py-10">
      <div className="max-w-6xl mx-auto pt-10">

        {/* 🔙 Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 px-4 py-2 rounded-lg
                     border border-yellow-500 text-yellow-400
                     hover:bg-yellow-500 hover:text-black transition font-bold"
        >
          ← Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">

          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden border border-yellow-600 shadow-lg">
            <img
              src={`https://circle-up-final-server.vercel.app/${event.image}`}
              alt={event.eventName}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>

          {/* Details */}
          <div className="space-y-6">

            {/* Category + Countdown */}
            <div className="flex items-center justify-between gap-4">
              <span className="px-4 py-1 rounded-full text-sm font-semibold bg-yellow-500 text-black">
                {event.category}
              </span>

              {timeLeft ? (
                <div className="flex gap-2 bg-white p-2 rounded-lg">
                  {[
                    { label: "Days", value: timeLeft.days },
                    { label: "Hrs", value: timeLeft.hours },
                    { label: "Min", value: timeLeft.minutes },
                    { label: "Sec", value: timeLeft.seconds },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex flex-col items-center bg-white border rounded-lg px-3 py-2"
                    >
                      <span className="text-xl font-bold text-red-600">
                        {String(item.value).padStart(2, "0")}
                      </span>
                      <span className="text-[10px] uppercase text-red-600">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-2 rounded-lg bg-yellow-500 text-black text-sm font-bold">
                  Live 🎉
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-yellow-400">
              {event.eventName}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap gap-4 text-sm text-yellow-200">
              <span>
                📅{" "}
                {new Date(event.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span>⏰ {event.timeFrom} – {event.timeTo}</span>
              <span>📍 {event.venue}</span>
              <span>👤 {event.eventCoordinator}</span>
            </div>

            {/* Description */}
            <p className="text-yellow-100">{event.description}</p>

            {/* Price */}
            <div className="text-lg font-semibold text-yellow-300">
              {event.price === 0 ? "🎉 Free Event" : `₹ ${event.price}`}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 pt-4">

              <button
                onClick={handleShare}
                className="bg-yellow-500 text-black px-5 py-2 rounded-lg font-semibold hover:bg-yellow-400"
              >
                🔗 Share Event
              </button>

             <button
  onClick={handleBookmark}
  disabled={isBookmarked}
  className={`px-5 py-2 rounded-lg font-semibold transition
    ${
      isBookmarked
        ? "bg-gray-400 text-black cursor-not-allowed"
        : "bg-yellow-500 text-black hover:bg-yellow-400"
    }`}
>
  {isBookmarked ? "✅ Bookmarked" : "🔖 Bookmark"}
</button>

            </div>

            {/* Message */}
            {message && (
              <p className="text-red-400 text-sm mt-2">{message}</p>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;