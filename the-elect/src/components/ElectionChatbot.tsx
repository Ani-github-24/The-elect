"use client";

import React, { useState, useRef, useEffect } from "react";

interface ChatMessage {
  role: "user" | "assistant";
  text: string;
}

export function ElectionChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "Hi! I'm The Elect Assistant. Ask me anything about voting, elections, or civic engagement.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.reply || "Sorry, I couldn't respond." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Connection error. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#FFFF00] text-black rounded-full flex items-center justify-center text-3xl font-black border-4 border-black hover:bg-white focus:outline-none focus:ring-4 focus:ring-[#0000FF] shadow-2xl transition-transform hover:scale-110"
        aria-label={isOpen ? "Close chat" : "Open election assistant chat"}
      >
        {isOpen ? "✕" : "💬"}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] bg-black border-4 border-[#FFFF00] flex flex-col shadow-2xl"
          role="dialog"
          aria-label="Election Education Chatbot"
        >
          {/* Header */}
          <div className="bg-[#0000FF] p-4 border-b-4 border-[#FFFF00]">
            <h3 className="text-xl font-black text-[#FFFF00] uppercase">
              Election Assistant
            </h3>
            <p className="text-white text-sm font-bold">
              Powered by Google Gemini
            </p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-80 min-h-[200px]">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-3 text-base font-bold ${
                  msg.role === "user"
                    ? "bg-[#0000FF] text-white border-2 border-white ml-8"
                    : "bg-white text-black border-2 border-black mr-8"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="bg-white text-black p-3 border-2 border-black mr-8 font-bold animate-pulse">
                Thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-4 border-t-4 border-white flex gap-2">
            <label htmlFor="chat-input" className="sr-only">
              Ask a question about elections
            </label>
            <input
              id="chat-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about voting..."
              disabled={isLoading}
              className="flex-1 bg-black text-white border-2 border-white font-bold py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#FFFF00] placeholder-gray-500 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-[#FFFF00] text-black font-black py-2 px-4 border-2 border-black hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}
