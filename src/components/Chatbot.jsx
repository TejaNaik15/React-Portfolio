import React, { useState, useRef, useEffect } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { id: "welcome", sender: "bot", text: "👋 Hi, I’m Teja’s AI Assistant. Ask me anything about Teja!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(e) {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now().toString(), sender: "user", text: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.text })
      });
      const data = await res.json();

      const botMsg = {
        id: Date.now().toString() + "-bot",
        sender: "bot",
        text: data.reply || "⚠️ Sorry, I don’t know the answer."
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { id: Date.now().toString(), sender: "bot", text: "⚠️ Error connecting to server." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 md:w-96 bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col z-50">
      {/* Header */}
      <div className="px-4 py-3 bg-gradient-to-r from-[#00dfd8] to-[#945DD6] text-white font-semibold">
        Teja’s Assistant 🤖
      </div>

      {/* Chat Messages */}
      <div className="p-3 h-72 overflow-y-auto flex-1">
        {messages.map(m => (
          <div
            key={m.id}
            className={`mb-3 flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-3 py-2 rounded-lg max-w-[80%] ${
                m.sender === "user"
                  ? "bg-[#945DD6] text-white"
                  : "bg-gray-100 text-gray-900"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {loading && <div className="text-sm text-gray-500">Assistant is typing…</div>}
        <div ref={bottomRef} />
      </div>

      {/* Input Box */}
      <form onSubmit={sendMessage} className="p-3 border-t flex items-center gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#00dfd8]"
          placeholder="Ask about Teja (skills, projects, contact)..."
        />
        <button
          type="submit"
          disabled={loading}
          className="px-3 py-2 rounded-lg bg-[#00dfd8] text-black font-medium hover:opacity-90 disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}
