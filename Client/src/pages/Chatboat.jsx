import { useState } from "react";
import API from "../services/api";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;

    const userMessage = { sender: "user", text: input };
    setMessages(prev => [...prev, userMessage]);

    try {
      const res = await API.post("/chat", { message: input });

      const botMessage = {
        sender: "bot",
        text: res.data.reply,
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.log(err);
    }

    setInput("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🤖 Event Chatbot</h2>

      <div style={{ border: "1px solid #ccc", height: "300px", overflowY: "auto", padding: "10px" }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.sender === "user" ? "right" : "left" }}>
            <p><b>{msg.sender}:</b> {msg.text}</p>
          </div>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask about events..."
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chatbot;