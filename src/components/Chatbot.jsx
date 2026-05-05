import React, { useState } from "react";
import systemPrompt from "../utils/systemPrompt";

const Chatbot = ({ onFiltersExtracted }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

 const API_KEY = import.meta.env.VITE_GROQ_API_KEY;
 
 

  const handleSend = async () => {
    if (!input.trim()) return;
    setLoading(true);
    

    try {
     const res = await fetch(
  "https://api.groq.com/openai/v1/chat/completions",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: input }
      ]
    })
  }
);

      const data = await res.json()
     
const text = data?.choices?.[0]?.message?.content || "{}"
const match = text.match(/\{[\s\S]*\}/)
const filters = match ? JSON.parse(match[0]) : {}
console.log(filters)
onFiltersExtracted(filters)

      
      

    } catch (err) {
      console.log("Error:", err);
    }

    setLoading(false);
    setInput("");
  };

  // Enter key se bhi send ho
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="fixed bottom-4 right-4 z-[999]" style={{maxWidth: 'calc(100vw - 32px)'}}>

      {/* Chat Icon Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-red-500 text-white p-4 rounded-full shadow-lg hover:bg-red-600 transition"
        >
          🤖
        </button>
      )}

      {/* Chat Box */}
      {isOpen && (
        <div className="bg-white shadow-2xl rounded-2xl w-[260px] md:w-80 p-4">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold text-gray-800">AI Assistant</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 text-xl"
            >
              ✕
            </button>
          </div>

          {/* Input */}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. Samsung phone under 30000"
            className="w-full border border-gray-200 rounded-lg p-2 text-sm mb-3 focus:outline-none focus:border-red-400"
          />

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={loading}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm transition"
          >
            {loading ? "Searching..." : "Search"}
          </button>

        </div>
      )}
    </div>
  );
};

export default Chatbot;