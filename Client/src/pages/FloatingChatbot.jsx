import { useState } from "react";
import API from "../services/api";

const FloatingChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await API.post("/chat", { message: input });

      const botMsg = {
        sender: "bot",
        text: res.data.reply,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.log(err);
    }

    setInput("");
  };

  return (
    <>
      {/* 💬 Floating Button */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          background: "#007bff",
          color: "#fff",
          padding: "12px 16px",
          borderRadius: "50px",
          cursor: "pointer",
          zIndex: 1000,
        }}
      >
        💬 Chat
      </div>

      {/* 📦 Chat Box */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            width: "300px",
            height: "400px",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            zIndex: 1000,
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "10px",
              background: "#007bff",
              color: "#fff",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          >
            🤖 Chat with us
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: "10px",
              overflowY: "auto",
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  textAlign: msg.sender === "user" ? "right" : "left",
                  margin: "5px 0",
                }}
              >
                <span
                  style={{
                    background:
                      msg.sender === "user" ? "#007bff" : "#eee",
                    color: msg.sender === "user" ? "#fff" : "#000",
                    padding: "6px 10px",
                    borderRadius: "10px",
                    display: "inline-block",
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          {/* Input */}
          <div style={{ display: "flex", borderTop: "1px solid #ccc" }}>
            <input
              style={{ flex: 1, padding: "8px", border: "none" }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChatbot;