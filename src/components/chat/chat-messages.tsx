"use client";

import { Message } from "@prisma/client";
import { useEffect, useRef } from "react";

interface ChatMessagesProps {
  messages?: Message[];
  currentUserId: string;
  chatId: string;
}

export default function ChatMessages({ messages = [], currentUserId }: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Scroll to the latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Early return if no messages exist
  if (!messages || messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-4 bg-gray-100 h-full rounded-lg max-h-[80vh] ">
        <p className="text-gray-400">No messages yet</p>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 bg-gray-100 rounded-lg">
      {messages.map((msg) => {
        const isCurrentUser = msg.senderId === currentUserId;
        const messageClasses = isCurrentUser
          ? "bg-blue-500 text-white"
          : "bg-white text-black border";

        return (
          <div key={msg.id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} mb-2`}>
            <div className={`max-w-xs p-3 rounded-lg ${messageClasses}`}>
              <p>{msg.text}</p>
              <p className="text-xs text-gray-400 text-right">{new Date(msg.createdAt).toLocaleString()}</p>
            </div>
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
}

