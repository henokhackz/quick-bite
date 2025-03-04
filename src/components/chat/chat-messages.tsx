"use client";

import { useEffect, useRef } from "react";

export default function ChatMessages({ messages, currentUserId }: { messages: any[]; currentUserId: string }) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
      {messages.map((msg) => (
        <div key={msg.id} className={`flex ${msg.senderId === currentUserId ? "justify-end" : "justify-start"} mb-2`}>
          <div
            className={`max-w-xs p-3 rounded-lg ${
              msg.senderId === currentUserId ? "bg-blue-500 text-white" : "bg-white text-black border"
            }`}
          >
            <p>{msg.message}</p>
            <p className="text-xs text-gray-400 text-right">{new Date(msg.timestamp).toLocaleTimeString()}</p>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
