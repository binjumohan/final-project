const { GoogleGenerativeAI } = require("@google/generative-ai");
const Event = require("../models/Event");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.chatbot = async (req, res) => {
  try {
    const { message } = req.body;

    //  Search events from DB
    const keywords = message.split(" ");
   let events = await Event.find({
  $or: [
    { eventName: { $regex: keywords.join("|"), $options: "i" } },
    { venue: { $regex: keywords.join("|"), $options: "i" } },
    { category: { $regex: keywords.join("|"), $options: "i" } },
  ],
});

//  fallback: show all upcoming events
if (events.length === 0) {
  events = await Event.find().limit(5);
}
console.log(events);
    //  Prepare context for AI
    let context = "";

    if (events.length > 0) {
      context = `Here are some events:\n${events
        .map(
          (e) =>
            `- ${e.eventName} at ${e.venue} on ${e.date} (${e.timeFrom})`
        )
        .join("\n")}`;
    } else {
      context = "No events found in database.";
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(
     `You are an event assistant chatbot.

User question: ${message}

Event data:
${context}

Instructions:
- If events exist, list them clearly.
- If no events found, say: "No events found 😔"
- Do NOT give multiple options
- Do NOT suggest external websites
- Reply like a chatbot, not like a developer guide.
`
    );

    const reply = result.response.text();

    res.json({ reply });
  } catch (error) {
    console.error("ERROR:", error);
    res.json({
      reply: "Something went wrong 😔",
    });
  }
};