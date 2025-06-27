"use client";

import { useChat } from "ai/react";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({ api: "/api/chat" });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {/* Tombol buka chat */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 z-50"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Widget chat */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[320px] h-[450px] bg-white rounded-xl shadow-2xl z-50 flex flex-col border">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 border-b bg-blue-600 text-white rounded-t-xl">
            <p className="font-semibold">Tanya LokerLo</p>
            <button onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body chat */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 bg-gray-50 text-sm">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`p-2 rounded-md max-w-[90%] ${
                  m.role === "user"
                    ? "bg-blue-100 ml-auto text-right"
                    : "bg-gray-200"
                }`}
              >
                <p>{m.content}</p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-2 border-t flex gap-2">
            <input
              className="flex-1 px-3 py-2 border rounded-md text-sm"
              value={input}
              onChange={handleInputChange}
              placeholder="Tanyakan sesuatu..."
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm"
            >
              Kirim
            </button>
          </form>
        </div>
      )}
    </>
  );
}
