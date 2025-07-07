import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await axios.post("http://localhost:8000/api/chat", {
        messages: newMessages,
      });

      const botReply = {
            role: response.data.role,
            content: response.data.content,
            };


      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      console.error("❌ Error sending message:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Error. Check backend logs." },
      ]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-100">
      <div className="w-full max-w-xl p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">💬 DevBuddy Chat</h2>

        <div className="bg-white p-4 rounded shadow h-[400px] overflow-y-auto mb-4">
          {messages.map((m, i) => (
            <div key={i} className={`mb-2 ${m.role === "user" ? "text-right" : "text-left"}`}>
              <div
                className={`inline-block px-3 py-2 rounded-lg whitespace-pre-wrap ${
                  m.role === "user" ? "bg-blue-200" : "bg-gray-300"
                }`}
              >
                <ReactMarkdown>{m.content}</ReactMarkdown> {/* ✅ Markdown rendering */}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something..."
            className="flex-grow px-4 py-2 border rounded"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatPage;
