"use client";

import { Message } from "@prisma/client";
import { useEffect, useRef } from "react";

export default function ChatMessages({ messages, currentUserId }: { messages: Message[]; currentUserId: string }) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-scroll  p-4 bg-gray-100 min-h-[200px] lg:min-h-[400px] lg:max-h-[450px] rounded-lg ">
      {messages.map((msg) => (
        <div key={msg.id} className={`flex ${msg.senderId === currentUserId ? "justify-end" : "justify-start"} mb-2`}>
          <div
            className={`max-w-xs p-3 rounded-lg ${
              msg.senderId === currentUserId ? "bg-blue-500 text-white" : "bg-white text-black border"
            }`}
          >
            <p>{msg.text}</p>
            <p className="text-xs text-gray-400 text-right">{new Date(msg.createdAt).toLocaleString()}</p>
          </div>
        </div>
      ))}
      {messages.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center">
          <p className="text-gray-400">No messages yet</p>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
